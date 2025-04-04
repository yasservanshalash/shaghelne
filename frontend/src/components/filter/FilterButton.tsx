import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface FilterButtonProps {
  label: string;
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  children, 
  className = '',
  isOpen,
  onToggle
}) => {
  return (
    <div className="relative">
      <button 
        className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors ${className}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <p className="text-sm font-medium">{label}</p>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} size="sm" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10 p-4 border border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterButton; 