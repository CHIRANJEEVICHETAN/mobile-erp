/* ============================================
   Mobile ERP - Dynamic Screen Loader
   Loads screen HTML files dynamically for modularity
   ============================================ */

// Cache for loaded screens
const screenCache = new Map();

// Screen file mappings
const screenFiles = {
    dashboard: 'screens/dashboard.html',
    sales: 'screens/sales.html',
    inventory: 'screens/inventory.html',
    vendor: 'screens/vendor.html',
    finance: 'screens/finance.html',
    maintenance: 'screens/maintenance.html',
    hr: 'screens/hr.html',
    production: 'screens/production.html',
    visitor: 'screens/visitor.html',
    security: 'screens/security.html'
};

// Load screen HTML dynamically
async function loadScreen(screenId) {
    // Check cache first
    if (screenCache.has(screenId)) {
        return screenCache.get(screenId);
    }

    const filePath = screenFiles[screenId];
    if (!filePath) {
        console.error(`Screen file not found for: ${screenId}`);
        return null;
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.status}`);
        }

        const html = await response.text();

        // Cache the loaded screen
        screenCache.set(screenId, html);

        return html;
    } catch (error) {
        console.error(`Error loading screen ${screenId}:`, error);
        return null;
    }
}

// Inject screen HTML into DOM
function injectScreen(screenId, html) {
    // Remove existing screen if it exists
    const existingScreen = document.getElementById(screenId);
    if (existingScreen) {
        existingScreen.remove();
    }

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.trim();

    // Extract the screen element
    const screenElement = tempDiv.querySelector(`#${screenId}`);
    if (!screenElement) {
        console.error(`Screen element with id "${screenId}" not found in loaded HTML`);
        return false;
    }

    // Find the insertion point (before bottom navigation)
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.parentNode.insertBefore(screenElement, bottomNav);
    } else {
        // Fallback: append to phone screen
        const phoneScreen = document.querySelector('.phone-screen');
        if (phoneScreen) {
            phoneScreen.appendChild(screenElement);
        } else {
            console.error('Could not find insertion point for screen');
            return false;
        }
    }

    return true;
}

// Enhanced showScreen function that loads screens dynamically
async function showScreenDynamic(screenId) {
    // Check if screen is already loaded
    const existingScreen = document.getElementById(screenId);
    if (existingScreen) {
        // Screen already exists, just show it
        showScreen(screenId);
        return;
    }

    // Load screen HTML
    const html = await loadScreen(screenId);
    if (!html) {
        console.error(`Failed to load screen: ${screenId}`);
        return;
    }

    // Inject screen into DOM
    const success = injectScreen(screenId, html);
    if (!success) {
        console.error(`Failed to inject screen: ${screenId}`);
        return;
    }

    // Now show the screen
    showScreen(screenId);
}

// Initialize the app by loading the dashboard
async function initApp() {
    // Load dashboard on app start
    await showScreenDynamic('dashboard');

    // Preload other commonly used screens (optional)
    // This can improve performance by loading screens in background
    setTimeout(() => {
        showScreenDynamic('sales');
        showScreenDynamic('inventory');
    }, 1000);
}

// Preload a screen without showing it
async function preloadScreen(screenId) {
    const html = await loadScreen(screenId);
    if (html) {
        injectScreen(screenId, html);
        // Keep screen hidden
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.style.display = 'none';
        }
    }
}

// Clear screen cache (useful for development or memory management)
function clearScreenCache() {
    screenCache.clear();
}

// Export functions for global use
window.showScreenDynamic = showScreenDynamic;
window.preloadScreen = preloadScreen;
window.clearScreenCache = clearScreenCache;
window.initApp = initApp;