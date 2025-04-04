import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faBriefcase, faSearch } from '@fortawesome/free-solid-svg-icons';
import UserProfileInfo from '../common/UserProfileInfo';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-green-600 font-bold text-2xl">شغّلني</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:space-x-reverse">
              <Link to="/" className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                الرئيسية
              </Link>
              <Link to="/jobs" className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                الوظائف
              </Link>
              <Link to="/services" className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                الخدمات
              </Link>
              <Link to="/freelancers" className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                المستقلون
              </Link>
              <Link to="/about" className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                من نحن
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <span className="sr-only">البحث</span>
              <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
            </button>

            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="sr-only">فتح قائمة المستخدم</span>
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                </button>
              </div>
              {profileOpen && (
                <UserProfileInfo />
              )}
            </div>

            <div className="ml-3">
              <Link
                to="/post-service"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FontAwesomeIcon icon={faBriefcase} className="ml-2" />
                أضف خدمة
              </Link>
            </div>
          </div>
          <div className="-ml-2 ml-2 flex items-center sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="bg-white text-gray-600 hover:bg-gray-50 hover:border-green-500 hover:text-gray-900 block pl-3 pr-4 py-2 border-r-4 border-transparent text-base font-medium">
              الرئيسية
            </Link>
            <Link to="/jobs" className="bg-white text-gray-600 hover:bg-gray-50 hover:border-green-500 hover:text-gray-900 block pl-3 pr-4 py-2 border-r-4 border-transparent text-base font-medium">
              الوظائف
            </Link>
            <Link to="/services" className="bg-green-50 text-green-700 block pl-3 pr-4 py-2 border-r-4 border-green-500 text-base font-medium">
              الخدمات
            </Link>
            <Link to="/freelancers" className="bg-white text-gray-600 hover:bg-gray-50 hover:border-green-500 hover:text-gray-900 block pl-3 pr-4 py-2 border-r-4 border-transparent text-base font-medium">
              المستقلون
            </Link>
            <Link to="/about" className="bg-white text-gray-600 hover:bg-gray-50 hover:border-green-500 hover:text-gray-900 block pl-3 pr-4 py-2 border-r-4 border-transparent text-base font-medium">
              من نحن
            </Link>
            <Link to="/post-service" className="text-center block mx-4 mt-2 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              أضف خدمة
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 