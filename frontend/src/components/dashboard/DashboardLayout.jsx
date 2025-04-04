import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from './header/DashboardHeader';
import DashboardSidebar from './sidebar/DashboardSidebar';
import DashboardFooter from './footer/DashboardFooter';

const DashboardLayout = ({ children }) => {
  const { sidebarOpen } = useSelector((state) => state.toggle);
  
  // Add RTL support and dashboard page class to body
  useEffect(() => {
    document.body.classList.add('dashboard-page');
    document.body.dir = 'rtl';
    
    return () => {
      document.body.classList.remove('dashboard-page');
      document.body.removeAttribute('dir');
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" dir="rtl">
      <DashboardHeader />
      
      <div className="flex flex-grow">
        <aside 
          className={`fixed right-0 top-0 pt-16 h-full bg-white shadow-md z-10 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
          } overflow-hidden`}
        >
          <DashboardSidebar />
        </aside>
        
        <main 
          className={`flex-grow p-6 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'mr-0 lg:mr-64' : 'mr-0 lg:mr-20'
          } mt-16`}
        >
          {children}
        </main>
      </div>
      
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
