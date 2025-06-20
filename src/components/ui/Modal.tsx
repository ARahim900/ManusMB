import React from 'react';
import { X } from 'lucide-react';
import { COLORS } from '@/utils/constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"> 
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"> 
        <div className="flex justify-between items-center mb-4"> 
          <h3 className="text-xl font-semibold" style={{color: COLORS.primary}}>{title}</h3> 
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200"> 
            <X size={20} className="text-slate-600"/> 
          </button> 
        </div> 
        <div className="text-sm text-slate-700">
          {children}
        </div>
        {footer && (
          <div className="mt-6 text-right"> 
            {footer}
          </div>
        )}
      </div> 
    </div>
  );
};

export default Modal;