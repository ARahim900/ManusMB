export interface ContractorData {
  id: number;
  contractor: string;
  serviceProvided: string;
  status: 'Active' | 'Expired' | 'Expiring Soon';
  contractType: string;
  startDate: string;
  endDate: string;
  monthlyAmount: number;
  yearlyAmount: number;
  note: string;
  completion?: number;
}

export const contractorData: ContractorData[] = [
  {
    id: 1,
    contractor: 'KONE Assarain LLC',
    serviceProvided: 'Lift Maintenance Services',
    status: 'Active',
    contractType: 'Contract',
    startDate: '1/1/2025',
    endDate: '12/31/2025',
    monthlyAmount: 525,
    yearlyAmount: 11550,
    note: 'Excl VAT',
    completion: 45
  },
  {
    id: 2,
    contractor: 'Oman Water Treatment Company (OWATCO)',
    serviceProvided: 'Comprehensive STP Operation and Maintenance',
    status: 'Active',
    contractType: 'Contract',
    startDate: '1/26/2024',
    endDate: '1/25/2029',
    monthlyAmount: 3103.8,
    yearlyAmount: 37245.4,
    note: 'Inc VAT - New contract due to early termination of previous Contract with Celar Company',
    completion: 78
  },
  {
    id: 3,
    contractor: 'Kalhat',
    serviceProvided: 'Facility Management (FM)',
    status: 'Active',
    contractType: 'Contract',
    startDate: '5/7/2024',
    endDate: '5/6/2030',
    monthlyAmount: 32200.8,
    yearlyAmount: 386409.718,
    note: 'Inc VAT - New contract overlapping with COMO',
    completion: 82
  },
  {
    id: 4,
    contractor: 'Future Cities S.A.O.C (Tadoom)',
    serviceProvided: 'SUPPLY AND INSTALLATION OF SMART WATER METERS, BILLING FOR WATER CONSUMPTION',
    status: 'Active',
    contractType: 'Contract',
    startDate: '9/24/2024',
    endDate: '9/23/2032',
    monthlyAmount: 2.7,
    yearlyAmount: 184.3,
    note: 'Per Meter Collection - New contract replacing OIFC',
    completion: 35
  },
  {
    id: 5,
    contractor: 'Muna Noor International LLC',
    serviceProvided: 'Pest Control Services',
    status: 'Active',
    contractType: 'Contract',
    startDate: '7/1/2024',
    endDate: '6/30/2026',
    monthlyAmount: 1400,
    yearlyAmount: 16000,
    note: 'Inc VAT',
    completion: 65
  },
  {
    id: 6,
    contractor: 'Celar Water',
    serviceProvided: 'Comprehensive STP Operation and Maintenance',
    status: 'Expired',
    contractType: 'Contract',
    startDate: '1/16/2021',
    endDate: '1/15/2025',
    monthlyAmount: 4439,
    yearlyAmount: 53268,
    note: 'Transitioned to OWATCO before contract end',
    completion: 100
  },
  {
    id: 7,
    contractor: 'Gulf Expert',
    serviceProvided: 'Chillers, BMS & Pressurisation Units',
    status: 'Active',
    contractType: 'Contract',
    startDate: '6/3/2024',
    endDate: '6/2/2025',
    monthlyAmount: 770,
    yearlyAmount: 9240,
    note: 'Inc VAT',
    completion: 88
  },
  {
    id: 8,
    contractor: 'Advanced Technology and Projects Company',
    serviceProvided: 'BMS Non-Comprehensive Annual Maintenance',
    status: 'Expired',
    contractType: 'PO',
    startDate: '3/26/2023',
    endDate: '3/25/2024',
    monthlyAmount: 316.67,
    yearlyAmount: 3800,
    note: 'Annual service',
    completion: 100
  },
  {
    id: 9,
    contractor: 'Al Naba Services LLC',
    serviceProvided: 'Garbage Removal Services',
    status: 'Expired',
    contractType: 'Contract',
    startDate: '4/2/2023',
    endDate: '4/1/2024',
    monthlyAmount: 0,
    yearlyAmount: 0,
    note: '32 OMR/Skip Trip',
    completion: 100
  },
  {
    id: 10,
    contractor: 'Bahwan Engineering Company LLC',
    serviceProvided: 'Maintenance of Fire Alarm & Fire Fighting Equipment',
    status: 'Active',
    contractType: 'Contract',
    startDate: '11/1/2024',
    endDate: '10/31/2025',
    monthlyAmount: 743.8,
    yearlyAmount: 8925,
    note: 'Inc VAT',
    completion: 55
  },
  {
    id: 11,
    contractor: 'Oman Pumps Manufacturing Co.',
    serviceProvided: 'Supply, Installation, and Commissioning of Pumps',
    status: 'Expired',
    contractType: 'Contract',
    startDate: '2/23/2020',
    endDate: '7/22/2025',
    monthlyAmount: 0,
    yearlyAmount: 0,
    note: '37,800 OMR on Delivery',
    completion: 100
  },
  {
    id: 12,
    contractor: 'Rimal Global',
    serviceProvided: 'Provision of Services',
    status: 'Expired',
    contractType: 'Contract',
    startDate: '11/22/2021',
    endDate: '11/21/2031',
    monthlyAmount: 0,
    yearlyAmount: 0,
    note: '51,633 OMR on Delivery',
    completion: 100
  },
  {
    id: 13,
    contractor: 'COMO',
    serviceProvided: 'Facility Management (FM)',
    status: 'Expired',
    contractType: 'Contract',
    startDate: '3/1/2022',
    endDate: '2/28/2025',
    monthlyAmount: 44382,
    yearlyAmount: 532584,
    note: 'Transitioned to Kalhat before contract end',
    completion: 100
  },
  {
    id: 14,
    contractor: 'Muscat Electronics LLC',
    serviceProvided: 'Daikin AC Chillers (Sale Center) Maintenance Services',
    status: 'Expired',
    contractType: 'Contract',
    startDate: '3/26/2023',
    endDate: '4/25/2024',
    monthlyAmount: 66.5,
    yearlyAmount: 798,
    note: '199.5 OMR/Service Quarter - Nearing expiration, review for renewal needed',
    completion: 100
  },
  {
    id: 15,
    contractor: 'Uni Gaz',
    serviceProvided: 'Gas Refilling for Flame Operation at Muscat Bay Main Entrance',
    status: 'Expired',
    contractType: 'PO',
    startDate: '',
    endDate: '',
    monthlyAmount: 0,
    yearlyAmount: 0,
    note: 'Purchase Order basis',
    completion: 100
  },
  {
    id: 16,
    contractor: 'Genetcoo',
    serviceProvided: 'York AC Chillers (Zone 01) Maintenance Services',
    status: 'Expired',
    contractType: 'Contract',
    startDate: '',
    endDate: '',
    monthlyAmount: 0,
    yearlyAmount: 0,
    note: 'Contract details pending',
    completion: 100
  },
  {
    id: 17,
    contractor: 'NMC',
    serviceProvided: 'Lagoon Main Two Drain Pipes Cleaning',
    status: 'Active',
    contractType: 'PO',
    startDate: '',
    endDate: '',
    monthlyAmount: 0,
    yearlyAmount: 0,
    note: 'Purchase Order basis',
    completion: 70
  }
];

export const getActiveContracts = () => contractorData.filter(c => c.status === 'Active');
export const getExpiredContracts = () => contractorData.filter(c => c.status === 'Expired');
export const getTotalMonthlyExpenditure = () => contractorData
  .filter(c => c.status === 'Active')
  .reduce((sum, c) => sum + c.monthlyAmount, 0);
export const getTotalYearlyExpenditure = () => contractorData
  .filter(c => c.status === 'Active')
  .reduce((sum, c) => sum + c.yearlyAmount, 0);