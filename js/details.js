/* ============================================
   Mobile ERP - Detail View Functions
   All detail modal openers for various modules
   ============================================ */

// Generic Detail Modal Opener
function openDetailModal(title, content) {
    const modal = document.getElementById('modalContent');
    modal.innerHTML = `<div class="modal-header"><div class="modal-title">${title}</div><div class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></div></div><div class="modal-body">${content}</div>`;
    document.getElementById('modalOverlay').classList.add('active');
}

// Invoice Detail
function openInvoiceDetail(id, customer, amount, status) {
    const statusClass = status === 'Paid' ? 'status-approved' : status === 'Overdue' ? 'status-urgent' : 'status-pending';
    openDetailModal('Invoice Details', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 32px; font-weight: 700; color: #1e293b;">₹${amount}</div>
            <span class="list-status ${statusClass}">${status}</span>
        </div>
        <div class="detail-row"><span class="detail-label">Invoice #</span><span class="detail-value">${id}</span></div>
        <div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${customer}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">10 Feb 2024</span></div>
        <div class="detail-row"><span class="detail-label">Due Date</span><span class="detail-value">20 Feb 2024</span></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Invoice downloaded!')"><i class="fas fa-download"></i> Download</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="showToast('Reminder sent!')"><i class="fas fa-paper-plane"></i> Send</button>
        </div>
    `);
}

// Customer Detail
function openCustomerDetail(name, initials, product, amount, stage) {
    openDetailModal('Customer Details', `
        <div style="text-align: center; padding: 20px 0;">
            <div class="avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4); width: 60px; height: 60px; font-size: 24px; margin: 0 auto;">${initials}</div>
            <div style="font-size: 18px; font-weight: 700; margin-top: 12px;">${name}</div>
            <div style="color: #64748b;">${product}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Deal Value</span><span class="detail-value">₹${amount}</span></div>
        <div class="detail-row"><span class="detail-label">Stage</span><span class="detail-value">${stage}</span></div>
        <div class="detail-row"><span class="detail-label">Contact</span><span class="detail-value">+91 98765 43210</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">contact@${name.toLowerCase().replace(' ', '')}.com</span></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Calling...')"><i class="fas fa-phone"></i> Call</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="openModal('quote')"><i class="fas fa-file-alt"></i> Quote</button>
        </div>
    `);
}

// Vendor Detail
function openVendorDetail(name, initials, ontime, amount) {
    openDetailModal('Vendor Details', `
        <div style="text-align: center; padding: 20px 0;">
            <div class="avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4); width: 60px; height: 60px; font-size: 24px; margin: 0 auto;">${initials}</div>
            <div style="font-size: 18px; font-weight: 700; margin-top: 12px;">${name}</div>
            <div style="color: #f59e0b;">★★★★★</div>
        </div>
        <div class="detail-row"><span class="detail-label">On-time Delivery</span><span class="detail-value">${ontime}</span></div>
        <div class="detail-row"><span class="detail-label">This Month</span><span class="detail-value">₹${amount}</span></div>
        <div class="detail-row"><span class="detail-label">Total Orders</span><span class="detail-value">156</span></div>
        <div class="detail-row"><span class="detail-label">Contact</span><span class="detail-value">+91 98765 43210</span></div>
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="openModal('po')"><i class="fas fa-plus"></i> Create PO</button>
        </div>
    `);
}

// Employee Detail
function openEmployeeDetail(name, initials, designation, dept, empId) {
    openDetailModal('Employee Details', `
        <div style="text-align: center; padding: 20px 0;">
            <div class="avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4); width: 60px; height: 60px; font-size: 24px; margin: 0 auto;">${initials}</div>
            <div style="font-size: 18px; font-weight: 700; margin-top: 12px;">${name}</div>
            <div style="color: #64748b;">${empId}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${dept}</span></div>
        <div class="detail-row"><span class="detail-label">Designation</span><span class="detail-value">${designation}</span></div>
        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">+91 98765 43210</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${name.toLowerCase().replace(' ', '.')}@company.com</span></div>
        <div class="detail-row"><span class="detail-label">Joining Date</span><span class="detail-value">15 Jan 2024</span></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Calling...')"><i class="fas fa-phone"></i> Call</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="showToast('Email opened')"><i class="fas fa-envelope"></i> Email</button>
        </div>
    `);
}

// Stock Detail
function openStockDetail(name, sku, qty, reorder, warehouse) {
    const pct = (parseInt(qty) / parseInt(reorder) * 100).toFixed(0);
    openDetailModal('Stock Details', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 48px; font-weight: 700; color: ${pct < 30 ? '#ef4444' : '#10b981'};">${qty}</div>
            <div style="color: #64748b;">units in stock</div>
        </div>
        <div class="detail-row"><span class="detail-label">Item</span><span class="detail-value">${name}</span></div>
        <div class="detail-row"><span class="detail-label">SKU</span><span class="detail-value">${sku}</span></div>
        <div class="detail-row"><span class="detail-label">Warehouse</span><span class="detail-value">${warehouse}</span></div>
        <div class="detail-row"><span class="detail-label">Reorder Level</span><span class="detail-value">${reorder}</span></div>
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="openModal('po'); closeModal();"><i class="fas fa-shopping-cart"></i> Create Purchase Order</button>
        </div>
    `);
}

// Purchase Order Detail
function openPODetail(id, vendor, status) {
    openDetailModal('Purchase Order', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 24px; font-weight: 700;">${id}</div>
            <span class="list-status status-info">${status}</span>
        </div>
        <div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div>
        <div class="detail-row"><span class="detail-label">Items</span><span class="detail-value">12</span></div>
        <div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">₹3,50,000</span></div>
        <div class="detail-row"><span class="detail-label">Order Date</span><span class="detail-value">08 Feb 2024</span></div>
        <div class="detail-row"><span class="detail-label">Expected</span><span class="detail-value">15 Feb 2024</span></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('PO downloaded!')"><i class="fas fa-download"></i> Download</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="openModal('grn'); closeModal();"><i class="fas fa-clipboard-check"></i> Create GRN</button>
        </div>
    `);
}

// Breakdown Detail
function openBreakdownDetail(machine, issue) {
    openDetailModal('Breakdown Details', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="width: 60px; height: 60px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;"><i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #ef4444;"></i></div>
            <div style="font-size: 18px; font-weight: 700; margin-top: 12px;">${machine}</div>
            <div style="color: #ef4444;">${issue}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Reported</span><span class="detail-value">2 hours ago</span></div>
        <div class="detail-row"><span class="detail-label">Downtime</span><span class="detail-value">2 hrs</span></div>
        <div class="detail-row"><span class="detail-label">Assigned To</span><span class="detail-value">Maintenance Team A</span></div>
        <div class="detail-row"><span class="detail-label">Priority</span><span class="detail-value" style="color: #ef4444;">Critical</span></div>
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="showToast('Marked as resolved!'); closeModal();"><i class="fas fa-check"></i> Mark Resolved</button>
        </div>
    `);
}

// Visitor Detail
function openVisitorDetail(name, company, host, time, badge) {
    openDetailModal('Visitor Badge', `
        <div class="visitor-badge" style="margin: 0; box-shadow: none;">
            <div class="badge-photo"><i class="fas fa-user"></i></div>
            <div class="badge-name">${name}</div>
            <div class="badge-company">${company}</div>
            <div class="badge-qr"><i class="fas fa-qrcode" style="font-size: 60px; color: #94a3b8;"></i></div>
            <div class="badge-info">
                <div class="badge-info-item"><div class="badge-info-label">Check In</div><div class="badge-info-value">${time}</div></div>
                <div class="badge-info-item"><div class="badge-info-label">Host</div><div class="badge-info-value">${host}</div></div>
                <div class="badge-info-item"><div class="badge-info-label">Badge #</div><div class="badge-info-value">${badge}</div></div>
            </div>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 16px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Badge printed!')"><i class="fas fa-print"></i> Print</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="showToast('Visitor checked out!'); closeModal();"><i class="fas fa-sign-out-alt"></i> Check Out</button>
        </div>
    `);
}

// Worker Performance Detail
function openWorkerDetail(name, line, units, incentive) {
    openDetailModal('Worker Performance', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 48px;">🏆</div>
            <div style="font-size: 18px; font-weight: 700; margin-top: 8px;">${name}</div>
            <div style="color: #64748b;">${line}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Units Today</span><span class="detail-value">${units}</span></div>
        <div class="detail-row"><span class="detail-label">Target</span><span class="detail-value">100</span></div>
        <div class="detail-row"><span class="detail-label">Achievement</span><span class="detail-value" style="color: #10b981;">${(parseInt(units) / 100 * 100).toFixed(0)}%</span></div>
        <div class="detail-row"><span class="detail-label">Today's Incentive</span><span class="detail-value" style="color: #10b981; font-weight: 700;">₹${incentive}</span></div>
        <div class="detail-row"><span class="detail-label">Month Total</span><span class="detail-value">₹8,450</span></div>
    `);
}

// Leave Request Detail
function openLeaveDetail(name, type, dates, status) {
    openDetailModal('Leave Request', `
        <div style="text-align: center; padding: 20px 0;">
            <div class="avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4); width: 60px; height: 60px; font-size: 24px; margin: 0 auto;">${name.split(' ').map(n => n[0]).join('')}</div>
            <div style="font-size: 18px; font-weight: 700; margin-top: 12px;">${name}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Leave Type</span><span class="detail-value">${type}</span></div>
        <div class="detail-row"><span class="detail-label">Dates</span><span class="detail-value">${dates}</span></div>
        <div class="detail-row"><span class="detail-label">Days</span><span class="detail-value">2</span></div>
        <div class="detail-row"><span class="detail-label">Reason</span><span class="detail-value">Personal work</span></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Leave rejected'); closeModal();"><i class="fas fa-times"></i> Reject</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="showToast('Leave approved!'); closeModal();"><i class="fas fa-check"></i> Approve</button>
        </div>
    `);
}

// Material Request Detail
function openMRDetail(id, dept, items, status) {
    openDetailModal('Material Request', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 24px; font-weight: 700;">${id}</div>
            <span class="list-status ${status === 'Pending' ? 'status-pending' : 'status-approved'}">${status}</span>
        </div>
        <div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${dept}</span></div>
        <div class="detail-row"><span class="detail-label">Items</span><span class="detail-value">${items}</span></div>
        <div class="detail-row"><span class="detail-label">Requested By</span><span class="detail-value">Rahul Kumar</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">12 Feb 2024</span></div>
        ${status === 'Pending' ? `<div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Request rejected'); closeModal();"><i class="fas fa-times"></i> Reject</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="showToast('Request approved!'); closeModal();"><i class="fas fa-check"></i> Approve</button>
        </div>` : ''}
    `);
}

// Scheduled Maintenance Detail
function openMaintenanceDetail(machine, task, time) {
    openDetailModal('Scheduled Maintenance', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="width: 60px; height: 60px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;"><i class="fas fa-cog" style="font-size: 24px; color: #3b82f6;"></i></div>
            <div style="font-size: 18px; font-weight: 700; margin-top: 12px;">${machine}</div>
            <div style="color: #64748b;">${task}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Scheduled</span><span class="detail-value">${time}</span></div>
        <div class="detail-row"><span class="detail-label">Type</span><span class="detail-value">Preventive</span></div>
        <div class="detail-row"><span class="detail-label">Assigned To</span><span class="detail-value">Tech Team A</span></div>
        <div class="detail-row"><span class="detail-label">Est. Duration</span><span class="detail-value">1 hour</span></div>
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="showToast('Maintenance started!'); closeModal();"><i class="fas fa-play"></i> Start Maintenance</button>
        </div>
    `);
}

// ASN Verification Detail
function openASNDetail(id, vendor, status) {
    openDetailModal('ASN Verification', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 24px; font-weight: 700;">${id}</div>
            <span class="list-status status-pending">${status}</span>
        </div>
        <div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div>
        <div class="detail-row"><span class="detail-label">Vehicle</span><span class="detail-value">MH12AB1234</span></div>
        <div class="detail-row"><span class="detail-label">Driver</span><span class="detail-value">Ramesh</span></div>
        <div class="detail-row"><span class="detail-label">Items</span><span class="detail-value">8</span></div>
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="showToast('ASN Verified! Proceed to GRN.'); closeModal();"><i class="fas fa-check"></i> Verify & Allow Entry</button>
        </div>
    `);
}

// GRN Detail
function openGRNDetail(id, vendor, status) {
    openDetailModal('GRN Details', `<div class="detail-row"><span class="detail-label">GRN #</span><span class="detail-value">${id}</span></div><div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div><div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${status}</span></div>`);
}

// Payment Detail
function openPaymentDetail(vendor, inv, amt, status) {
    openDetailModal('Payment Details', `<div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div><div class="detail-row"><span class="detail-label">Invoice</span><span class="detail-value">#${inv}</span></div><div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">₹${amt}</span></div><div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${status}</span></div><button class="btn btn-primary" style="margin-top: 20px;" onclick="showToast('Payment initiated!'); closeModal();"><i class="fas fa-credit-card"></i> Pay Now</button>`);
}

// Receivable Detail
function openReceivableDetail(customer, inv, amt) {
    openDetailModal('Receivable Details', `<div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${customer}</span></div><div class="detail-row"><span class="detail-label">Invoice</span><span class="detail-value">${inv}</span></div><div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">₹${amt}</span></div><button class="btn btn-primary" style="margin-top: 20px;" onclick="showToast('Reminder sent!'); closeModal();"><i class="fas fa-paper-plane"></i> Send Reminder</button>`);
}

// Ledger Detail
function openLedgerDetail(customer, total, outstanding) {
    openDetailModal('Customer Ledger', `<div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${customer}</span></div><div class="detail-row"><span class="detail-label">Total Business</span><span class="detail-value">₹${total}</span></div><div class="detail-row"><span class="detail-label">Outstanding</span><span class="detail-value" style="color: #ef4444;">₹${outstanding}</span></div>`);
}

// Material Issue Detail
function openIssueDetail(id, dept, items) {
    openDetailModal('Material Issue', `<div class="detail-row"><span class="detail-label">Issue #</span><span class="detail-value">${id}</span></div><div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${dept}</span></div><div class="detail-row"><span class="detail-label">Items</span><span class="detail-value">${items}</span></div>`);
}

// Spare Part Detail
function openSpareDetail(name, sku, qty) {
    openDetailModal('Spare Part', `<div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${name}</span></div><div class="detail-row"><span class="detail-label">SKU</span><span class="detail-value">${sku}</span></div><div class="detail-row"><span class="detail-label">Stock</span><span class="detail-value">${qty} pcs</span></div>`);
}
