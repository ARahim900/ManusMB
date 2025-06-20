import React from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { COLORS } from '@/utils/constants';

interface SelectOption {
  value: string;
  label: string;
}

interface StyledSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  id: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

const StyledSelect: React.FC<StyledSelectProps> = ({ 
  label, 
  value, 
  onChange, 
  options, 
  id, 
  icon: Icon, 
  disabled = false 
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="relative">
        <select 
          id={id} 
          value={value} 
          onChange={onChange} 
          disabled={disabled}
          className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed" 
          style={{ '--tw-ring-color': COLORS.primaryLight, borderColor: 'rgb(203 213 225 / 1)', ringColor: COLORS.primaryLight } as React.CSSProperties} 
        >
          {options.map(option => ( 
            <option key={option.value} value={option.value}>{option.label}</option> 
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          {Icon ? <Icon size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
    </div>
  );
};

export default StyledSelect;