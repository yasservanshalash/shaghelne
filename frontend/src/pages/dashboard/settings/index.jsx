import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faKey, 
  faBell, 
  faGlobe,
  faEye,
  faEyeSlash,
  faSave
} from '@fortawesome/free-solid-svg-icons';

const SettingsDashboard = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">الإعدادات</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">تخصيص إعدادات الحساب</p>
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Settings tabs */}
          <div className="w-full md:w-1/4 border-l border-gray-200">
            <nav className="space-y-1 p-4">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="ml-3 h-4 w-4" />
                معلومات الحساب
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'password'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FontAwesomeIcon icon={faKey} className="ml-3 h-4 w-4" />
                كلمة المرور
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FontAwesomeIcon icon={faBell} className="ml-3 h-4 w-4" />
                الإشعارات
              </button>
              <button
                onClick={() => setActiveTab('language')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'language'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FontAwesomeIcon icon={faGlobe} className="ml-3 h-4 w-4" />
                اللغة
              </button>
            </nav>
          </div>

          {/* Settings content area */}
          <div className="w-full md:w-3/4 p-6">
            {activeTab === 'account' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">معلومات الحساب</h3>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">الاسم الأول</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        defaultValue={userData?.firstName || ""}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">الاسم الأخير</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        defaultValue={userData?.lastName || ""}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        defaultValue={userData?.email || ""}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                      <input
                        type="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        defaultValue={userData?.phone || ""}
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FontAwesomeIcon icon={faSave} className="ml-2" />
                        حفظ التغييرات
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">تغيير كلمة المرور</h3>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">كلمة المرور الحالية</label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 left-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye} 
                            className="h-5 w-5 text-gray-400" 
                          />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 left-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye} 
                            className="h-5 w-5 text-gray-400" 
                          />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور الجديدة</label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 left-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye} 
                            className="h-5 w-5 text-gray-400" 
                          />
                        </button>
                      </div>
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FontAwesomeIcon icon={faSave} className="ml-2" />
                        تحديث كلمة المرور
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات الإشعارات</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-5 flex items-center">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="mr-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        إشعارات البريد الإلكتروني
                      </label>
                      <p className="text-gray-500">تلقي إشعارات عبر البريد الإلكتروني عند وجود تحديثات مهمة.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 flex items-center">
                      <input
                        id="sms-notifications"
                        name="sms-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="mr-3 text-sm">
                      <label htmlFor="sms-notifications" className="font-medium text-gray-700">
                        إشعارات الرسائل القصيرة (SMS)
                      </label>
                      <p className="text-gray-500">تلقي إشعارات عبر الرسائل القصيرة للتنبيهات العاجلة.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 flex items-center">
                      <input
                        id="marketing-notifications"
                        name="marketing-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="mr-3 text-sm">
                      <label htmlFor="marketing-notifications" className="font-medium text-gray-700">
                        إشعارات تسويقية
                      </label>
                      <p className="text-gray-500">تلقي عروض وتحديثات تسويقية.</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FontAwesomeIcon icon={faSave} className="ml-2" />
                      حفظ الإعدادات
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات اللغة</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">اللغة المفضلة</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="ar"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                      <option value="nl">Nederlands</option>
                    </select>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FontAwesomeIcon icon={faSave} className="ml-2" />
                      حفظ الإعدادات
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsDashboard; 