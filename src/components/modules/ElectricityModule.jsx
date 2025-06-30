import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import SubNavigation from '../ui/SubNavigation';
import { Zap, DollarSign, BarChart3, TrendingUp, Calendar, Filter, Search, Download, LayoutDashboard, PieChart as PieChartIcon, Users, Database, FileText } from 'lucide-react';

// Configuration
const OMR_PER_KWH = 0.025;

// App Design System Colors - matching theme consistently
const COLORS = ['#5f5168', '#A8D5E3', '#BFA181', '#0A1828', '#C3FBF4', '#002349'];

// Complete energy data from updated database
const energyData = [
    { id: 1, name: "Pumping Station 01", type: "PS", account: "R52330", readings: { "Apr-24": 1608, "May-24": 1940, "Jun-24": 1783, "Jul-24": 1874, "Aug-24": 1662, "Sep-24": 3822, "Oct-24": 6876, "Nov-24": 1629, "Dec-24": 1640, "Jan-25": 1903, "Feb-25": 2095, "Mar-25": 3032, "Apr-25": 3940, "May-25": 2982 } },
    { id: 2, name: "Pumping Station 03", type: "PS", account: "R52329", readings: { "Apr-24": 31, "May-24": 47, "Jun-24": 25, "Jul-24": 3, "Aug-24": 0, "Sep-24": 0, "Oct-24": 33, "Nov-24": 0, "Dec-24": 179, "Jan-25": 33, "Feb-25": 137, "Mar-25": 131, "Apr-25": 276.6, "May-25": 397 } },
    { id: 3, name: "Pumping Station 04", type: "PS", account: "R52327", readings: { "Apr-24": 830, "May-24": 818, "Jun-24": 720, "Jul-24": 731, "Aug-24": 857, "Sep-24": 1176, "Oct-24": 445, "Nov-24": 919, "Dec-24": 921, "Jan-25": 245, "Feb-25": 870, "Mar-25": 646, "Apr-25": 984.9, "May-25": 880.6 } },
    { id: 4, name: "Pumping Station 05", type: "PS", account: "R52325", readings: { "Apr-24": 1774, "May-24": 2216, "Jun-24": 2011, "Jul-24": 2059, "Aug-24": 2229, "Sep-24": 5217, "Oct-24": 2483, "Nov-24": 2599, "Dec-24": 1952, "Jan-25": 2069, "Feb-25": 2521, "Mar-25": 2601, "Apr-25": 3317, "May-25": 3582 } },
    { id: 5, name: "Lifting Station 02", type: "LS", account: "R52328", readings: { "Apr-24": 44, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 153, "Sep-24": 125, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0, "Apr-25": 0, "May-25": 0 } },
    { id: 6, name: "Lifting Station 03", type: "LS", account: "R52333", readings: { "Apr-24": 198, "May-24": 269, "Jun-24": 122, "Jul-24": 203, "Aug-24": 208, "Sep-24": 257, "Oct-24": 196, "Nov-24": 91, "Dec-24": 185, "Jan-25": 28, "Feb-25": 40, "Mar-25": 58, "Apr-25": 83, "May-25": 70 } },
    { id: 7, name: "Lifting Station 04", type: "LS", account: "R52324", readings: { "Apr-24": 644, "May-24": 865, "Jun-24": 791, "Jul-24": 768, "Aug-24": 747, "Sep-24": 723, "Oct-24": 628, "Nov-24": 686, "Dec-24": 631, "Jan-25": 701, "Feb-25": 638, "Mar-25": 572, "Apr-25": 750.22, "May-25": 659.78 } },
    { id: 8, name: "Lifting Station 05", type: "LS", account: "R52332", readings: { "Apr-24": 2056, "May-24": 2577, "Jun-24": 2361, "Jul-24": 3016, "Aug-24": 3684, "Sep-24": 5866, "Oct-24": 1715, "Nov-24": 2413, "Dec-24": 2643, "Jan-25": 2873, "Feb-25": 3665, "Mar-25": 3069, "Apr-25": 4201.4, "May-25": 5868.6 } },
    { id: 9, name: "Irrigation Tank 01", type: "IRR", account: "R52324 (R52326)", readings: { "Apr-24": 1543, "May-24": 2673, "Jun-24": 2763, "Jul-24": 2623, "Aug-24": 1467, "Sep-24": 1290, "Oct-24": 1244, "Nov-24": 1432, "Dec-24": 1268, "Jan-25": 1689, "Feb-25": 2214, "Mar-25": 1718, "Apr-25": 1663, "May-25": 1980 } },
    { id: 10, name: "Irrigation Tank 02", type: "IRR", account: "R52331", readings: { "Apr-24": 1272, "May-24": 2839, "Jun-24": 3118, "Jul-24": 2330, "Aug-24": 2458, "Sep-24": 1875, "Oct-24": 893, "Nov-24": 974, "Dec-24": 1026, "Jan-25": 983, "Feb-25": 1124, "Mar-25": 1110, "Apr-25": 1830, "May-25": 2282 } },
    { id: 11, name: "Irrigation Tank 03", type: "IRR", account: "R52323", readings: { "Apr-24": 894, "May-24": 866, "Jun-24": 1869, "Jul-24": 1543, "Aug-24": 1793, "Sep-24": 524, "Oct-24": 266, "Nov-24": 269, "Dec-24": 417, "Jan-25": 840, "Feb-25": 1009, "Mar-25": 845, "Apr-25": 1205, "May-25": 1305 } },
    { id: 12, name: "Irrigation Tank 04", type: "IRR", account: "R53195", readings: { "Apr-24": 880, "May-24": 827, "Jun-24": 555, "Jul-24": 443, "Aug-24": 336, "Sep-24": 195, "Oct-24": 183, "Nov-24": 212, "Dec-24": 213, "Jan-25": 40, "Feb-25": 233, "Mar-25": 235, "Apr-25": 447.2, "May-25": 1648 } },
    { id: 13, name: "Actuator DB 01 (Z8)", type: "DB", account: "R53196", readings: { "Apr-24": 39, "May-24": 49, "Jun-24": 43, "Jul-24": 43, "Aug-24": 45, "Sep-24": 43, "Oct-24": 36, "Nov-24": 34, "Dec-24": 29, "Jan-25": 7, "Feb-25": 28, "Mar-25": 24, "Apr-25": 27.1, "May-25": 22.5 } },
    { id: 14, name: "Actuator DB 02", type: "DB", account: "R51900", readings: { "Apr-24": 285, "May-24": 335, "Jun-24": 275, "Jul-24": 220, "Aug-24": 210, "Sep-24": 219, "Oct-24": 165, "Nov-24": 232, "Dec-24": 161, "Jan-25": 33, "Feb-25": 134, "Mar-25": 139, "Apr-25": 211, "May-25": 234.5 } },
    { id: 15, name: "Actuator DB 03", type: "DB", account: "R51904", readings: { "Apr-24": 188, "May-24": 226, "Jun-24": 197, "Jul-24": 203, "Aug-24": 212, "Sep-24": 203, "Oct-24": 196, "Nov-24": 220, "Dec-24": 199, "Jan-25": 56, "Feb-25": 203, "Mar-25": 196, "Apr-25": 211.6, "May-25": 188.4 } },
    { id: 16, name: "Actuator DB 04", type: "DB", account: "R51901", readings: { "Apr-24": 159, "May-24": 275, "Jun-24": 258, "Jul-24": 210, "Aug-24": 184, "Sep-24": 201, "Oct-24": 144, "Nov-24": 172, "Dec-24": 173, "Jan-25": 186, "Feb-25": 161, "Mar-25": 227, "Apr-25": 253, "May-25": 163 } },
    { id: 17, name: "Actuator DB 05", type: "DB", account: "R51907", readings: { "Apr-24": 15, "May-24": 18, "Jun-24": 15, "Jul-24": 16, "Aug-24": 16, "Sep-24": 16, "Oct-24": 15, "Nov-24": 18, "Dec-24": 16, "Jan-25": 4, "Feb-25": 18, "Mar-25": 14, "Apr-25": 17.7, "May-25": 15.3 } },
    { id: 18, name: "Actuator DB 06", type: "DB", account: "R51909", readings: { "Apr-24": 39, "May-24": 50, "Jun-24": 42, "Jul-24": 48, "Aug-24": 46, "Sep-24": 129, "Oct-24": 43, "Nov-24": 49, "Dec-24": 44, "Jan-25": 47, "Feb-25": 45, "Mar-25": 38, "Apr-25": 46.9, "May-25": 44.1 } },
    { id: 19, name: "Street Light FP 01 (Z8)", type: "Street Light", account: "R53197", readings: { "Apr-24": 2773, "May-24": 3276, "Jun-24": 3268, "Jul-24": 3040, "Aug-24": 3203, "Sep-24": 3225, "Oct-24": 3064, "Nov-24": 3593, "Dec-24": 3147, "Jan-25": 787, "Feb-25": 3228, "Mar-25": 2663, "Apr-25": 3230, "May-25": 3089 } },
    { id: 20, name: "Street Light FP 02", type: "Street Light", account: "R51906", readings: { "Apr-24": 1705, "May-24": 2076, "Jun-24": 1758, "Jul-24": 1738, "Aug-24": 1940, "Sep-24": 2006, "Oct-24": 1944, "Nov-24": 2361, "Dec-24": 2258, "Jan-25": 633, "Feb-25": 2298, "Mar-25": 1812, "Apr-25": 2153, "May-25": 1900 } },
    { id: 21, name: "Street Light FP 03", type: "Street Light", account: "R51905", readings: { "Apr-24": 1399, "May-24": 1608, "Jun-24": 1365, "Jul-24": 1380, "Aug-24": 1457, "Sep-24": 1499, "Oct-24": 1561, "Nov-24": 2060, "Dec-24": 1966, "Jan-25": 1868, "Feb-25": 1974, "Mar-25": 1562, "Apr-25": 1847, "May-25": 1637 } },
    { id: 22, name: "Street Light FP 04", type: "Street Light", account: "R51908", readings: { "Apr-24": 861, "May-24": 1045, "Jun-24": 1051, "Jul-24": 2268, "Aug-24": 2478, "Sep-24": 2513, "Oct-24": 2341, "Nov-24": 2299, "Dec-24": 1389, "Jan-25": 325, "Feb-25": 1406, "Mar-25": 1401, "Apr-25": 2412.9, "May-25": 3047.1 } },
    { id: 23, name: "Street Light FP 05", type: "Street Light", account: "R51902", readings: { "Apr-24": 532, "May-24": 587, "Jun-24": 575, "Jul-24": 770, "Aug-24": 1341, "Sep-24": 1895, "Oct-24": 1844, "Nov-24": 1477, "Dec-24": 1121, "Jan-25": 449, "Feb-25": 2070, "Mar-25": 1870, "Apr-25": 3233, "May-25": 4796 } },
    { id: 24, name: "Beachwell", type: "D_Building", account: "R51903", readings: { "Apr-24": 16908, "May-24": 46, "Jun-24": 19332, "Jul-24": 23170, "Aug-24": 42241, "Sep-24": 15223, "Oct-24": 25370, "Nov-24": 24383, "Dec-24": 37236, "Jan-25": 38168, "Feb-25": 18422, "Mar-25": 40, "Apr-25": 27749, "May-25": 23674 } },
    { id: 25, name: "Helipad", type: "D_Building", account: "R52334", readings: { "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0, "Apr-25": 0, "May-25": 0 } },
    { id: 26, name: "Central Park", type: "D_Building", account: "R54672", readings: { "Apr-24": 12208, "May-24": 21845, "Jun-24": 29438, "Jul-24": 28186, "Aug-24": 21995, "Sep-24": 20202, "Oct-24": 14900, "Nov-24": 9604, "Dec-24": 19032, "Jan-25": 22819, "Feb-25": 19974, "Mar-25": 14190, "Apr-25": 13846, "May-25": 18783 } },
    { id: 27, name: "Guard House", type: "D_Building", account: "R53651", readings: { "Apr-24": 823, "May-24": 1489, "Jun-24": 1574, "Jul-24": 1586, "Aug-24": 1325, "Sep-24": 1391, "Oct-24": 1205, "Nov-24": 1225, "Dec-24": 814, "Jan-25": 798, "Feb-25": 936, "Mar-25": 879, "Apr-25": 1467, "May-25": 1764 } },
    { id: 28, name: "Security Building", type: "D_Building", account: "R53649", readings: { "Apr-24": 3529, "May-24": 3898, "Jun-24": 4255, "Jul-24": 4359, "Aug-24": 3728, "Sep-24": 3676, "Oct-24": 3140, "Nov-24": 5702, "Dec-24": 5131, "Jan-25": 5559, "Feb-25": 5417, "Mar-25": 4504, "Apr-25": 5978, "May-25": 4964 } },
    { id: 29, name: "ROP Building", type: "D_Building", account: "R53648", readings: { "Apr-24": 2047, "May-24": 4442, "Jun-24": 3057, "Jul-24": 4321, "Aug-24": 4185, "Sep-24": 3554, "Oct-24": 3692, "Nov-24": 3581, "Dec-24": 2352, "Jan-25": 2090, "Feb-25": 2246, "Mar-25": 1939, "Apr-25": 3537, "May-25": 4503 } },
    { id: 30, name: "D Building 44", type: "D_Building", account: "R53705", readings: { "Apr-24": 463, "May-24": 2416, "Jun-24": 2036, "Jul-24": 2120, "Aug-24": 1645, "Sep-24": 1717, "Oct-24": 1643, "Nov-24": 1377, "Dec-24": 764, "Jan-25": 647, "Feb-25": 657, "Mar-25": 650, "Apr-25": 1306, "May-25": 2499 } },
    { id: 31, name: "D Building 45", type: "D_Building", account: "R53665", readings: { "Apr-24": 709, "May-24": 2944, "Jun-24": 1267, "Jul-24": 262, "Aug-24": 3212, "Sep-24": 1330, "Oct-24": 1570, "Nov-24": 1252, "Dec-24": 841, "Jan-25": 670, "Feb-25": 556, "Mar-25": 608, "Apr-25": 1069, "May-25": 1974 } },
    { id: 32, name: "D Building 46", type: "D_Building", account: "R53700", readings: { "Apr-24": 818, "May-24": 2392, "Jun-24": 1620, "Jul-24": 2216, "Aug-24": 1671, "Sep-24": 1718, "Oct-24": 1734, "Nov-24": 1577, "Dec-24": 890, "Jan-25": 724, "Feb-25": 690, "Mar-25": 752, "Apr-25": 1292, "May-25": 1969 } },
    { id: 33, name: "D Building 47", type: "D_Building", account: "R53690", readings: { "Apr-24": 918, "May-24": 2678, "Jun-24": 1446, "Jul-24": 2173, "Aug-24": 2068, "Sep-24": 2073, "Oct-24": 1651, "Nov-24": 1774, "Dec-24": 1055, "Jan-25": 887, "Feb-25": 738, "Mar-25": 792, "Apr-25": 1545, "May-25": 1395 } },
    { id: 34, name: "D Building 48", type: "D_Building", account: "R53666", readings: { "Apr-24": 725, "May-24": 1970, "Jun-24": 1415, "Jul-24": 1895, "Aug-24": 1853, "Sep-24": 1084, "Oct-24": 1127, "Nov-24": 1046, "Dec-24": 785, "Jan-25": 826, "Feb-25": 676, "Mar-25": 683, "Apr-25": 1092, "May-25": 1851 } },
    { id: 35, name: "D Building 49", type: "D_Building", account: "R53715", readings: { "Apr-24": 947, "May-24": 2912, "Jun-24": 780, "Jul-24": 1911, "Aug-24": 1714, "Sep-24": 1839, "Oct-24": 1785, "Nov-24": 1608, "Dec-24": 1068, "Jan-25": 860, "Feb-25": 837, "Mar-25": 818, "Apr-25": 984, "May-25": 1346 } },
    { id: 36, name: "D Building 50", type: "D_Building", account: "R53672", readings: { "Apr-24": 577, "May-24": 1253, "Jun-24": 849, "Jul-24": 1097, "Aug-24": 1059, "Sep-24": 1091, "Oct-24": 1107, "Nov-24": 1102, "Dec-24": 789, "Jan-25": 765, "Feb-25": 785, "Mar-25": 707, "Apr-25": 1331, "May-25": 2376 } },
    { id: 37, name: "D Building 51", type: "D_Building", account: "R53657", readings: { "Apr-24": 735, "May-24": 3030, "Jun-24": 1677, "Jul-24": 2046, "Aug-24": 2472, "Sep-24": 2285, "Oct-24": 2165, "Nov-24": 1855, "Dec-24": 710, "Jan-25": 661, "Feb-25": 682, "Mar-25": 642, "Apr-25": 904, "May-25": 2170 } },
    { id: 38, name: "D Building 52", type: "D_Building", account: "R53699", readings: { "Apr-24": 727, "May-24": 2882, "Jun-24": 2087, "Jul-24": 2897, "Aug-24": 2786, "Sep-24": 2990, "Oct-24": 2501, "Nov-24": 1986, "Dec-24": 1208, "Jan-25": 979, "Feb-25": 896, "Mar-25": 952, "Apr-25": 1651, "May-25": 2676 } },
    { id: 39, name: "D Building 53", type: "D_Building", account: "R54782", readings: { "Apr-24": 714, "May-24": 2699, "Jun-24": 1405, "Jul-24": 1845, "Aug-24": 1494, "Sep-24": 1709, "Oct-24": 1525, "Nov-24": 1764, "Dec-24": 968, "Jan-25": 693, "Feb-25": 732, "Mar-25": 760, "Apr-25": 1281, "May-25": 1674 } },
    { id: 40, name: "Village Square", type: "D_Building", account: "R56628", readings: { "Apr-24": 2550, "May-24": 2550, "Jun-24": 2550, "Jul-24": 2550, "Aug-24": 8117, "Sep-24": 9087, "Oct-24": 4038, "Nov-24": 6229, "Dec-24": 3695, "Jan-25": 3304, "Feb-25": 3335, "Mar-25": 3383, "Apr-25": 4415, "May-25": 5963 } },
    { id: 41, name: "Zone-3 landscape light 17", type: "FP-Landscape Lights Z3", account: "R54872", readings: { "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0, "Apr-25": 0, "May-25": 0 } },
    { id: 42, name: "Zone-3 landscape light 21", type: "FP-Landscape Lights Z3", account: "R54873", readings: { "Apr-24": 42, "May-24": 67, "Jun-24": 37, "Jul-24": 42, "Aug-24": 40, "Sep-24": 33, "Oct-24": 28, "Nov-24": 40, "Dec-24": 48, "Jan-25": 13, "Feb-25": 57, "Mar-25": 47, "Apr-25": 55, "May-25": 41 } },
    { id: 43, name: "Zone-3 landscape light 22", type: "FP-Landscape Lights Z3", account: "R54874", readings: { "Apr-24": 5, "May-24": 10, "Jun-24": 3, "Jul-24": 5, "Aug-24": 4, "Sep-24": 5, "Oct-24": 12, "Nov-24": 6, "Dec-24": 8, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0, "Apr-25": 0, "May-25": 0 } },
    { id: 44, name: "CIF Kitchen", type: "Retail", account: "", readings: { "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 17895, "Aug-24": 16532, "Sep-24": 18955, "Oct-24": 15071, "Nov-24": 16742, "Dec-24": 15554, "Jan-25": 16788, "Feb-25": 16154, "Mar-25": 14971, "Apr-25": 18446, "May-25": 17185 } },
    { id: 45, name: "Bank Muscat", type: "Retail", account: "", readings: { "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 3, "Aug-24": 71, "Sep-24": -2, "Oct-24": 1407, "Nov-24": 148, "Dec-24": 72, "Jan-25": 59, "Feb-25": 98, "Mar-25": 88, "Apr-25": 163, "May-25": 175 } }
];

export default function ElectricityModule() {
  // Enhanced state management
  const [selectedRowId, setSelectedRowId] = useState(energyData.find(d => d.name === "Central Park")?.id || energyData[0].id);
  const [filterMonth, setFilterMonth] = useState('All Months');
  const [filterType, setFilterType] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [comparisonItems, setComparisonItems] = useState([]);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  
  // Add sub-navigation state
  const [activeSubSection, setActiveSubSection] = useState('overview');

  // Define sub-navigation sections
  const subSections = [
    { name: 'Overview', id: 'overview', icon: LayoutDashboard, shortName: 'Home' },
    { name: 'Analytics', id: 'analytics', icon: BarChart3, shortName: 'Analytics' },
    { name: 'Consumption Analysis', id: 'consumption', icon: TrendingUp, shortName: 'Usage' },
    { name: 'Cost Analysis', id: 'cost', icon: DollarSign, shortName: 'Cost' },
    { name: 'Data Table', id: 'table', icon: Database, shortName: 'Table' },
    { name: 'Reports', id: 'reports', icon: FileText, shortName: 'Reports' }
  ];

  // Get unique types and months
  const uniqueTypes = useMemo(() => ['All', ...new Set(energyData.map(item => item.type))], []);
  const uniqueMonths = useMemo(() => {
    const allMonths = new Set();
    energyData.forEach(item => {
        Object.keys(item.readings).forEach(month => allMonths.add(month));
    });
    return ['All Months', ...Array.from(allMonths)];
  }, []);

  const getConsumption = (item, month) => {
    if (month === 'All Months') {
      return Object.values(item.readings).reduce((sum, val) => sum + (val || 0), 0);
    }
    return item.readings[month] || 0;
  };

  // Enhanced filtering and sorting logic
  const filteredAndSortedData = useMemo(() => {
    let filteredItems = energyData.filter(item => {
      const matchesType = filterType === 'All' || item.type === filterType;
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.account.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesActive = !showOnlyActive || getConsumption(item, filterMonth) > 0;
      
      return matchesType && matchesSearch && matchesActive;
    });
    
    // Sorting
    filteredItems.sort((a, b) => {
      let aValue, bValue;
      if (sortConfig.key === 'consumption' || sortConfig.key === 'cost') {
          aValue = getConsumption(a, filterMonth);
          bValue = getConsumption(b, filterMonth);
          if (sortConfig.key === 'cost') {
              aValue *= OMR_PER_KWH;
              bValue *= OMR_PER_KWH;
          }
      } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
      }

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return filteredItems;
  }, [filterType, filterMonth, sortConfig, searchTerm, showOnlyActive]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Data for charts
  const selectedRowChartData = useMemo(() => {
    const selectedItem = energyData.find(item => item.id === selectedRowId);
    if (!selectedItem) return null;
    return Object.entries(selectedItem.readings).map(([month, value]) => ({
      month,
      consumption: value || 0,
      cost: (value || 0) * OMR_PER_KWH
    }));
  }, [selectedRowId]);

  const selectedItemDetails = energyData.find(item => item.id === selectedRowId);

  // Type distribution for pie chart
  const typeDistribution = useMemo(() => {
    const distribution = {};
    filteredAndSortedData.forEach(item => {
      const consumption = getConsumption(item, filterMonth);
      distribution[item.type] = (distribution[item.type] || 0) + consumption;
    });
    
    return Object.entries(distribution).map(([type, consumption], index) => ({
      type,
      consumption,
      cost: consumption * OMR_PER_KWH,
      color: COLORS[index % COLORS.length]
    }));
  }, [filteredAndSortedData, filterMonth]);

  // Monthly trend data
  const monthlyTrendData = useMemo(() => {
    const monthlyTotals = {};
    
    uniqueMonths.slice(1).forEach(month => {
      monthlyTotals[month] = energyData.reduce((total, item) => {
        return total + (item.readings[month] || 0);
      }, 0);
    });

    return Object.entries(monthlyTotals).map(([month, consumption]) => ({
      month,
      consumption,
      cost: consumption * OMR_PER_KWH
    }));
  }, [uniqueMonths]);

  // Top consumers data
  const topConsumersData = useMemo(() => {
    // Get all data sorted by consumption for the selected month, regardless of filters
    const allDataSorted = energyData
      .map(item => {
        const consumption = getConsumption(item, filterMonth);
        return {
          name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
          fullName: item.name,
          consumption: consumption,
          cost: consumption * OMR_PER_KWH
        };
      })
      .filter(item => item.consumption > 0) // Only include active consumers
      .sort((a, b) => b.consumption - a.consumption) // Sort by consumption descending
      .slice(0, 10); // Take top 10
    
    return allDataSorted;
  }, [filterMonth]); // Remove filteredAndSortedData dependency to get true top 10

  // Summary calculations
  const totalConsumption = useMemo(() => 
    filteredAndSortedData.reduce((total, item) => total + getConsumption(item, filterMonth), 0)
  , [filteredAndSortedData, filterMonth]);
  
  const totalCost = totalConsumption * OMR_PER_KWH;
  const totalLocations = filteredAndSortedData.length;
  
  const averageConsumption = useMemo(() => {
    return totalLocations > 0 ? totalConsumption / totalLocations : 0;
  }, [totalConsumption, totalLocations]);

  const highestConsumer = useMemo(() => {
     if (filteredAndSortedData.length === 0) return { name: 'N/A', consumption: 0 };
     return filteredAndSortedData.reduce((max, item) => {
        const itemConsumption = getConsumption(item, filterMonth);
        return itemConsumption > max.consumption ? { name: item.name, consumption: itemConsumption } : max;
     }, { name: '', consumption: -1 });
  }, [filteredAndSortedData, filterMonth]);

  // Comparison functionality
  const toggleComparison = (itemId) => {
    setComparisonItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else if (prev.length < 5) {
        return [...prev, itemId];
      }
      return prev;
    });
  };

  const comparisonChartData = useMemo(() => {
    if (comparisonItems.length === 0) return [];
    
    const months = uniqueMonths.slice(1);
    return months.map(month => {
      const dataPoint = { month };
      comparisonItems.forEach(itemId => {
        const item = energyData.find(i => i.id === itemId);
        if (item) {
          dataPoint[item.name] = item.readings[month] || 0;
        }
      });
      return dataPoint;
    });
  }, [comparisonItems, uniqueMonths]);

  // Export functionality
  const exportData = () => {
    const csvData = filteredAndSortedData.map(item => ({
      Name: item.name,
      Type: item.type,
      Account: item.account,
      Consumption: getConsumption(item, filterMonth),
      Cost: getConsumption(item, filterMonth) * OMR_PER_KWH
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy_data_${filterMonth}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="font-bold text-slate-700">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value.toLocaleString()} {entry.dataKey.includes('cost') ? 'OMR' : 'kWh'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen space-y-6">
      
      {/* Enhanced Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="page-title">Electricity System Management</h1>
              <p className="page-subtitle">Advanced analytics and monitoring for energy efficiency</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={exportData}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <SubNavigation 
        sections={subSections}
        activeSection={activeSubSection}
        onSectionChange={setActiveSubSection}
      />

      {/* Conditional Content Based on Active Section */}
      {activeSubSection === 'overview' && (
        <>
          {/* Enhanced Summary Cards */}
          <div className="metrics-grid">
            <MetricCard 
              title="Total Consumption"
              value={totalConsumption.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              unit="kWh"
              subtitle="Based on selection"
              icon={BarChart3}
              iconColor="text-purple-600"
            />
            
            <MetricCard 
              title="Total Cost"
              value={totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              unit="OMR"
              subtitle="Based on selection"
              icon={DollarSign}
              iconColor="text-green-600"
            />
            
            <MetricCard 
              title="Average Consumption"
              value={averageConsumption.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              unit="kWh"
              subtitle="Per location"
              icon={BarChart3}
              iconColor="text-blue-600"
            />
            
            <MetricCard 
              title="Highest Consumer"
              value={highestConsumer.consumption.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              unit="kWh"
              subtitle={highestConsumer.name}
              icon={TrendingUp}
              iconColor="text-red-600"
            />
            
            <MetricCard 
              title="Active Locations"
              value={totalLocations.toString()}
              unit="locations"
              subtitle="Currently filtered"
              icon={Zap}
              iconColor="text-indigo-600"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Monthly Energy Consumption Trend" subtitle="Electricity usage patterns over time">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="consumption" stroke="#5f5168" strokeWidth={3} name="Consumption (kWh)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Consumption by Type" subtitle={`Energy distribution for ${filterMonth}`}>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={typeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percentage }) => `${type}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="consumption"
                  >
                    {typeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} kWh`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </>
      )}

      {activeSubSection === 'analytics' && (
        <>
          <ChartCard title="Top Energy Consumers" subtitle={`Highest consumption for ${filterMonth}`}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topConsumersData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} kWh`, 'Consumption']} />
                <Bar dataKey="consumption" fill="#5f5168" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      )}

      {activeSubSection === 'consumption' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Monthly Consumption Trend" subtitle="Track energy usage over time">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyTrendData}>
                  <defs>
                    <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5f5168" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#5f5168" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="consumption" stroke="#5f5168" fillOpacity={1} fill="url(#consumptionGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Consumption by Type Distribution" subtitle="Energy usage breakdown by category">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={typeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#5f5168" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </>
      )}

      {activeSubSection === 'cost' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Monthly Cost Analysis" subtitle="Financial impact of energy consumption">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} OMR`, 'Cost']} />
                  <Legend />
                  <Line type="monotone" dataKey="cost" stroke="#16a34a" strokeWidth={3} name="Cost (OMR)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Cost Distribution by Type" subtitle="Financial breakdown by category">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={typeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, cost }) => `${type}: ${cost.toLocaleString()} OMR`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="cost"
                  >
                    {typeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} OMR`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </>
      )}

      {(activeSubSection === 'table' || viewMode === 'table') && (
        <>
          {/* Enhanced Controls */}
          <div className="chart-card">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search locations or accounts..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                      value={filterMonth}
                      onChange={e => setFilterMonth(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2 pl-10 pr-8 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition"
                  >
                      {uniqueMonths.map(month => (
                          <option key={month} value={month}>{month}</option>
                      ))}
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                      value={filterType}
                      onChange={e => setFilterType(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2 pl-10 pr-8 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition"
                  >
                      {uniqueTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showOnlyActive}
                    onChange={e => setShowOnlyActive(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-slate-600">Show only active</span>
                </label>
              </div>
            </div>
          </div>

          <div className="chart-card">
              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead className="bg-slate-100/80 border-b border-slate-200">
                          <tr>
                              <th className="p-4 text-sm font-semibold text-slate-600">
                                {comparisonItems.length > 0 && (
                                  <span className="text-xs text-purple-600 mr-2">
                                    ({comparisonItems.length}/5)
                                  </span>
                                )}
                                Compare
                              </th>
                              <th className="p-4 text-sm font-semibold text-slate-600 cursor-pointer hover:text-purple-600" onClick={() => requestSort('name')}>
                                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                              </th>
                              <th className="p-4 text-sm font-semibold text-slate-600 cursor-pointer hover:text-purple-600" onClick={() => requestSort('type')}>
                                Type {sortConfig.key === 'type' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                              </th>
                              <th className="p-4 text-sm font-semibold text-slate-600 cursor-pointer hover:text-purple-600 text-right" onClick={() => requestSort('consumption')}>
                                Consumption (kWh) {sortConfig.key === 'consumption' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                              </th>
                              <th className="p-4 text-sm font-semibold text-slate-600 cursor-pointer hover:text-purple-600 text-right" onClick={() => requestSort('cost')}>
                                Cost (OMR) {sortConfig.key === 'cost' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                              </th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                      {filteredAndSortedData.map(item => {
                          const consumption = getConsumption(item, filterMonth);
                          const cost = consumption * OMR_PER_KWH;
                          const isSelected = selectedRowId === item.id;
                          const isCompared = comparisonItems.includes(item.id);
                          
                          return (
                              <tr
                                  key={item.id}
                                  onClick={() => setSelectedRowId(item.id)}
                                  className={`cursor-pointer transition-colors duration-200 ${
                                    isSelected ? 'bg-purple-50' : 
                                    isCompared ? 'bg-blue-50' : 
                                    'hover:bg-slate-50'
                                  }`}
                              >
                                  <td className="p-4">
                                    <input
                                      type="checkbox"
                                      checked={isCompared}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        toggleComparison(item.id);
                                      }}
                                      className="rounded text-purple-600 focus:ring-purple-500"
                                      disabled={!isCompared && comparisonItems.length >= 5}
                                    />
                                  </td>
                                  <td className="p-4 font-medium text-slate-800">
                                    <div>
                                      <div className="font-medium">{item.name}</div>
                                      <div className="text-xs text-slate-500">{item.account}</div>
                                    </div>
                                  </td>
                                  <td className="p-4 text-slate-600">
                                      <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                                          {item.type}
                                      </span>
                                  </td>
                                  <td className="p-4 text-right font-mono font-medium text-slate-800">
                                      {consumption.toLocaleString()}
                                  </td>
                                  <td className="p-4 text-right font-mono font-medium text-green-600">
                                      {cost.toFixed(2)}
                                  </td>
                              </tr>
                          );
                      })}
                      </tbody>
                  </table>
              </div>
          </div>
        </>
      )}

      {activeSubSection === 'reports' && (
        <div className="chart-card">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">Reports Section</h3>
            <p className="text-slate-500">Generate and download comprehensive electricity consumption reports</p>
            <button
              onClick={exportData}
              className="mt-4 btn btn-primary flex items-center space-x-2 mx-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

