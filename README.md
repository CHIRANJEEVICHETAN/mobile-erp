# 📱 Mobile ERP - Manufacturing Management System

A comprehensive **Mobile Enterprise Resource Planning (ERP)** system designed for manufacturing businesses. Built with modern web technologies and deployed on Vercel for free hosting.

## 🚀 **Live Demo**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mobile-erp)

## ✨ **Features**

### **📊 Dashboard & Analytics**
- Real-time KPI monitoring (Sales, Inventory, Finance, Pending Tasks)
- Sales trend visualization
- Recent activities feed
- Role-based quick access modules

### **💰 Sales & Invoicing**
- Sales pipeline management
- Invoice creation with PO/General reference
- Customer ledger with outstanding tracking
- Payment collection workflows
- Customer PO inward processing

### **📦 Inventory Management**
- Real-time stock monitoring
- Material request system
- Goods receipt with ASN verification
- Low stock alerts and reporting
- Multi-warehouse support

### **🏭 Vendor Management**
- Purchase order creation and tracking
- ASN (Advance Shipping Notice) management
- Vendor performance analytics
- Item master with GST configuration
- Payment tracking

### **💳 Finance**
- Payables and receivables management
- Vendor payment processing
- Invoice payment tracking
- Financial reporting dashboard

### **🔧 Machine Maintenance**
- Preventive maintenance scheduling
- Breakdown reporting and tracking
- Spare parts inventory
- Maintenance calendar view

### **👥 HR Management**
- Employee management and attendance
- Payroll configuration with deductions
- Incentive management by performance
- Leave request processing
- Working hours configuration

### **🏭 Production**
- OEE (Overall Equipment Effectiveness) dashboard
- Shift-wise production tracking
- Scrap and non-conformance recording
- Shift management and scheduling
- Worker performance analytics

### **🛡️ Security**
- Employee attendance with face scan
- Visitor management and check-in
- Goods verification at gate
- Security reporting and approvals

### **📱 Mobile-First Design**
- iPhone-optimized interface
- Touch-friendly interactions
- Responsive design
- Offline-capable architecture

## 🛠️ **Technology Stack**

- **Frontend**: Vanilla HTML5, CSS3, ES6+ JavaScript
- **Architecture**: Modular SPA with dynamic loading
- **UI Framework**: Custom CSS with modern design system
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel (Free hosting)

## 📁 **Project Structure**

```
mobile-erp/
├── index.html              # Main application entry point
├── vercel.json             # Vercel deployment configuration (SPA routing + security)
├── package.json            # Node.js configuration and scripts
├── deploy.sh               # Automated deployment script
├── .vercelignore          # Deployment optimization (exclude dev files)
├── .gitignore             # Git ignore rules
├── css/
│   └── styles.css          # Complete styling system (1700+ lines)
├── js/
│   ├── app.js             # Core navigation and UI logic
│   ├── screenLoader.js    # Dynamic screen loading system
│   ├── modals.js          # Modal forms and interactions (25+ forms)
│   └── details.js         # Detail view handlers
├── screens/               # Modular screen components (9 screens)
│   ├── dashboard.html     # Main dashboard with KPIs
│   ├── sales.html         # Sales pipeline & invoicing
│   ├── inventory.html     # Stock management & receipts
│   ├── vendor.html        # PO management & ASN tracking
│   ├── finance.html       # Payables & receivables
│   ├── maintenance.html   # Equipment maintenance
│   ├── hr.html           # Employee management
│   ├── production.html   # OEE dashboard & tracking
│   ├── security.html     # Attendance & visitor control
│   └── visitor.html      # Visitor management system
└── README.md             # This documentation
```

## 🚀 **Quick Deploy to Vercel**

### **Method 1: One-Click Deploy**
1. Click the **"Deploy with Vercel"** button above
2. Connect your GitHub account
3. Vercel will automatically build and deploy your app
4. Get your live URL instantly!

### **Method 2: Manual Deploy**

#### **Prerequisites**
- Node.js and npm installed
- Vercel account (free)

#### **Step-by-Step Deployment**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy your project**
   ```bash
   # Navigate to your project directory
   cd mobile-erp

   # Deploy to Vercel
   vercel

   # For production deployment
   vercel --prod
   ```

4. **Alternative: Use the deployment script**
   ```bash
   # Make script executable and run
   chmod +x deploy.sh
   ./deploy.sh
   ```

### **Method 3: GitHub Integration**

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings

2. **Automatic Deployments**
   - Every push to main/master triggers deployment
   - Preview deployments for pull requests
   - Instant rollbacks if needed

## 🔧 **Local Development**

### **Run Locally**
```bash
# Method 1: Python (if installed)
python3 -m http.server 8000

# Method 2: Node.js
npx http-server -p 8000

# Method 3: PHP
php -S localhost:8000
```

### **Access the App**
- Open `http://localhost:8000` in your browser
- The app simulates a mobile phone interface
- All features work offline after initial load

## 📋 **Testing Checklist**

See [`change-checklist.md`](change-checklist.md) for comprehensive testing scenarios covering all implemented features.

## 🎯 **Key Benefits**

- **🚀 Free Hosting**: Deploy on Vercel with zero cost
- **📱 Mobile-First**: Optimized for smartphones and tablets
- **⚡ Fast Loading**: Dynamic screen loading with caching
- **🔧 Modular**: Easy to maintain and extend
- **💼 Business Ready**: Complete ERP functionality
- **🔒 Secure**: Modern security headers and practices

## 📞 **Usage**

1. **Dashboard**: Overview of business metrics and quick actions
2. **Navigation**: Use bottom tabs or slide-out menu
3. **Modules**: Access specific business functions
4. **Forms**: Create invoices, POs, maintenance requests, etc.
5. **Reports**: View analytics and performance data

## 🐛 **Troubleshooting**

### **Vercel Configuration Error**
```
If `rewrites`, `redirects`, `headers`, `cleanUrls` or `trailingSlash` are used, then `routes` cannot be present.
```

**✅ Solution Applied:**
- Changed `routes` to `rewrites` in `vercel.json`
- Enables SPA routing for dynamic screen loading
- Security headers properly configured

### **Common Issues**
- **404 on refresh**: Fixed with `rewrites` configuration
- **Slow loading**: Optimized with `.vercelignore` and CDN
- **CORS issues**: Static site - no backend required

### **Need Help?**
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Status Check**: `vercel --debug`
- **Logs**: Check Vercel dashboard

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for manufacturing businesses worldwide**
