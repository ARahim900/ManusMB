# Muscat Bay Assets & Operation Management System

A comprehensive web application for monitoring and analyzing operational data at Muscat Bay. This modern SaaS application provides real-time insights into electricity consumption, water distribution, sewage treatment plant operations, and contractor management.

## 🏢 Overview

The Muscat Bay Assets & Operation Management System is designed to provide top management and operational teams with actionable insights through intuitive dashboards and advanced analytics. The system integrates multiple operational aspects of the Muscat Bay development into a unified platform.

## ✨ Features

### 📊 **Electricity Analysis**
- Real-time electricity consumption monitoring
- Cost analysis and projections
- Zone-wise consumption breakdown
- AI-powered consumption pattern analysis
- Interactive charts and KPI dashboards
- Monthly/yearly trend analysis

### 💧 **Water Analysis**
- Hierarchical water distribution monitoring (A1, A2, A3 levels)
- Water loss analysis and detection
- Zone-wise consumption tracking
- Quality metrics monitoring
- Supply vs. demand analytics

### 🏭 **STP Plant Operations**
- Treatment efficiency monitoring
- Daily throughput tracking
- Process flow visualization
- Performance indicators
- Tanker operations management
- Capacity utilization analysis

### 👷 **Contractor Tracker**
- Active contract monitoring
- Project completion tracking
- Budget utilization analysis
- Service provider performance metrics
- Contract renewal alerts

### 🎨 **Modern UI/UX**
- Responsive design for desktop and mobile
- Dark/light mode toggle
- Interactive data visualizations
- Collapsible sidebar navigation
- Real-time status indicators

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/muscat-bay-operations.git
   cd muscat-bay-operations
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
muscat-bay-operations/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Header.tsx       # Application header
│   │   └── charts/          # Chart components
│   ├── modules/             # Feature modules
│   │   ├── electricity/     # Electricity analysis module
│   │   ├── water/           # Water analysis module
│   │   ├── stp/             # STP plant module
│   │   └── contractors/     # Contractor tracking module
│   ├── data/                # Static data and utilities
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript type definitions
│   └── App.tsx              # Main application component
├── public/                  # Static assets
├── docs/                    # Documentation
└── README.md
```

## 📈 Data Sources

The application currently uses static data for demonstration purposes. In a production environment, these would be connected to:

- Electricity meter APIs
- Water management systems
- STP plant SCADA systems
- Contract management databases

## 🎨 Design System

### Color Palette
- **Primary**: `#5f5168` (Muscat Bay brand purple)
- **Accent**: `#A8D5E3` (Soft teal)
- **Warning**: `#BFA181` (Muted gold)
- **Success**: `#10B981` (Green)
- **Info**: `#0A1828` (Deep blue)

### Typography
- Primary font: Inter
- Headings: Bold weights (600-700)
- Body text: Regular weight (400)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=Muscat Bay Operations
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.muscatbay.com
```

### Customization

1. **Branding**: Update colors in `src/utils/constants.ts`
2. **Data Sources**: Modify data parsing functions in `src/data/`
3. **Modules**: Add new operational modules in `src/modules/`

## 📊 Key Metrics Tracked

### Electricity
- Total consumption (kWh)
- Cost analysis (OMR)
- Zone-wise distribution
- Meter performance

### Water
- Supply hierarchy (A1→A2→A3)
- Loss percentages
- Quality parameters
- Distribution efficiency

### STP Plant
- Treatment efficiency (%)
- Daily throughput (m³)
- Capacity utilization
- Process performance

### Contractors
- Active projects
- Budget utilization
- Completion rates
- Service quality

## 🤖 AI Features

The application includes AI-powered analysis capabilities:

- **Consumption Pattern Analysis**: Identifies trends and anomalies
- **Predictive Insights**: Forecasts future consumption and maintenance needs
- **Optimization Recommendations**: Suggests efficiency improvements
- **Alert Generation**: Proactive notifications for critical issues

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablet devices (iPad, Android tablets)
- Mobile phones (iOS, Android)

## 🔐 Security

- Input validation and sanitization
- Secure data handling practices
- Environment-based configuration
- HTTPS enforcement (production)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation for new features
- Maintain responsive design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: support@muscatbay.com
- **Documentation**: [docs.muscatbay.com](https://docs.muscatbay.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/muscat-bay-operations/issues)

## 🙏 Acknowledgments

- Muscat Bay Development Team
- React and TypeScript communities
- Recharts for excellent chart components
- Tailwind CSS for styling framework

---

**Built with ❤️ for Muscat Bay Operations Team
