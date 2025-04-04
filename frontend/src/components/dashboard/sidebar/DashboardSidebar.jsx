import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../redux/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBriefcase, 
  faProjectDiagram, 
  faCommentAlt,
  faWallet,
  faCreditCard,
  faStar,
  faUser,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

// Dashboard navigation items
const dashboardNavItems = [
  { id: 1, name: "لوحة التحكم", path: "/dashboard", icon: faHome },
  { id: 2, name: "المهام", path: "/dashboard/jobs", icon: faBriefcase },
  { id: 3, name: "المشاريع", path: "/dashboard/projects", icon: faProjectDiagram },
  { id: 4, name: "الرسائل", path: "/dashboard/messages", icon: faCommentAlt },
  { id: 5, name: "المحفظة", path: "/dashboard/wallet", icon: faWallet },
  { id: 6, name: "المدفوعات", path: "/dashboard/payments", icon: faCreditCard },
  { id: 7, name: "المراجعات", path: "/dashboard/reviews", icon: faStar },
  { id: 8, name: "الملف الشخصي", path: "/dashboard/profile", icon: faUser },
  { id: 9, name: "الإعدادات", path: "/dashboard/settings", icon: faCog },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(userActions.logout());
  };
  
  return (
    <div className="dashboard__sidebar" dir="rtl">
      <div className="dashboard_sidebar_list">
        <div className="sidebar_list_item">
          <p className="text-gray-500 text-xs uppercase font-medium py-3 px-4 text-right">القائمة الرئيسية</p>
          <ul className="list-unstyled">
            {dashboardNavItems.map((item) => (
              <li className="sidebar_item" key={item.id}>
                <Link 
                  to={item.path} 
                  className={`sidebar_link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="ml-2" /> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="sidebar_list_item">
          <p className="text-gray-500 text-xs uppercase font-medium py-3 px-4 text-right">حساب</p>
          <ul className="list-unstyled">
            <li className="sidebar_item">
              <button 
                onClick={handleLogout}
                className="sidebar_link text-red-600 hover:text-red-700 text-right w-full"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="ml-2" /> تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
