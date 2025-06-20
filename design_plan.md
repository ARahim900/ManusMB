# Muscat Bay Assets & Operation Management System - Design Plan

## Project Overview
Based on the provided instructions and data analysis, I will create a comprehensive React-based SaaS web application for Muscat Bay's infrastructure and operations management. The application will feature five main modules with consistent design patterns and real-time data visualization.

## Data Analysis Summary

### 1. Electricity Database (56 entries)
- **Structure**: Name, Type, Meter Account No., Monthly consumption data (Apr-24 to May-25)
- **Key Insights**: Contains pumping stations, lifting stations, and various building types
- **Visualization Needs**: Time-series charts, category breakdowns, performance rankings

### 2. Water System Database (328 entries)
- **Structure**: Meter Label, Account #, Zone, Type, Parent Meter, Label, Monthly data (Jan-24 to May-25)
- **Key Insights**: Hierarchical water distribution system with L1, L2, L3 levels
- **Visualization Needs**: Loss calculations, flow analysis, zone-based filtering

### 3. STP Plant Database (349 entries)
- **Structure**: Daily operational data including treated water, TSE output, inlet sewage, tanker data, maintenance actions
- **Key Insights**: Daily operational metrics with maintenance tracking
- **Visualization Needs**: Real-time monitoring, trend analysis, compliance tracking

### 4. Reserve Fund Calculations (270 entries)
- **Structure**: Unit details, sector, type, BUA, contribution calculations
- **Key Insights**: Financial planning with zone and master contributions
- **Visualization Needs**: Fund allocation, contribution tracking, forecasting

### 5. Contractor Tracker (17 entries)
- **Structure**: Contractor details, services, status, contract terms, costs
- **Key Insights**: Active contract management with performance tracking
- **Visualization Needs**: Contract status, performance ratings, value analysis

## Application Architecture

### Technology Stack
- **Frontend**: React 18+ with TypeScript 5.0+
- **Build Tool**: Vite 5.0+ with SWC
- **Styling**: Tailwind CSS 3.4+ with custom design system
- **State Management**: Zustand 4.0+
- **Charts**: Recharts 2.8+
- **Icons**: Lucide React 0.400+
- **Routing**: React Router v6+
- **Data Fetching**: TanStack Query v5+
- **Forms**: React Hook Form 7.0+ with Zod validation

### Project Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Chart/
│   │   └── Table/
│   ├── layout/                # Layout components
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   └── Navigation/
│   ├── modules/               # Module-specific components
│   │   ├── electricity/
│   │   ├── water/
│   │   ├── stp/
│   │   ├── contractor/
│   │   └── reserve-fund/
│   └── common/                # Shared components
├── hooks/                     # Custom React hooks
├── lib/                       # Utility libraries
├── stores/                    # State management
├── types/                     # TypeScript definitions
├── styles/                    # Global styles and themes
├── data/                      # Mock data and constants
├── utils/                     # Helper functions
└── tests/                     # Test files
```

## Design System

### Color Palette
```css
:root {
  /* Sidebar & Global Colors */
  --sidebar-bg: #2d2438;
  --sidebar-text: #ffffff;
  --sidebar-text-muted: #a8a3b8;
  --sidebar-hover: #3a2f47;
  --sidebar-active: #5f5168;

  /* Global App Colors */
  --app-background: #f8fafc;
  --header-bg: #ffffff;
  --content-bg: #ffffff;
  --border-color: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;

  /* Module-Specific Themes */
  --electricity-primary: #5f5168;
  --water-primary: #3b82f6;
  --stp-primary: #10b981;
  --reserve-primary: #06b6d4;
  --contractor-primary: #f59e0b;

  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
}
```

### Layout Structure
```jsx
<AppLayout>
  <Sidebar>
    <Logo />
    <Navigation>
      <NavItem icon="⚡" label="Electricity System" />
      <NavItem icon="💧" label="Water Analysis" />
      <NavItem icon="🏭" label="STP Plant" />
      <NavItem icon="💰" label="Reserve Fund" />
      <NavItem icon="👷" label="Contractor Tracker" />
    </Navigation>
  </Sidebar>
  <MainContent>
    <TopHeader>
      <BreadcrumbNavigation />
      <SearchBar />
      <NotificationBell />
      <UserAvatar />
    </TopHeader>
    <ContentArea>
      <ModuleDashboard />
    </ContentArea>
  </MainContent>
</AppLayout>
```

## Module Design Specifications

### 1. Electricity Analysis Module
**Primary Features:**
- Multi-level filtering (Month, Category, Asset Type, Zone)
- Key metrics cards (Total Consumption, Est. Cost, Avg. Consumption, Active Meters)
- Time-series consumption trend chart (14 months)
- Category breakdown donut chart
- Top consumers ranking table
- Category performance grid

**Data Integration:**
- Transform Excel data into time-series format
- Calculate totals, averages, and performance metrics
- Implement real-time filtering and sorting

### 2. Water Analysis Module
**Primary Features:**
- Month selection with AI Analysis button
- Water flow metrics (A1, A2, A3 levels)
- Loss calculation metrics with alert indicators
- Loss trend analysis charts
- Water flow by level stacked bar charts
- Zone-based analysis

**Data Integration:**
- Calculate A1-A2, A2-A3 losses automatically
- Implement hierarchical water system visualization
- Alert system for critical loss percentages

### 3. STP Plant Monitoring Module
**Primary Features:**
- Real-time operational metrics
- Equipment status indicators
- Influent vs. Effluent quality charts
- Parameter trend monitoring (pH, DO, Temperature)
- Maintenance action tracking
- Compliance reporting

**Data Integration:**
- Daily operational data visualization
- Real-time status monitoring
- Historical trend analysis

### 4. Reserve Fund Management Module
**Primary Features:**
- Current balance and contribution tracking
- Fund allocation by asset category
- Balance trend over time
- Projected vs. actual expenditures
- Scenario planning tools

**Data Integration:**
- Financial calculations and projections
- Contribution tracking by unit type
- Investment performance monitoring

### 5. Contractor Tracker Module
**Primary Features:**
- Active contract overview
- Performance rating system
- Contract value analysis
- Compliance tracking
- Document management

**Data Integration:**
- Contract status monitoring
- Performance metrics calculation
- Automated alert system

## Responsive Design Strategy

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1280px
- Large Desktop: > 1280px

### Grid Systems
```scss
.metrics-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.charts-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1.5fr 1fr;
  }
}
```

## Component Specifications

### Core UI Components

#### MetricCard
```jsx
interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}
```

#### ChartCard
```jsx
interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
```

#### DataTable
```jsx
interface DataTableProps {
  title: string;
  subtitle?: string;
  columns: Column[];
  data: any[];
  pagination?: boolean;
  sortable?: boolean;
  filterable?: boolean;
}
```

### Chart Components
- LineChart (consumption trends)
- DonutChart (category breakdowns)
- StackedBarChart (water flow levels)
- AreaChart (fund balance over time)
- HorizontalBarChart (performance ratings)
- MultiLineChart (parameter trends)

## Data Processing Strategy

### Data Transformation
1. **Excel to JSON**: Convert all Excel files to structured JSON format
2. **Time Series**: Transform monthly data into time-series arrays
3. **Calculations**: Implement derived metrics (totals, averages, losses)
4. **Filtering**: Create indexed data structures for fast filtering

### State Management
```typescript
interface AppState {
  electricity: ElectricityState;
  water: WaterState;
  stp: STPState;
  reserveFund: ReserveFundState;
  contractor: ContractorState;
  ui: UIState;
}
```

### API Integration
- Mock API endpoints for each module
- Real-time data simulation
- Error handling and loading states
- Caching with TanStack Query

## Performance Optimization

### Code Splitting
```jsx
const ElectricityModule = lazy(() => import('./modules/electricity'));
const WaterModule = lazy(() => import('./modules/water'));
const STPModule = lazy(() => import('./modules/stp'));
const ReserveFundModule = lazy(() => import('./modules/reserve-fund'));
const ContractorModule = lazy(() => import('./modules/contractor'));
```

### Virtual Scrolling
- Implement for large data tables (>100 rows)
- Use @tanstack/react-virtual

### Bundle Optimization
- Tree shaking for unused code
- Dynamic imports for heavy libraries
- Image optimization and lazy loading

## Accessibility Features

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

### Implementation
```jsx
// Example accessible button
<button
  aria-label="Filter by month"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  className="filter-button"
>
  {selectedMonth}
</button>
```

## Testing Strategy

### Unit Tests
- Component rendering
- Data transformation functions
- Utility functions
- Custom hooks

### Integration Tests
- Module interactions
- Data flow between components
- API integration
- State management

### E2E Tests
- User workflows
- Cross-module navigation
- Data filtering and sorting
- Responsive behavior

## Deployment Strategy

### Build Process
1. TypeScript compilation
2. Bundle optimization
3. Asset optimization
4. PWA manifest generation

### Hosting Options
- **Vercel**: Recommended for React apps
- **Netlify**: Alternative with good CI/CD
- **AWS Amplify**: Enterprise option

### CI/CD Pipeline
```yaml
# Example GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: vercel/action@v1
```

## Security Considerations

### Data Protection
- Input sanitization
- XSS prevention
- CSRF protection
- Secure API endpoints

### Authentication
- JWT token management
- Role-based access control
- Session management
- Password security

This comprehensive design plan provides the foundation for building a modern, scalable, and user-friendly asset management system for Muscat Bay. The next phase will involve implementing this design using the specified technology stack.

