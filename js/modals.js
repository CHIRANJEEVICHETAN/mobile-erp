/* ============================================
   Mobile ERP - Modal Definitions & Logic
   Modal open, close, submit, and form generation
   ============================================ */

// Modal Definitions
const modalDefinitions = {
    'invoice': {
        title: 'Create Invoice', fields: [
            { label: 'Customer', type: 'select', options: ['ABC Corporation', 'Tech Industries', 'Global Mfg'] },
            { label: 'Invoice Date', type: 'date' },
            { label: 'Due Date', type: 'date' },
            { label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount' },
            { label: 'Description', type: 'textarea', placeholder: 'Invoice description' }
        ]
    },
    'quote': {
        title: 'New Quote', fields: [
            { label: 'Customer', type: 'select', options: ['ABC Corporation', 'Tech Industries', 'Global Mfg'] },
            { label: 'Valid Until', type: 'date' },
            { label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount' },
            { label: 'Notes', type: 'textarea', placeholder: 'Quote notes' }
        ]
    },
    'customer': {
        title: 'Add Customer', fields: [
            { label: 'Company Name', type: 'text', placeholder: 'Enter company name' },
            { label: 'Contact Person', type: 'text', placeholder: 'Enter contact name' },
            { label: 'Phone', type: 'tel', placeholder: 'Enter phone number' },
            { label: 'Email', type: 'email', placeholder: 'Enter email' },
            { label: 'Address', type: 'textarea', placeholder: 'Enter address' }
        ]
    },
    'po': {
        title: 'Create Purchase Order', fields: [
            { label: 'Vendor', type: 'select', options: ['Steel Suppliers Ltd', 'Parts Corporation', 'Logistics Inc'] },
            { label: 'Delivery Date', type: 'date' },
            { label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount' },
            { label: 'Items', type: 'textarea', placeholder: 'List items...' }
        ]
    },
    'asn': {
        title: 'Create ASN', fields: [
            { label: 'PO Number', type: 'select', options: ['PO-2024-892', 'PO-2024-891', 'PO-2024-890'] },
            { label: 'Vehicle Number', type: 'text', placeholder: 'Enter vehicle number' },
            { label: 'Driver Name', type: 'text', placeholder: 'Enter driver name' },
            { label: 'Expected Arrival', type: 'datetime-local' }
        ]
    },
    'grn': {
        title: 'Create GRN', fields: [
            { label: 'ASN Number', type: 'select', options: ['ASN-2024-156', 'ASN-2024-155'] },
            { label: 'Received Qty', type: 'number', placeholder: 'Enter quantity' },
            { label: 'Condition', type: 'select', options: ['Good', 'Damaged', 'Partial'] },
            { label: 'Remarks', type: 'textarea', placeholder: 'Enter remarks' }
        ]
    },
    'materialRequest': {
        title: 'Material Request', fields: [
            { label: 'Department', type: 'select', options: ['Production Line A', 'Production Line B', 'Maintenance', 'Quality'] },
            { label: 'Item', type: 'text', placeholder: 'Enter item name' },
            { label: 'Quantity', type: 'number', placeholder: 'Enter quantity' },
            { label: 'Required Date', type: 'date' },
            { label: 'Reason', type: 'textarea', placeholder: 'Enter reason' }
        ]
    },
    'breakdown': {
        title: 'Report Breakdown', fields: [
            { label: 'Machine', type: 'select', options: ['CNC Machine #1', 'CNC Machine #2', 'CNC Machine #3', 'Lathe #1', 'Lathe #2'] },
            { label: 'Issue Type', type: 'select', options: ['Electrical', 'Mechanical', 'Hydraulic', 'Software', 'Other'] },
            { label: 'Description', type: 'textarea', placeholder: 'Describe the issue' },
            { label: 'Priority', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] }
        ]
    },
    'employee': {
        title: 'Add Employee', fields: [
            { label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
            { label: 'Department', type: 'select', options: ['Production', 'Maintenance', 'Quality', 'Accounts', 'HR', 'Sales'] },
            { label: 'Designation', type: 'text', placeholder: 'Enter designation' },
            { label: 'Phone', type: 'tel', placeholder: 'Enter phone number' },
            { label: 'Email', type: 'email', placeholder: 'Enter email' },
            { label: 'Joining Date', type: 'date' }
        ]
    },
    'visitor': {
        title: 'Check-in Visitor', fields: [
            { label: 'Visitor Name', type: 'text', placeholder: 'Enter name' },
            { label: 'Company', type: 'text', placeholder: 'Enter company' },
            { label: 'Phone', type: 'tel', placeholder: 'Enter phone' },
            { label: 'Host Employee', type: 'select', options: ['Amit Shah', 'Ravi Kumar', 'Priya Sharma'] },
            { label: 'Purpose', type: 'select', options: ['Meeting', 'Delivery', 'Interview', 'Vendor Visit', 'Other'] }
        ]
    },
    'payment': {
        title: 'Record Payment', fields: [
            { label: 'Vendor', type: 'select', options: ['Steel Suppliers Ltd', 'Parts Corporation'] },
            { label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount' },
            { label: 'Payment Mode', type: 'select', options: ['Bank Transfer', 'Cheque', 'Cash', 'UPI'] },
            { label: 'Reference', type: 'text', placeholder: 'Transaction reference' }
        ]
    }
};

// Submit success messages
const submitMessages = {
    'invoice': 'Invoice created successfully!',
    'quote': 'Quote created successfully!',
    'customer': 'Customer added successfully!',
    'po': 'Purchase Order created!',
    'asn': 'ASN created successfully!',
    'grn': 'GRN recorded successfully!',
    'materialRequest': 'Material request submitted!',
    'breakdown': 'Breakdown reported!',
    'employee': 'Employee added successfully!',
    'visitor': 'Visitor checked in!',
    'payment': 'Payment recorded!'
};

// Open Modal
function openModal(type) {
    const modal = document.getElementById('modalContent');
    const overlay = document.getElementById('modalOverlay');
    let content = '';

    const m = modalDefinitions[type];
    if (!m) return;

    content = `<div class="modal-header"><div class="modal-title">${m.title}</div><div class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></div></div><div class="modal-body">`;
    m.fields.forEach(f => {
        content += `<div class="form-group"><label class="form-label">${f.label}</label>`;
        if (f.type === 'select') {
            content += `<select class="form-select"><option>Select ${f.label.toLowerCase()}</option>${f.options.map(o => `<option>${o}</option>`).join('')}</select>`;
        } else if (f.type === 'textarea') {
            content += `<textarea class="form-input" rows="3" placeholder="${f.placeholder || ''}"></textarea>`;
        } else {
            content += `<input type="${f.type}" class="form-input" placeholder="${f.placeholder || ''}">`;
        }
        content += '</div>';
    });
    content += `<button class="btn btn-primary" onclick="submitForm('${type}')">${m.title}</button></div>`;

    modal.innerHTML = content;
    overlay.classList.add('active');
}

// Close Modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Submit Form
function submitForm(type) {
    closeModal();
    showToast(submitMessages[type] || 'Saved successfully!');
}
