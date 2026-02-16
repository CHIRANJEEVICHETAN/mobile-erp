/* ============================================
   Mobile ERP - Core Application Logic
   Navigation, Menu, Tabs, Toast, Role Selection
   ============================================ */

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navMap = { 'dashboard': 'nav-home', 'sales': 'nav-sales', 'inventory': 'nav-inventory', 'hr': 'nav-hr' };
    if (navMap[screenId]) document.getElementById(navMap[screenId]).classList.add('active');
}

// Menu Toggle
function toggleMenu() {
    document.getElementById('menuOverlay').classList.toggle('active');
    document.getElementById('menuDrawer').classList.toggle('active');
}

// Tab Switching
function switchTab(tabsId, contentId, index) {
    const tabs = document.getElementById(tabsId).querySelectorAll('.tab');
    const contents = document.getElementById(contentId).querySelectorAll('.tab-content');
    tabs.forEach((t, i) => { t.classList.toggle('active', i === index); });
    contents.forEach((c, i) => { c.classList.toggle('active', i === index); });
}

// Role Selection
function selectRole(el) {
    document.querySelectorAll('.role-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    showToast('Switched to ' + el.textContent + ' view');
}

// Toast Notification
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
});
