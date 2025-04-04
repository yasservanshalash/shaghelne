import React from 'react';

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="dashboard__footer bg-white py-4 border-t border-gray-200" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} شغلني. جميع الحقوق محفوظة
          </p>
          <div className="text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700 mx-2">سياسة الخصوصية</a>
            <a href="#" className="hover:text-gray-700 mx-2">شروط الاستخدام</a>
            <a href="#" className="hover:text-gray-700 mx-2">اتصل بنا</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
