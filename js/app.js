/* ============================================
   Mobile ERP - Core Application Logic
   Navigation, menus, tabs, toasts, roles
   ============================================ */

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');

    // Update bottom nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navMap = {
        'dashboard': 'nav-home',
        'sales': 'nav-sales',
        'inventory': 'nav-inventory',
        'hr': 'nav-hr',
        'vendor': 'nav-more',
        'finance': 'nav-more',
        'maintenance': 'nav-more',
        'production': 'nav-more',
        'visitor': 'nav-more',
        'security': 'nav-more'
    };
    const navId = navMap[screenId];
    if (navId) {
        const navEl = document.getElementById(navId);
        if (navEl) navEl.classList.add('active');
    }
}

// Menu Drawer Toggle
function toggleMenu() {
    document.getElementById('menuDrawer').classList.toggle('active');
    document.getElementById('menuOverlay').classList.toggle('active');
}

// Tab Switching
function switchTab(tabsId, contentId, index) {
    const tabs = document.getElementById(tabsId);
    const content = document.getElementById(contentId);
    if (!tabs || !content) return;

    tabs.querySelectorAll('.tab').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    content.querySelectorAll('.tab-content').forEach((c, i) => {
        c.classList.toggle('active', i === index);
    });
}

// Role Selection
function selectRole(el) {
    document.querySelectorAll('.role-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    showToast('View: ' + el.textContent);
}

// Toast Notification
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Modal Overlay Click
document.addEventListener('click', function (e) {
    if (e.target.id === 'modalOverlay') {
        closeModal();
    }
});
