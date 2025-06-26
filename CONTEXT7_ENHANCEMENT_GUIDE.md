# Context7 Enhancement Guide for Muscat Bay Management System

## 🚀 Overview

Context7 provides real-time, up-to-date documentation for your development stack, ensuring you're always using the latest APIs and best practices. This guide shows how to leverage Context7 for your Muscat Bay Assets & Operation Management System.

## 📋 Table of Contents

1. [Setup & Configuration](#setup--configuration)
2. [React Development Enhancements](#react-development-enhancements)
3. [Tailwind CSS Optimization](#tailwind-css-optimization)
4. [Vite Performance Improvements](#vite-performance-improvements)
5. [Recharts Advanced Patterns](#recharts-advanced-patterns)
6. [Best Practices & Tips](#best-practices--tips)

## 🔧 Setup & Configuration

### VS Code / Cursor Setup

1. **Install Context7 MCP** (already configured in `.vscode/settings.json`):
```json
{
  "mcp": {
    "servers": {
      "context7": {
        "type": "http",
        "url": "https://mcp.context7.com/mcp"
      }
    }
  }
}
```

2. **Using Context7 in your workflow**:
   - When writing code, add "use context7" to your prompts
   - Example: "Create a responsive dashboard component with Recharts, use context7"

## ⚛️ React Development Enhancements

### 1. Modern Hook Patterns

**Created custom hooks** in `/src/hooks/`:
- `useMetrics.js` - Manages metrics data with loading states
- `useChartData.js` - Transforms data for Recharts components

**Usage Example**:
```jsx
import { useMetrics } from '@hooks/useMetrics';
import electricityService from '@services/electricityDataService';

function ElectricityDashboard() {
  const { data, loading, error, refresh } = useMetrics(electricityService, {
    month: 'May-25',
    category: 'All'
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return <DashboardContent data={data} onRefresh={refresh} />;
}
```

### 2. Component Optimization

**Key improvements**:
- Use `React.memo()` for expensive components
- Implement `useMemo()` for complex calculations
- Use `useCallback()` for event handlers

**Example**:
```jsx
const MemoizedChart = React.memo(({ data }) => {
  const chartData = useMemo(() => 
    transformChartData(data), [data]
  );
  
  return <LineChartEnhanced data={chartData} />;
});
```

## 🎨 Tailwind CSS Optimization

### 1. Enhanced Configuration

**Updated `tailwind.config.js`** with:
- Muscat Bay brand colors with full scales
- Custom animations (fade-in, slide-up, scale-in)
- Utility classes (text-shadow, glass-effect, scrollbar-hide)

### 2. Usage Examples

**Brand Colors**:
```jsx
<div className="bg-primary-700 text-white">
  {/* Uses #5f5168 - Muscat Bay primary */}
</div>

<div className="bg-gradient-primary">
  {/* Uses custom gradient */}
</div>
```

**Animations**:
```jsx
<div className="animate-fade-in">
  {/* Smooth fade-in animation */}
</div>

<div className="hover:animate-scale-in">
  {/* Scale animation on hover */}
</div>
```

**Custom Utilities**:
```jsx
<div className="glass-effect p-6">
  {/* Glassmorphism effect */}
</div>

<div className="scrollbar-hide overflow-y-auto">
  {/* Hidden scrollbar */}
</div>
```

## ⚡ Vite Performance Improvements

### 1. Configuration Enhancements

**Key optimizations in `vite.config.js`**:
- Code splitting for vendors
- Path aliases for cleaner imports
- Terser minification with console removal
- CSS code splitting

### 2. Import Aliases

**Use path aliases**:
```jsx
// Before
import MetricCard from '../../../components/ui/MetricCard';

// After
import MetricCard from '@components/ui/MetricCard';
```

**Available aliases**:
- `@` - src directory
- `@components` - components directory
- `@hooks` - custom hooks
- `@services` - service files
- `@utils` - utility functions

## 📊 Recharts Advanced Patterns

### 1. Enhanced Chart Component

**Created `LineChartEnhanced.jsx`** with:
- Responsive container
- Custom tooltips
- Multiple line support
- Reference lines
- Brush for large datasets

**Usage**:
```jsx
import LineChartEnhanced from '@components/charts/LineChartEnhanced';

<LineChartEnhanced
  data={consumptionData}
  lines={[
    { dataKey: 'consumption', name: 'Consumption', color: '#5f5168' },
    { dataKey: 'cost', name: 'Cost', color: '#10b981' }
  ]}
  showBrush={data.length > 20}
  referenceLines={[
    { value: averageConsumption, label: 'Average', color: '#f59e0b' }
  ]}
  tooltipFormatter={(value, name) => 
    name === 'Cost' ? `${value} OMR` : `${value} kWh`
  }
/>
```

### 2. Chart Data Hook

**Use `useChartData` hook**:
```jsx
const chartData = useChartData(rawData, 'line', {
  xKey: 'month',
  yKeys: ['consumption', 'cost']
});
```

## 💡 Best Practices & Tips

### 1. Performance Optimization

- **Lazy Loading**: Use React.lazy() for module components
- **Memoization**: Apply useMemo() for expensive computations
- **Virtual Scrolling**: Implement for large data tables
- **Image Optimization**: Use WebP format with fallbacks

### 2. Code Organization

```
src/
├── components/
│   ├── charts/         # Reusable chart components
│   ├── ui/            # UI components
│   └── modules/       # Feature modules
├── hooks/             # Custom React hooks
├── services/          # API and data services
├── utils/             # Helper functions
└── contexts/          # React contexts
```

### 3. State Management

- Use **local state** for UI-only state
- Use **contexts** for cross-component state
- Consider **Zustand** for complex global state

### 4. Error Handling

```jsx
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error('Global error:', error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <ErrorFallback />;
  }

  return children;
};
```

### 5. Testing Strategy

- **Unit Tests**: Test utilities and hooks
- **Component Tests**: Test UI components in isolation
- **Integration Tests**: Test module workflows
- **E2E Tests**: Test critical user paths

## 🔄 Continuous Improvement with Context7

### 1. Stay Updated

When using Context7, you'll get:
- Latest React patterns and hooks
- Current Tailwind utilities
- Updated Vite configurations
- Modern Recharts examples

### 2. AI-Assisted Development

Use Context7 prompts like:
- "Optimize this component with latest React patterns, use context7"
- "Add responsive design with Tailwind best practices, use context7"
- "Improve chart performance with Recharts, use context7"

### 3. Regular Updates

- Check for library updates monthly
- Review Context7 suggestions for deprecated patterns
- Update dependencies with confidence

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Recharts Documentation](https://recharts.org)
- [Context7 MCP](https://mcp.context7.com)

## 🎯 Next Steps

1. **Implement custom hooks** in existing modules
2. **Apply Tailwind enhancements** to UI components
3. **Optimize bundle size** with Vite configurations
4. **Enhance charts** with new patterns
5. **Monitor performance** with React DevTools

Remember: Always add "use context7" to your development prompts for the latest best practices! 