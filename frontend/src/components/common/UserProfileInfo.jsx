import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const UserProfileInfo = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual auth logic when available

  const handleLogout = () => {
    // Replace with actual logout logic
    navigate('/login');
  };

  return (
    <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
      {isLoggedIn ? (
        <>
          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
            <div className="font-medium text-gray-900">أحمد محمد</div>
            <div className="text-gray-500">ahmed@example.com</div>
          </div>
          <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <FontAwesomeIcon icon={faClipboardList} className="ml-2" />
            لوحة التحكم
          </Link>
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <FontAwesomeIcon icon={faUser} className="ml-2" />
            الملف الشخصي
          </Link>
          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <FontAwesomeIcon icon={faCog} className="ml-2" />
            الإعدادات
          </Link>
          <button
            className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="ml-2" />
            تسجيل الخروج
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            تسجيل الدخول
          </Link>
          <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            إنشاء حساب جديد
          </Link>
        </>
      )}
    </div>
  );
};

export default UserProfileInfo; 