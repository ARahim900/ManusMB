# 🏢 Muscat Bay Assets & Operation Management System

A comprehensive, modern web application for managing facility operations including electricity monitoring, water systems, STP plant operations, and contractor tracking.

![Muscat Bay Management System](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.5-purple)

## ✨ Features

### 🌟 Modern & Responsive Design
- **Mobile-First**: Optimized for all device types (phones, tablets, desktops)
- **Cutting-Edge UI**: Modern design with smooth animations and transitions
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Dark Mode Ready**: Consistent color scheme with CSS custom properties

### 💡 Core Modules
- **📊 Dashboard**: Real-time overview with key metrics and system alerts
- **⚡ Electricity Module**: Power consumption monitoring and billing analysis
- **💧 Water Systems**: Water usage tracking and quality monitoring
- **🏭 STP Plant**: Sewage treatment plant operations management
- **💰 Reserve Fund**: Financial contributions and budget management
- **👷 Contractor Tracker**: Contract management and performance tracking

### 🚀 Performance & Reliability
- **Lazy Loading**: Components load on demand for faster initial load
- **Error Boundaries**: Robust error handling with user-friendly error pages
- **PWA Ready**: Progressive Web App capabilities with offline support
- **SEO Optimized**: Complete meta tags, sitemap, and search engine optimization
- **Bundle Optimization**: Code splitting and vendor chunk optimization

## 🛠️ Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router DOM v6 with lazy loading
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Data Processing**: XLSX for Excel file handling
- **Build Tool**: Vite for fast development and optimized builds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/muscat-bay-management.git
   cd muscat-bay-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify

#### Option 1: Drag & Drop (Easiest)
1. Run `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder to deploy

#### Option 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 3: Git Integration
1. Push code to GitHub/GitLab
2. Connect repository to Netlify
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### Deploy Script
Use the included deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🎨 Brand Colors & Design System

The application uses the [Muscat Bay brand colors][[memory:2355816351702365284]] consistently across all components:

### Primary Colors
- **Primary**: `#5f5168` (Muted deep purple/gray)
- **Backgrounds**: Various whites (`#ffffff`, `#fffeff`, `#fffffd`, `#feffff`)
- **Teal**: `#A8D5E3`, `#C3FBF4` (Soft complementary teal)
- **Gold**: `#BFA181`, `#F2F0EA` (Warm beige/gold)
- **Navy**: `#0A1828`, `#002349` (Muted navy)

### CSS Custom Properties
The design system is implemented through CSS variables and Tailwind custom colors for consistent theming across all modules.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

### Features
- Flexible grid layouts
- Mobile-first approach
- Touch-friendly interactions
- Optimized typography scaling
- Accessible focus states

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific settings:
```env
VITE_APP_TITLE=Muscat Bay Management System
VITE_API_BASE_URL=https://api.example.com
```

### Vite Configuration
The `vite.config.js` includes:
- Code splitting optimization
- Bundle size optimization
- Development server configuration
- Build performance enhancements

## 📊 Performance Optimization

### Bundle Analysis
```bash
npm run build
npx vite-bundle-analyzer dist
```

### Key Optimizations
- **Code Splitting**: Vendor, charts, icons, and utilities separated
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser optimization with console removal
- **Lazy Loading**: Route-based component loading
- **Asset Optimization**: Image compression and format optimization

## 🧪 Testing & Quality

### Code Quality
- ESLint configuration for React best practices
- Component-based architecture
- Error boundary implementation
- Accessibility compliance

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📖 Usage Guide

### Navigation
- **Desktop**: Use the fixed sidebar for navigation
- **Mobile**: Tap the menu button to open the navigation drawer
- **Keyboard**: Use Tab and Enter for keyboard navigation

### Modules
Each module provides:
- Real-time data visualization
- Interactive charts and metrics
- Responsive data tables
- Export capabilities
- Filter and search functionality

### Dashboard
- Overview of all systems
- Real-time alerts and notifications
- Quick action buttons
- System status indicators

## 🔒 Security Features

- Content Security Policy (CSP) headers
- XSS protection
- CSRF protection headers
- Secure asset loading
- Input sanitization

## 🌐 PWA Features

- Installable web app
- Offline capability
- App-like experience
- Custom splash screen
- Theme color customization

## 📚 File Structure

```
src/
├── components/
│   ├── layout/          # Layout components
│   ├── modules/         # Feature modules
│   └── ui/             # Reusable UI components
├── services/           # Data services
├── App.jsx            # Main application component
├── App.css           # Global styles and CSS variables
└── main.jsx          # Application entry point

public/
├── site.webmanifest   # PWA manifest
├── robots.txt         # SEO robots file
└── favicon.ico       # Application icon

dist/                  # Production build output
netlify.toml          # Netlify configuration
deploy.sh             # Deployment script
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: admin@muscatbay.com
- Documentation: [Wiki](https://github.com/your-repo/muscat-bay-management/wiki)
- Issues: [GitHub Issues](https://github.com/your-repo/muscat-bay-management/issues)

## 🎯 Roadmap

- [ ] Real-time WebSocket integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API integration
- [ ] Advanced reporting features
- [ ] Multi-language support

---

Made with ❤️ for Muscat Bay Operations Management 