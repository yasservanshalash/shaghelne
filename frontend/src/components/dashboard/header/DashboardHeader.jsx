import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faBell, 
  faEnvelope, 
  faUser,
  faSignOutAlt,
  faCog,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../redux/slices/toggleSlice';
import { userActions } from '../../../redux/slices/userSlice';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { userData } = useSelector((state) => state.user);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <header className="dashboard__header shadow-sm bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <button 
              className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none ml-4" 
              onClick={handleToggleSidebar}
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
            <Link to="/" className="text-lg lg:text-xl font-semibold text-green-600">
              شغلني
            </Link>
          </div>

          <div className="flex items-center">
            <div className="relative hidden md:block ml-4">
              <input
                type="text"
                placeholder="بحث..."
                className="border border-gray-300 rounded-md py-2 pr-10 pl-4 w-64 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center">
              <button className="text-gray-600 hover:text-gray-900 relative ml-4">
                <FontAwesomeIcon icon={faBell} className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="text-gray-600 hover:text-gray-900 relative ml-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="relative" style={{ marginLeft: '1rem' }}>
                <button 
                  className="flex items-center text-sm focus:outline-none"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ml-2">
                    {userData?.profilePic ? (
                      <img 
                        src={userData.profilePic} 
                        alt={`${userData.firstName} ${userData.lastName}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    )}
                  </div>
                  <span className="mr-1 text-gray-700 hidden md:block">
                    {userData?.firstName} {userData?.lastName}
                  </span>
                </button>
                
                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <Link 
                        to="/dashboard/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        الملف الشخصي
                      </Link>
                      <Link 
                        to="/dashboard/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                      >
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        الإعدادات
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-right block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
