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

// ===== Sales & Invoicing Details =====

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
        <div class="detail-row"><span class="detail-label">Reference</span><span class="detail-value">PO-2024-892</span></div>
        <div class="detail-row"><span class="detail-label">CGST (9%)</span><span class="detail-value">₹${(parseInt(amount.replace(/,/g, '')) * 0.09).toLocaleString()}</span></div>
        <div class="detail-row"><span class="detail-label">SGST (9%)</span><span class="detail-value">₹${(parseInt(amount.replace(/,/g, '')) * 0.09).toLocaleString()}</span></div>
        ${status !== 'Paid' ? `
        <div class="balance-card" style="margin-top:12px;">
            <div class="balance-label">Balance Pending</div>
            <div class="balance-amount">₹${amount}</div>
        </div>
        ` : ''}
        <div style="margin-top: 16px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Invoice downloaded!')"><i class="fas fa-download"></i> PDF</button>
            ${status !== 'Paid' ? `<button class="btn btn-primary" style="flex: 1;" onclick="openModal('paymentIn'); closeModal();"><i class="fas fa-rupee-sign"></i> Payment In</button>` : `<button class="btn btn-primary" style="flex: 1;" onclick="showToast('Receipt sent!')"><i class="fas fa-paper-plane"></i> Send</button>`}
        </div>
        <div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> Created: 10 Feb 2024, 09:15 AM by Admin</div>
    `);
}

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
        <div class="detail-row"><span class="detail-label">City</span><span class="detail-value">Pune</span></div>
        <div class="detail-row"><span class="detail-label">State</span><span class="detail-value">Maharashtra</span></div>
        <div class="detail-row"><span class="detail-label">GST Zone</span><span class="detail-value">Intra-State (CGST+SGST)</span></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('Calling...')"><i class="fas fa-phone"></i> Call</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="openModal('quote')"><i class="fas fa-file-alt"></i> Quote</button>
        </div>
    `);
}

function openPaymentInDetail(customer, invRef, totalAmt, paidAmt) {
    const balance = parseInt(totalAmt.replace(/,/g, '')) - parseInt(paidAmt.replace(/,/g, ''));
    openDetailModal('Payment Details', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 14px; color: #64748b;">Total Invoice Amount</div>
            <div style="font-size: 28px; font-weight: 700; color: #1e293b;">₹${totalAmt}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${customer}</span></div>
        <div class="detail-row"><span class="detail-label">Invoice</span><span class="detail-value">${invRef}</span></div>
        <div class="detail-row"><span class="detail-label">Amount Paid</span><span class="detail-value" style="color:#10b981;">₹${paidAmt}</span></div>
        <div class="balance-card">
            <div class="balance-label">Balance Remaining</div>
            <div class="balance-amount">₹${balance.toLocaleString()}</div>
        </div>
        <div style="margin-top: 16px;">
            <button class="btn btn-primary" onclick="openModal('paymentIn'); closeModal();"><i class="fas fa-plus"></i> Record Next Payment</button>
        </div>
    `);
}

// ===== Vendor Details =====

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
        <div class="detail-row"><span class="detail-label">GSTIN</span><span class="detail-value">27AABCU9603R1ZM</span></div>
        <div class="detail-row"><span class="detail-label">Contact</span><span class="detail-value">+91 98765 43210</span></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="openModal('vendorPayment'); closeModal();"><i class="fas fa-rupee-sign"></i> Pay</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="openModal('po')"><i class="fas fa-plus"></i> New PO</button>
        </div>
    `);
}

function openPODetail(id, vendor, status) {
    openDetailModal('Purchase Order', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 24px; font-weight: 700;">${id}</div>
            <span class="list-status status-info">${status}</span>
        </div>
        <div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div>
        <div class="detail-row"><span class="detail-label">Items</span><span class="detail-value">12</span></div>
        <div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">₹3,50,000</span></div>
        <div class="detail-row"><span class="detail-label">GST (18%)</span><span class="detail-value">₹63,000</span></div>
        <div class="detail-row"><span class="detail-label">Total</span><span class="detail-value" style="font-weight:700;">₹4,13,000</span></div>
        <div class="detail-row"><span class="detail-label">Order Date</span><span class="detail-value">08 Feb 2024</span></div>
        <div class="detail-row"><span class="detail-label">Expected</span><span class="detail-value">15 Feb 2024</span></div>
        <div class="line-items-section" style="margin-top:12px;">
            <div class="line-items-title" style="margin-bottom:6px;">Line Items</div>
            <div class="line-item-row"><span class="item-name">Steel Rod 10mm</span><span class="item-qty">500 pcs</span><span class="item-rate">₹75,000</span></div>
            <div class="line-item-row"><span class="item-name">Bearing 6205</span><span class="item-qty">100 pcs</span><span class="item-rate">₹22,000</span></div>
        </div>
        <div style="margin-top: 16px; display: flex; gap: 12px;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="showToast('PO downloaded!')"><i class="fas fa-download"></i> PDF</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="openModal('asn'); closeModal();"><i class="fas fa-shipping-fast"></i> Create ASN</button>
        </div>
        <div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> Created: 08 Feb 2024 by Admin</div>
    `);
}

// ===== Inventory Details =====

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

function openGoodsReceiptDetail(poRef, asnRef, vendor, items, secStatus) {
    openDetailModal('Goods Receipt', `
        <div class="flow-indicator">
            <div class="flow-step"><div class="flow-step-icon completed"><i class="fas fa-file-alt"></i></div><div class="flow-step-label">PO</div></div>
            <span class="flow-arrow"><i class="fas fa-chevron-right"></i></span>
            <div class="flow-step"><div class="flow-step-icon completed"><i class="fas fa-shipping-fast"></i></div><div class="flow-step-label">ASN</div></div>
            <span class="flow-arrow"><i class="fas fa-chevron-right"></i></span>
            <div class="flow-step"><div class="flow-step-icon ${secStatus === 'Cleared' ? 'completed' : 'active'}"><i class="fas fa-shield-alt"></i></div><div class="flow-step-label">Security</div></div>
            <span class="flow-arrow"><i class="fas fa-chevron-right"></i></span>
            <div class="flow-step"><div class="flow-step-icon ${secStatus === 'Cleared' ? 'active' : 'pending'}"><i class="fas fa-clipboard-check"></i></div><div class="flow-step-label">Receipt</div></div>
        </div>
        <div class="detail-row"><span class="detail-label">PO Reference</span><span class="detail-value">${poRef}</span></div>
        <div class="detail-row"><span class="detail-label">ASN Reference</span><span class="detail-value">${asnRef}</span></div>
        <div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div>
        <div class="detail-row"><span class="detail-label">Items</span><span class="detail-value">${items}</span></div>
        <div class="detail-row"><span class="detail-label">Security</span><span class="detail-value"><span class="list-status ${secStatus === 'Cleared' ? 'status-approved' : 'status-pending'}">${secStatus}</span></span></div>
        <div style="margin-top:16px;">
            <button class="btn btn-primary" onclick="openModal('goodsReceipt'); closeModal();"><i class="fas fa-clipboard-check"></i> Process Receipt</button>
        </div>
    `);
}

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

function openIssueDetail(id, dept, items) {
    openDetailModal('Material Issue', `<div class="detail-row"><span class="detail-label">Issue #</span><span class="detail-value">${id}</span></div><div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${dept}</span></div><div class="detail-row"><span class="detail-label">Items</span><span class="detail-value">${items}</span></div>`);
}

// ===== Security Details =====

function openSecurityAttendanceDetail(name, empId, timeIn, dept) {
    openDetailModal('Attendance Record', `
        <div style="text-align:center;padding:20px 0;">
            <div class="avatar" style="background:linear-gradient(135deg,#10b981,#06b6d4);width:60px;height:60px;font-size:24px;margin:0 auto;">${name.split(' ').map(n => n[0]).join('')}</div>
            <div style="font-size:18px;font-weight:700;margin-top:12px;">${name}</div>
            <div style="color:#64748b;">${empId}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${dept}</span></div>
        <div class="detail-row"><span class="detail-label">Time In</span><span class="detail-value">${timeIn}</span></div>
        <div class="detail-row"><span class="detail-label">Method</span><span class="detail-value">Face Scan</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="list-status status-approved">On Time</span></span></div>
    `);
}

function openGoodsVerifyDetail(asnId, vendor, invoice, status) {
    openDetailModal('Goods Verification', `
        <div style="text-align:center;padding:20px 0;">
            <div style="font-size:24px;font-weight:700;">${asnId || 'Manual Entry'}</div>
            <span class="list-status ${status === 'Verified' ? 'status-approved' : 'status-pending'}">${status}</span>
        </div>
        <div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div>
        <div class="detail-row"><span class="detail-label">Invoice</span><span class="detail-value">${invoice}</span></div>
        <div class="detail-row"><span class="detail-label">Vehicle</span><span class="detail-value">MH12AB1234</span></div>
        <div class="detail-row"><span class="detail-label">Packages</span><span class="detail-value">12</span></div>
        <div class="detail-row"><span class="detail-label">Condition</span><span class="detail-value">Good</span></div>
        ${status !== 'Verified' ? `<div style="margin-top:16px;">
            <button class="btn btn-primary" onclick="showToast('Goods verified! Notification sent.'); closeModal();"><i class="fas fa-check"></i> Verify & Allow Entry</button>
        </div>` : ''}
        <div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> Security checkpoint log</div>
    `);
}

function openVisitorApproval(name, company, purpose, host) {
    openDetailModal('Visitor Approval', `
        <div style="text-align:center;padding:20px 0;">
            <div class="badge-photo"><i class="fas fa-user"></i></div>
            <div style="font-size:18px;font-weight:700;margin-top:8px;">${name}</div>
            <div style="color:#64748b;">${company}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Purpose</span><span class="detail-value">${purpose}</span></div>
        <div class="detail-row"><span class="detail-label">Host</span><span class="detail-value">${host}</span></div>
        <div class="detail-row"><span class="detail-label">Requested</span><span class="detail-value">Today, 10:00 AM</span></div>
        <div class="approve-actions" style="margin-top:16px;">
            <button class="approve-btn reject" onclick="showToast('Visitor denied'); closeModal();"><i class="fas fa-times"></i> Deny</button>
            <button class="approve-btn accept" onclick="showToast('Visitor approved! Notification sent to ${host}'); closeModal();"><i class="fas fa-check"></i> Approve</button>
        </div>
    `);
}

// ===== Finance Details =====

function openPaymentDetail(vendor, inv, amt, status) {
    openDetailModal('Payment Details', `
        <div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div>
        <div class="detail-row"><span class="detail-label">Invoice</span><span class="detail-value">#${inv}</span></div>
        <div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">₹${amt}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${status}</span></div>
        <div style="margin-top:16px;display:flex;gap:12px;">
            <button class="btn btn-secondary" style="flex:1;" onclick="showToast('Payment marked!')"><i class="fas fa-check"></i> Mark Paid</button>
            <button class="btn btn-primary" style="flex:1;" onclick="openModal('vendorPayment'); closeModal();"><i class="fas fa-credit-card"></i> Pay Now</button>
        </div>
        <div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> Financial audit trail</div>
    `);
}

function openReceivableDetail(customer, inv, amt) {
    openDetailModal('Receivable Details', `
        <div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${customer}</span></div>
        <div class="detail-row"><span class="detail-label">Invoice</span><span class="detail-value">${inv}</span></div>
        <div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">₹${amt}</span></div>
        <div class="balance-card"><div class="balance-label">Outstanding</div><div class="balance-amount">₹${amt}</div></div>
        <div style="display:flex;gap:12px;">
            <button class="btn btn-secondary" style="flex:1;" onclick="showToast('Reminder sent!')"><i class="fas fa-paper-plane"></i> Remind</button>
            <button class="btn btn-primary" style="flex:1;" onclick="openModal('paymentIn'); closeModal();"><i class="fas fa-rupee-sign"></i> Payment In</button>
        </div>
    `);
}

function openLedgerDetail(customer, total, outstanding) {
    openDetailModal('Customer Ledger', `<div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${customer}</span></div><div class="detail-row"><span class="detail-label">Total Business</span><span class="detail-value">₹${total}</span></div><div class="detail-row"><span class="detail-label">Outstanding</span><span class="detail-value" style="color: #ef4444;">₹${outstanding}</span></div>`);
}

// ===== Maintenance Details =====

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
        <div class="detail-row"><span class="detail-label">Checklist</span><span class="detail-value">5 items</span></div>
        <div style="margin-top: 20px;">
            <button class="btn btn-primary" onclick="showToast('Maintenance started!'); closeModal();"><i class="fas fa-play"></i> Start Maintenance</button>
        </div>
    `);
}

function openPreventiveDetail(machine, frequency, lastDone, nextDue) {
    openDetailModal('Preventive Schedule', `
        <div style="text-align:center;padding:20px 0;">
            <div style="width:60px;height:60px;background:#dbeafe;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;"><i class="fas fa-calendar-check" style="font-size:24px;color:#3b82f6;"></i></div>
            <div style="font-size:18px;font-weight:700;margin-top:12px;">${machine}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Frequency</span><span class="detail-value">${frequency}</span></div>
        <div class="detail-row"><span class="detail-label">Last Completed</span><span class="detail-value">${lastDone}</span></div>
        <div class="detail-row"><span class="detail-label">Next Due</span><span class="detail-value">${nextDue}</span></div>
        <div class="detail-row"><span class="detail-label">Assigned</span><span class="detail-value">Maintenance Team A</span></div>
        <div style="margin-top:16px;">
            <button class="btn btn-primary" onclick="showToast('Schedule updated!'); closeModal();"><i class="fas fa-edit"></i> Edit Schedule</button>
        </div>
    `);
}

function openSpareDetail(name, sku, qty) {
    openDetailModal('Spare Part', `<div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${name}</span></div><div class="detail-row"><span class="detail-label">SKU</span><span class="detail-value">${sku}</span></div><div class="detail-row"><span class="detail-label">Stock</span><span class="detail-value">${qty} pcs</span></div>`);
}

// ===== HR Details =====

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

// ===== Production Details =====

function openOEEDetail(machine, oee, avail, perf, quality) {
    const oeeClass = oee >= 85 ? 'high' : oee >= 60 ? 'medium' : 'low';
    openDetailModal('Machine OEE', `
        <div style="text-align:center;padding:20px 0;">
            <div style="font-size:48px;font-weight:700;color:${oee >= 85 ? '#10b981' : oee >= 60 ? '#f59e0b' : '#ef4444'};">${oee}%</div>
            <div style="font-size:14px;color:#64748b;">Overall Equipment Effectiveness</div>
            <div style="font-size:16px;font-weight:600;margin-top:4px;">${machine}</div>
        </div>
        <div class="oee-metrics">
            <div class="oee-metric"><div class="oee-metric-value" style="color:#3b82f6;">${avail}%</div><div class="oee-metric-label">Availability</div></div>
            <div class="oee-metric"><div class="oee-metric-value" style="color:#f59e0b;">${perf}%</div><div class="oee-metric-label">Performance</div></div>
            <div class="oee-metric"><div class="oee-metric-value" style="color:#10b981;">${quality}%</div><div class="oee-metric-label">Quality</div></div>
        </div>
        <div style="margin-top:16px;">
            <div class="detail-row"><span class="detail-label">Shift</span><span class="detail-value">Morning</span></div>
            <div class="detail-row"><span class="detail-label">Planned Time</span><span class="detail-value">8 hrs</span></div>
            <div class="detail-row"><span class="detail-label">Actual Run Time</span><span class="detail-value">${(8 * avail / 100).toFixed(1)} hrs</span></div>
            <div class="detail-row"><span class="detail-label">Good Parts</span><span class="detail-value">${Math.round(100 * quality / 100)}</span></div>
            <div class="detail-row"><span class="detail-label">Scrap/NC</span><span class="detail-value">${Math.round(100 * (100 - quality) / 100)}</span></div>
        </div>
    `);
}

function openProductionDetail(employee, part, op, qty, shift) {
    openDetailModal('Production Entry', `
        <div class="detail-row"><span class="detail-label">Employee</span><span class="detail-value">${employee}</span></div>
        <div class="detail-row"><span class="detail-label">Shift</span><span class="detail-value">${shift}</span></div>
        <div class="detail-row"><span class="detail-label">Part</span><span class="detail-value">${part}</span></div>
        <div class="detail-row"><span class="detail-label">Operation</span><span class="detail-value">${op}</span></div>
        <div class="detail-row"><span class="detail-label">Quantity</span><span class="detail-value">${qty}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">12 Feb 2024</span></div>
        <div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> Logged: 12 Feb 2024, 02:15 PM</div>
    `);
}

function openShiftDetail(name, start, end, downtime) {
    openDetailModal('Shift Details', `
        <div style="text-align:center;padding:20px 0;">
            <div style="font-size:18px;font-weight:700;">${name}</div>
        </div>
        <div class="detail-row"><span class="detail-label">Start Time</span><span class="detail-value">${start}</span></div>
        <div class="detail-row"><span class="detail-label">End Time</span><span class="detail-value">${end}</span></div>
        <div class="detail-row"><span class="detail-label">Planned Downtime</span><span class="detail-value">${downtime} min</span></div>
        <div class="detail-row"><span class="detail-label">Break</span><span class="detail-value">30 min</span></div>
        <div class="detail-row"><span class="detail-label">Active Days</span><span class="detail-value">Mon-Sat</span></div>
    `);
}

function openScrapDetail(part, scrapQty, ncQty, reason, shift) {
    openDetailModal('Scrap/NC Details', `
        <div class="detail-row"><span class="detail-label">Part</span><span class="detail-value">${part}</span></div>
        <div class="detail-row"><span class="detail-label">Shift</span><span class="detail-value">${shift}</span></div>
        <div class="detail-row"><span class="detail-label">Scrap Qty</span><span class="detail-value" style="color:#ef4444;">${scrapQty}</span></div>
        <div class="detail-row"><span class="detail-label">NC Qty</span><span class="detail-value" style="color:#f59e0b;">${ncQty}</span></div>
        <div class="detail-row"><span class="detail-label">Reason</span><span class="detail-value">${reason}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">12 Feb 2024</span></div>
        <div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> Production audit trail</div>
    `);
}

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

// ===== Visitor Details =====

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

// ===== ASN / GRN Details =====

function openASNDetail(id, vendor, status) {
    openDetailModal('ASN Verification', `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 24px; font-weight: 700;">${id}</div>
            <span class="list-status status-pending">${status}</span>
        </div>
        <div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div>
        <div class="detail-row"><span class="detail-label">Vehicle</span><span class="detail-value">MH12AB1234</span></div>
        <div class="detail-row"><span class="detail-label">Driver</span><span class="detail-value">Ramesh</span></div>
        <div class="line-items-section" style="margin-top:12px;">
            <div class="line-items-title" style="margin-bottom:6px;">Items as per PO</div>
            <div class="line-item-row"><span class="item-name">Steel Rod 10mm</span><span class="item-qty">500 pcs</span><span class="item-rate">₹75,000</span></div>
            <div class="line-item-row"><span class="item-name">Bearing 6205</span><span class="item-qty">100 pcs</span><span class="item-rate">₹22,000</span></div>
        </div>
        <div style="margin-top: 16px;">
            <button class="btn btn-primary" onclick="showToast('ASN Verified! Proceed to GRN.'); closeModal();"><i class="fas fa-check"></i> Verify & Allow Entry</button>
        </div>
    `);
}

function openGRNDetail(id, vendor, status) {
    openDetailModal('GRN Details', `<div class="detail-row"><span class="detail-label">GRN #</span><span class="detail-value">${id}</span></div><div class="detail-row"><span class="detail-label">Vendor</span><span class="detail-value">${vendor}</span></div><div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${status}</span></div><div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> Audit logged</div>`);
}
