/* ============================================
   Mobile ERP - Modal Definitions & Logic
   All modal forms, open/close/submit handlers
   ============================================ */

// ===== Modal Definitions =====
const modalDefinitions = {
    // --- Sales & Invoicing ---
    'invoice': {
        title: 'Create Invoice', fields: [
            { label: 'Reference Type', type: 'select', options: ['Select Reference', 'PO Reference', 'General'], id: 'invoiceRefType', onchange: 'handleInvoiceRefChange()' },
            { label: 'PO Number', type: 'select', options: ['PO-2024-892', 'PO-2024-891', 'PO-2024-890'], id: 'invoicePO', hidden: true },
            { label: 'Customer', type: 'select', options: ['ABC Corporation', 'Tech Industries', 'Global Mfg'] },
            { label: 'Invoice Date', type: 'date' },
            { label: 'Due Date', type: 'date' },
            { label: 'GSTIN', type: 'text', placeholder: 'Enter GSTIN' },
            {
                section: 'lineItems', title: 'Line Items', items: [
                    { name: 'Steel Rod 10mm', qty: '100', rate: '₹150', amount: '₹15,000' },
                    { name: 'Bearing 6205', qty: '50', rate: '₹220', amount: '₹11,000' }
                ]
            },
            { label: 'CGST (%)', type: 'number', placeholder: '9', rowWith: 'SGST (%)' },
            { label: 'SGST (%)', type: 'number', placeholder: '9' },
            { label: 'Total Amount (₹)', type: 'number', placeholder: 'Auto-calculated' },
            { label: 'Notes', type: 'textarea', placeholder: 'Invoice notes' }
        ]
    },
    'quote': {
        title: 'Create Quote', fields: [
            { label: 'Customer', type: 'select', options: ['ABC Corporation', 'Tech Industries', 'Global Mfg'] },
            { label: 'Source', type: 'select', options: ['From Item List', 'General (Manual Entry)'], id: 'quoteSource' },
            { label: 'Valid Until', type: 'date' },
            {
                section: 'lineItems', title: 'Quote Line Items', items: [
                    { name: 'Steel Rod 10mm', qty: '200', rate: '₹145', amount: '₹29,000' }
                ]
            },
            { label: 'Discount (%)', type: 'number', placeholder: '0' },
            { label: 'Notes', type: 'textarea', placeholder: 'Quote terms & notes' }
        ]
    },
    'customer': {
        title: 'Add Customer', fields: [
            { label: 'Company Name', type: 'text', placeholder: 'Enter company name', required: true },
            { label: 'Contact Person', type: 'text', placeholder: 'Enter contact name' },
            { label: 'Phone', type: 'tel', placeholder: 'Enter phone number' },
            { label: 'Email', type: 'email', placeholder: 'Enter email' },
            { label: 'GSTIN', type: 'text', placeholder: 'Enter GSTIN' },
            { label: 'City', type: 'text', placeholder: 'Enter city', required: true },
            { label: 'State', type: 'select', options: ['Select State', 'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'], required: true },
            { label: 'Address', type: 'textarea', placeholder: 'Enter address' },
            { info: 'City & State are required for CGST/IGST/SGST calculation.' }
        ]
    },
    'paymentIn': {
        title: 'Payment In', fields: [
            { label: 'Customer', type: 'select', options: ['ABC Corporation', 'Tech Industries', 'Global Mfg'] },
            { label: 'Invoice Reference', type: 'select', options: ['INV-2024-1234 (₹45,000)', 'INV-2024-1235 (₹1,20,000)', 'INV-2024-1236 (₹2,80,000)'] },
            { label: 'Amount Received (₹)', type: 'number', placeholder: 'Enter amount received' },
            { label: 'Payment Mode', type: 'select', options: ['Bank Transfer', 'Cheque', 'Cash', 'UPI'] },
            { label: 'Transaction Reference', type: 'text', placeholder: 'Enter reference number' },
            { label: 'Date Received', type: 'date' },
            { label: 'Remarks', type: 'textarea', placeholder: 'Payment remarks' },
            { info: 'Balance amount will be shown after submission.' }
        ]
    },
    'poInward': {
        title: 'PO Inward (Customer PO)', fields: [
            { label: 'Customer', type: 'select', options: ['ABC Corporation', 'Tech Industries', 'Global Mfg'] },
            { label: 'Customer PO Number', type: 'text', placeholder: 'Enter customer PO number' },
            { label: 'PO Date', type: 'date' },
            { label: 'Delivery Date', type: 'date' },
            {
                section: 'lineItems', title: 'PO Line Items', items: [
                    { name: 'Part A - Bracket', qty: '500', rate: '₹45', amount: '₹22,500' }
                ]
            },
            { label: 'Total Value (₹)', type: 'number', placeholder: 'Auto-calculated' },
            { label: 'Special Instructions', type: 'textarea', placeholder: 'Any special requirements' }
        ]
    },

    // --- Vendor Management ---
    'po': {
        title: 'Create Purchase Order', fields: [
            { label: 'Vendor', type: 'select', options: ['Steel Suppliers Ltd', 'Parts Corporation', 'Logistics Inc'] },
            { label: 'PO Date', type: 'date' },
            { label: 'Delivery Date', type: 'date' },
            {
                section: 'lineItems', title: 'PO Line Items', items: [
                    { name: 'Steel Rod 10mm', qty: '500', rate: '₹150', amount: '₹75,000' },
                    { name: 'Bearing 6205', qty: '100', rate: '₹220', amount: '₹22,000' }
                ]
            },
            { label: 'GST (%)', type: 'number', placeholder: '18' },
            { label: 'Total Amount (₹)', type: 'number', placeholder: 'Auto-calculated' },
            { label: 'Terms & Conditions', type: 'textarea', placeholder: 'Payment terms, delivery terms...' }
        ]
    },
    'asn': {
        title: 'Create ASN', fields: [
            { label: 'PO Number', type: 'select', options: ['PO-2024-892', 'PO-2024-891', 'PO-2024-890'] },
            {
                section: 'lineItems', title: 'ASN Line Items (per PO)', items: [
                    { name: 'Steel Rod 10mm', qty: '500', rate: '₹150', amount: '₹75,000' },
                    { name: 'Bearing 6205', qty: '100', rate: '₹220', amount: '₹22,000' }
                ]
            },
            { label: 'Vehicle Number', type: 'text', placeholder: 'Enter vehicle number' },
            { label: 'Driver Name', type: 'text', placeholder: 'Enter driver name' },
            { label: 'Driver Phone', type: 'tel', placeholder: 'Enter driver phone' },
            { label: 'Expected Arrival', type: 'datetime-local' },
            { label: 'Invoice Number', type: 'text', placeholder: 'Vendor invoice number' },
            { label: 'Invoice Amount (₹)', type: 'number', placeholder: 'Enter invoice amount' }
        ]
    },
    'grn': {
        title: 'Create GRN', fields: [
            { label: 'ASN Number', type: 'select', options: ['ASN-2024-156', 'ASN-2024-155'] },
            { label: 'Received Qty', type: 'number', placeholder: 'Enter quantity' },
            { label: 'Condition', type: 'select', options: ['Good', 'Damaged', 'Partial'] },
            { label: 'Quality Check', type: 'select', options: ['Passed', 'Failed', 'Pending'] },
            { label: 'Remarks', type: 'textarea', placeholder: 'Enter remarks' }
        ]
    },
    'itemMaster': {
        title: 'Create Item Master', fields: [
            { label: 'Item Name', type: 'text', placeholder: 'Enter item name', required: true },
            { label: 'Item Code/SKU', type: 'text', placeholder: 'Auto-generated or manual' },
            { label: 'Item Type', type: 'select', options: ['Purchase', 'Sales', 'Both'], required: true },
            { label: 'Category', type: 'select', options: ['Raw Material', 'Finished Goods', 'Semi-Finished', 'Consumables', 'Spare Parts'] },
            { label: 'Unit of Measure', type: 'select', options: ['Pcs', 'Kg', 'Ltr', 'Mtr', 'Box', 'Set'] },
            { label: 'HSN Code', type: 'text', placeholder: 'Enter HSN code' },
            { label: 'GST Rate (%)', type: 'select', options: ['0%', '5%', '12%', '18%', '28%'] },
            { label: 'Standard Price (₹)', type: 'number', placeholder: 'Enter price' },
            { label: 'Reorder Level', type: 'number', placeholder: 'Minimum stock level' }
        ]
    },

    // --- Inventory ---
    'materialRequest': {
        title: 'Material Request', fields: [
            { label: 'Department', type: 'select', options: ['Production Line A', 'Production Line B', 'Maintenance', 'Quality'] },
            { label: 'Item', type: 'text', placeholder: 'Enter item name' },
            { label: 'Quantity', type: 'number', placeholder: 'Enter quantity' },
            { label: 'Required Date', type: 'date' },
            { label: 'Reason', type: 'textarea', placeholder: 'Enter reason' }
        ]
    },
    'goodsReceipt': {
        title: 'Goods Receipt', fields: [
            { label: 'PO Reference', type: 'select', options: ['PO-2024-892', 'PO-2024-891', 'PO-2024-890'] },
            { label: 'ASN Reference', type: 'select', options: ['ASN-2024-156', 'ASN-2024-155'] },
            { label: 'Security Clearance', type: 'select', options: ['Cleared', 'Pending'] },
            {
                section: 'lineItems', title: 'Received Items', items: [
                    { name: 'Steel Rod 10mm', qty: '500', rate: '₹150', amount: '₹75,000' }
                ]
            },
            { label: 'Quality Status', type: 'select', options: ['Passed', 'Failed', 'Partial'] },
            { label: 'Received By', type: 'text', placeholder: 'Enter name' },
            { label: 'Remarks', type: 'textarea', placeholder: 'Receipt remarks' }
        ]
    },

    // --- Finance ---
    'payment': {
        title: 'Record Payment (Outward)', fields: [
            { label: 'Vendor', type: 'select', options: ['Steel Suppliers Ltd', 'Parts Corporation'] },
            { label: 'Invoice Reference', type: 'select', options: ['INV-445 (₹2,50,000)', 'INV-446 (₹1,80,000)'] },
            { label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount' },
            { label: 'Payment Mode', type: 'select', options: ['Bank Transfer', 'Cheque', 'Cash', 'UPI'] },
            { label: 'Reference Number', type: 'text', placeholder: 'Transaction reference' },
            { label: 'Payment Date', type: 'date' }
        ]
    },
    'vendorPayment': {
        title: 'Vendor Payment', fields: [
            { label: 'Vendor', type: 'select', options: ['Steel Suppliers Ltd', 'Parts Corporation', 'Logistics Inc'] },
            { label: 'Invoice Reference', type: 'select', options: ['INV-445', 'INV-446', 'INV-447'] },
            { label: 'Amount (₹)', type: 'number', placeholder: 'Enter payment amount' },
            { label: 'Payment Mode', type: 'select', options: ['NEFT', 'RTGS', 'Cheque', 'UPI'] },
            { label: 'UTR / Reference', type: 'text', placeholder: 'Enter UTR or reference' },
            { label: 'Date', type: 'date' },
            { label: 'Remarks', type: 'textarea', placeholder: 'Payment notes' }
        ]
    },

    // --- Machine Maintenance ---
    'breakdown': {
        title: 'Report Breakdown', fields: [
            { label: 'Machine', type: 'select', options: ['CNC Machine #1', 'CNC Machine #2', 'CNC Machine #3', 'Lathe #1', 'Lathe #2'] },
            { label: 'Issue Type', type: 'select', options: ['Electrical', 'Mechanical', 'Hydraulic', 'Software', 'Other'] },
            { label: 'Description', type: 'textarea', placeholder: 'Describe the issue' },
            { label: 'Priority', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] }
        ]
    },
    'preventiveMaintenance': {
        title: 'Preventive Maintenance Schedule', fields: [
            { label: 'Machine', type: 'select', options: ['CNC Machine #1', 'CNC Machine #2', 'CNC Machine #3', 'Lathe #1', 'Lathe #2', 'Drill Press #1'], required: true },
            { label: 'Maintenance Type', type: 'select', options: ['Oil Change', 'Belt Inspection', 'Bearing Check', 'Electrical Inspection', 'Calibration', 'Full Service'] },
            { label: 'Frequency', type: 'select', options: ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'] },
            { label: 'Assigned Team', type: 'select', options: ['Maintenance Team A', 'Maintenance Team B', 'External Vendor'] },
            { label: 'Estimated Duration', type: 'select', options: ['30 min', '1 hour', '2 hours', '4 hours', 'Full Day'] },
            { label: 'Checklist Items', type: 'textarea', placeholder: 'Enter checklist items (one per line)' },
            { label: 'Next Scheduled Date', type: 'date' }
        ]
    },

    // --- HR Management ---
    'employee': {
        title: 'Add Employee', fields: [
            { label: 'Full Name', type: 'text', placeholder: 'Enter full name', required: true },
            { label: 'Department', type: 'select', options: ['Production', 'Maintenance', 'Quality', 'Accounts', 'HR', 'Sales'] },
            { label: 'Designation', type: 'text', placeholder: 'Enter designation' },
            { label: 'Phone', type: 'tel', placeholder: 'Enter phone number' },
            { label: 'Email', type: 'email', placeholder: 'Enter email' },
            { label: 'Joining Date', type: 'date' }
        ]
    },
    'incentiveConfig': {
        title: 'Incentive Configuration', fields: [
            { label: 'Part', type: 'select', options: ['Part A - Bracket', 'Part B - Housing', 'Part C - Shaft', 'Part D - Gear'] },
            { label: 'Operation', type: 'select', options: ['Turning', 'Milling', 'Drilling', 'Grinding', 'Assembly', 'Inspection'] },
            { label: 'Machine', type: 'select', options: ['CNC Machine #1', 'CNC Machine #2', 'Lathe #1', 'Lathe #2'] },
            { label: 'Target Qty (per shift)', type: 'number', placeholder: 'Enter target quantity' },
            { label: 'Range 1: Qty (101-120)', type: 'number', placeholder: 'Price per unit ₹' },
            { label: 'Range 2: Qty (121-150)', type: 'number', placeholder: 'Price per unit ₹' },
            { label: 'Range 3: Qty (151+)', type: 'number', placeholder: 'Price per unit ₹' },
            { info: 'Incentive applies when production exceeds target qty.' }
        ]
    },
    'payrollMaster': {
        title: 'Payroll Configuration', fields: [
            { label: 'Employee', type: 'select', options: ['Amit Verma', 'Sunita Mehra', 'Rahul Kumar', 'Suresh Kumar'] },
            { label: 'Basic Pay (₹)', type: 'number', placeholder: 'Enter basic pay' },
            { label: 'HRA (₹)', type: 'number', placeholder: 'House rent allowance' },
            { label: 'DA (₹)', type: 'number', placeholder: 'Dearness allowance' },
            { label: 'PF Deduction (%)', type: 'number', placeholder: '12' },
            { label: 'ESI Deduction (%)', type: 'number', placeholder: '0.75' },
            { label: 'Professional Tax (₹)', type: 'number', placeholder: '200' },
            { label: 'Other Deductions (₹)', type: 'number', placeholder: '0' }
        ]
    },
    'workingHours': {
        title: 'Working Hours Config', fields: [
            { label: 'Minimum Hours - Full Day', type: 'number', placeholder: 'e.g. 8' },
            { label: 'Minimum Hours - Half Day', type: 'number', placeholder: 'e.g. 4' },
            { label: 'Overtime Rate (per hour ₹)', type: 'number', placeholder: 'Enter OT rate' },
            { label: 'Grace Period (minutes)', type: 'number', placeholder: 'e.g. 15' },
            { label: 'Shift Start Time', type: 'time' },
            { label: 'Shift End Time', type: 'time' }
        ]
    },

    // --- Production ---
    'productionInput': {
        title: 'Production Entry', fields: [
            { label: 'Shift', type: 'select', options: ['Morning (6AM-2PM)', 'Afternoon (2PM-10PM)', 'Night (10PM-6AM)'] },
            { label: 'Date', type: 'date' },
            { label: 'Employee', type: 'select', options: ['Suresh Kumar', 'Ramesh Yadav', 'Anil Singh', 'Vijay Patil'] },
            { label: 'Machine', type: 'select', options: ['CNC Machine #1', 'CNC Machine #2', 'CNC Machine #3', 'Lathe #1', 'Lathe #2'] },
            { label: 'Part', type: 'select', options: ['Part A - Bracket', 'Part B - Housing', 'Part C - Shaft', 'Part D - Gear'] },
            { label: 'Operation', type: 'select', options: ['Turning', 'Milling', 'Drilling', 'Grinding', 'Assembly'] },
            { label: 'Quantity Produced', type: 'number', placeholder: 'Enter quantity' },
            { label: 'Remarks', type: 'textarea', placeholder: 'Any production notes' }
        ]
    },
    'shiftMaster': {
        title: 'Create Shift', fields: [
            { label: 'Shift Name', type: 'text', placeholder: 'e.g. Morning Shift', required: true },
            { label: 'Start Time', type: 'time', required: true },
            { label: 'End Time', type: 'time', required: true },
            { label: 'Planned Downtime (minutes)', type: 'number', placeholder: 'e.g. 30' },
            { label: 'Break Duration (minutes)', type: 'number', placeholder: 'e.g. 30' },
            { label: 'Active Days', type: 'select', options: ['Mon-Sat', 'Mon-Fri', 'All Days', 'Custom'] }
        ]
    },
    'scrapEntry': {
        title: 'Scrap / NC Entry', fields: [
            { label: 'Date', type: 'date' },
            { label: 'Shift', type: 'select', options: ['Morning (6AM-2PM)', 'Afternoon (2PM-10PM)', 'Night (10PM-6AM)'] },
            { label: 'Machine', type: 'select', options: ['CNC Machine #1', 'CNC Machine #2', 'CNC Machine #3', 'Lathe #1', 'Lathe #2'] },
            { label: 'Part', type: 'select', options: ['Part A - Bracket', 'Part B - Housing', 'Part C - Shaft', 'Part D - Gear'] },
            { label: 'Scrap Quantity', type: 'number', placeholder: 'Enter scrap qty' },
            { label: 'NC Quantity', type: 'number', placeholder: 'Enter NC qty' },
            { label: 'Reason', type: 'select', options: ['Tool Wear', 'Material Defect', 'Operator Error', 'Machine Malfunction', 'Other'] },
            { label: 'Description', type: 'textarea', placeholder: 'Describe the issue' }
        ]
    },

    // --- Security ---
    'securityAttendance': {
        title: 'Manual Attendance', fields: [
            { label: 'Employee Code', type: 'text', placeholder: 'Enter employee code or scan' },
            { label: 'Employee Name', type: 'text', placeholder: 'Auto-filled after code entry' },
            { label: 'Time In', type: 'time' },
            { label: 'Entry Type', type: 'select', options: ['Regular', 'Late Entry', 'OT Entry', 'Visitor'] }
        ]
    },
    'goodsVerify': {
        title: 'Goods Verification', fields: [
            { label: 'Verification Mode', type: 'select', options: ['By ASN', 'Manual Entry'] },
            { label: 'ASN Number', type: 'select', options: ['ASN-2024-156', 'ASN-2024-155'] },
            { label: 'Vendor Name', type: 'text', placeholder: 'Auto-filled from ASN' },
            { label: 'Invoice Number', type: 'text', placeholder: 'Enter invoice number' },
            { label: 'Vehicle Number', type: 'text', placeholder: 'Enter vehicle number' },
            { label: 'Number of Packages', type: 'number', placeholder: 'Enter count' },
            { label: 'Condition', type: 'select', options: ['Good', 'Damaged', 'Partial Damage'] },
            { label: 'Security Remarks', type: 'textarea', placeholder: 'Any observations' }
        ]
    },

    // --- Visitor ---
    'visitor': {
        title: 'Check-in Visitor', fields: [
            { label: 'Visitor Name', type: 'text', placeholder: 'Enter name' },
            { label: 'Company', type: 'text', placeholder: 'Enter company' },
            { label: 'Phone', type: 'tel', placeholder: 'Enter phone' },
            { label: 'Host Employee', type: 'select', options: ['Amit Shah', 'Ravi Kumar', 'Priya Sharma'] },
            { label: 'Purpose', type: 'select', options: ['Meeting', 'Delivery', 'Interview', 'Vendor Visit', 'Other'] },
            { label: 'ID Proof Type', type: 'select', options: ['Aadhaar', 'PAN', 'Driving License', 'Passport'] },
            { label: 'ID Number', type: 'text', placeholder: 'Enter ID number' }
        ]
    }
};

// ===== Submit Success Messages =====
const submitMessages = {
    'invoice': 'Invoice created successfully!',
    'quote': 'Quote created successfully!',
    'customer': 'Customer added! GST zone configured.',
    'paymentIn': 'Payment recorded! Balance updated.',
    'poInward': 'Customer PO received & recorded!',
    'po': 'Purchase Order created with line items!',
    'asn': 'ASN created with line items!',
    'grn': 'GRN recorded successfully!',
    'itemMaster': 'Item master created!',
    'materialRequest': 'Material request submitted!',
    'goodsReceipt': 'Goods receipt recorded!',
    'payment': 'Payment recorded!',
    'vendorPayment': 'Vendor payment marked!',
    'breakdown': 'Breakdown reported!',
    'preventiveMaintenance': 'Maintenance schedule created!',
    'employee': 'Employee added successfully!',
    'incentiveConfig': 'Incentive slab configured!',
    'payrollMaster': 'Payroll configuration saved!',
    'workingHours': 'Working hours updated!',
    'productionInput': 'Production entry saved!',
    'shiftMaster': 'Shift created!',
    'scrapEntry': 'Scrap/NC entry recorded!',
    'securityAttendance': 'Attendance marked!',
    'goodsVerify': 'Goods verified at gate!',
    'visitor': 'Visitor checked in!'
};

// ===== Render Modal =====
function openModal(type) {
    const modal = document.getElementById('modalContent');
    const overlay = document.getElementById('modalOverlay');
    const m = modalDefinitions[type];
    if (!m) return;

    let content = `<div class="modal-header"><div class="modal-title">${m.title}</div><div class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></div></div><div class="modal-body">`;

    m.fields.forEach(f => {
        // Info banner
        if (f.info) {
            content += `<div class="info-banner"><i class="fas fa-info-circle"></i><p>${f.info}</p></div>`;
            return;
        }

        // Line items section
        if (f.section === 'lineItems') {
            content += `<div class="line-items-section">`;
            content += `<div class="line-items-header"><span class="line-items-title">${f.title}</span><span style="font-size:11px;color:#10b981;cursor:pointer;" onclick="showToast('Add item from list')"><i class="fas fa-plus"></i> Add</span></div>`;
            if (f.items) {
                f.items.forEach((item, i) => {
                    content += `<div class="line-item-row"><span class="item-name">${item.name}</span><span class="item-qty">${item.qty}</span><span class="item-rate">${item.amount}</span><button class="item-remove" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button></div>`;
                });
            }
            content += `<button class="add-line-item-btn" onclick="showToast('Select item from master list')"><i class="fas fa-plus"></i> Add Line Item</button>`;
            content += `</div>`;
            return;
        }

        // Regular form fields
        const reqMark = f.required ? ' <span class="required">*</span>' : '';
        const hiddenStyle = f.hidden ? ' style="display:none"' : '';
        const idAttr = f.id ? ` id="${f.id}-group"` : '';

        content += `<div class="form-group"${hiddenStyle}${idAttr}><label class="form-label">${f.label}${reqMark}</label>`;

        if (f.type === 'select') {
            const onchangeAttr = f.onchange ? ` onchange="${f.onchange}"` : '';
            const idInputAttr = f.id ? ` id="${f.id}"` : '';
            content += `<select class="form-select"${idInputAttr}${onchangeAttr}>`;
            f.options.forEach((o, i) => {
                content += `<option${i === 0 && o.startsWith('Select') ? ' disabled selected' : ''}>${o}</option>`;
            });
            content += `</select>`;
        } else if (f.type === 'textarea') {
            content += `<textarea class="form-input" rows="3" placeholder="${f.placeholder || ''}"></textarea>`;
        } else {
            content += `<input type="${f.type}" class="form-input" placeholder="${f.placeholder || ''}">`;
        }
        content += '</div>';
    });

    content += `<button class="btn btn-primary" onclick="submitForm('${type}')">${m.title}</button>`;
    content += `<div class="audit-tag" style="margin-top:12px;"><i class="fas fa-history"></i> All entries are audit-logged</div>`;
    content += `</div>`;

    modal.innerHTML = content;
    overlay.classList.add('active');
}

// ===== Close Modal =====
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// ===== Submit Form =====
function submitForm(type) {
    closeModal();
    showToast(submitMessages[type] || 'Saved successfully!');
}

// ===== Invoice Reference Type Handler =====
function handleInvoiceRefChange() {
    const sel = document.getElementById('invoiceRefType');
    const poGroup = document.getElementById('invoicePO-group');
    if (sel && poGroup) {
        poGroup.style.display = sel.value === 'PO Reference' ? 'block' : 'none';
        if (sel.value === 'PO Reference') {
            showToast('PO line items will be auto-imported');
        }
    }
}
