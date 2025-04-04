import { dasboardNavigation } from "../../../data/dashboard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="block lg:hidden">
      <div className="relative">
        <button 
          onClick={() => setActive(!isActive)} 
          className="w-full bg-white text-gray-800 font-medium py-3 px-4 rounded shadow-sm flex items-center justify-between border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBars} className="ml-2" />
            <span>لوحة التنقل</span>
          </div>
          <div className="text-gray-500">
            <svg 
              className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} 
              width="12" 
              height="8" 
              viewBox="0 0 12 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div 
          className={`absolute right-0 w-full mt-2 bg-white rounded-md shadow-lg z-20 overflow-hidden transition-all duration-200 ${
            isActive ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="max-h-[80vh] overflow-y-auto py-2">
            <p className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">البداية</p>
            
            {dasboardNavigation.slice(0, 8).map((item, i) => (
              <Link 
                key={i} 
                to={item.path}
                onClick={() => setActive(false)}
                className={`block py-2 px-4 hover:bg-gray-50 text-sm ${
                  pathname === item.path 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <i className={`${item.icon} ml-2`}></i>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            
            <p className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">التنظيم والإدارة</p>
            
            {dasboardNavigation.slice(8, 13).map((item, i) => (
              <Link 
                key={i} 
                to={item.path}
                onClick={() => setActive(false)}
                className={`block py-2 px-4 hover:bg-gray-50 text-sm ${
                  pathname === item.path 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <i className={`${item.icon} ml-2`}></i>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            
            <p className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">الحساب</p>
            
            {dasboardNavigation.slice(13, 15).map((item, i) => (
              <Link 
                key={i} 
                to={item.path}
                onClick={() => setActive(false)}
                className={`block py-2 px-4 hover:bg-gray-50 text-sm ${
                  pathname === item.path 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <i className={`${item.icon} ml-2`}></i>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
