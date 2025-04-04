import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet, 
  faMoneyBillTransfer, 
  faArrowUp, 
  faArrowDown,
  faDownload,
  faFilter,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

const WalletDashboard = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.user);
  const chartRef = useRef(null);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock transactions data
  const transactions = [
    {
      id: 1,
      type: 'إيداع',
      amount: 1500,
      currency: 'ريال',
      date: '2024-03-28',
      status: 'مكتمل',
      description: 'دفعة من مشروع تصميم موقع',
      color: 'green'
    },
    {
      id: 2,
      type: 'سحب',
      amount: 500,
      currency: 'ريال',
      date: '2024-03-20',
      status: 'مكتمل',
      description: 'سحب إلى حساب بنكي',
      color: 'red'
    },
    {
      id: 3,
      type: 'إيداع',
      amount: 800,
      currency: 'ريال',
      date: '2024-03-15',
      status: 'مكتمل',
      description: 'دفعة من مشروع تطوير تطبيق',
      color: 'green'
    },
    {
      id: 4,
      type: 'سحب',
      amount: 300,
      currency: 'ريال',
      date: '2024-03-10',
      status: 'قيد المعالجة',
      description: 'سحب إلى محفظة إلكترونية',
      color: 'yellow'
    },
  ];

  // Monthly income data for chart
  const monthlyIncomeData = [
    { month: 'يناير', income: 2500 },
    { month: 'فبراير', income: 3200 },
    { month: 'مارس', income: 2800 },
    { month: 'أبريل', income: 3500 },
    { month: 'مايو', income: 4200 },
    { month: 'يونيو', income: 3800 }
  ];

  // Calculate total balance and other stats
  const calculateBalance = () => {
    let balance = 0;
    let totalIncome = 0;
    let totalWithdrawals = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'إيداع') {
        balance += transaction.amount;
        totalIncome += transaction.amount;
      } else if (transaction.type === 'سحب') {
        balance -= transaction.amount;
        totalWithdrawals += transaction.amount;
      }
    });

    return { balance, totalIncome, totalWithdrawals };
  };

  const { balance, totalIncome, totalWithdrawals } = calculateBalance();

  // Draw chart using canvas
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const width = chartRef.current.width;
      const height = chartRef.current.height;
      const padding = 40;
      const chartWidth = width - (padding * 2);
      const chartHeight = height - (padding * 2);
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Background
      ctx.fillStyle = '#f9fafb';
      ctx.fillRect(0, 0, width, height);
      
      // Find max value for scaling
      const maxIncome = Math.max(...monthlyIncomeData.map(item => item.income));
      const scale = chartHeight / (maxIncome * 1.2); // Add 20% for padding
      
      // Draw axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw horizontal grid lines
      const gridLines = 5;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = '10px Arial';
      ctx.fillStyle = '#6b7280';
      
      for (let i = 0; i <= gridLines; i++) {
        const y = padding + (chartHeight * i / gridLines);
        const value = Math.round(maxIncome - ((maxIncome * i) / gridLines));
        
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.strokeStyle = '#e5e7eb';
        ctx.stroke();
        
        ctx.fillText(value, 5, y);
      }
      
      // Draw bars
      const barWidth = chartWidth / monthlyIncomeData.length / 2;
      
      monthlyIncomeData.forEach((item, index) => {
        const x = padding + (index * (chartWidth / monthlyIncomeData.length)) + (chartWidth / monthlyIncomeData.length / 4);
        const barHeight = item.income * scale;
        const y = height - padding - barHeight;
        
        // Bar
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Month label
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#6b7280';
        ctx.fillText(item.month, x + barWidth/2, height - padding + 10);
      });
      
      // Chart title
      ctx.textAlign = 'center';
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#111827';
      ctx.fillText('الدخل الشهري (آخر 6 أشهر)', width / 2, 15);
    }
  }, [chartRef]);

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">المحفظة</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">إدارة معاملاتك المالية والرصيد</p>
        </div>
      </div>

      {/* Balance and actions */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faWallet} className="ml-2 text-blue-500" />
              <span>رصيد المحفظة</span>
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{balance} <span className="text-sm font-medium">ريال</span></p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
              إيداع
            </button>
            <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <FontAwesomeIcon icon={faArrowUp} className="ml-2" />
              سحب
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FontAwesomeIcon icon={faDownload} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-4 border-b md:border-b-0 md:border-l border-gray-200">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-500">إجمالي الإيداعات</h4>
                <p className="mt-2 text-2xl font-semibold text-green-600">{totalIncome} <span className="text-sm">ريال</span></p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4 border-b md:border-b-0 md:border-l border-gray-200">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-500">إجمالي المسحوبات</h4>
                <p className="mt-2 text-2xl font-semibold text-red-600">{totalWithdrawals} <span className="text-sm">ريال</span></p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-500">الرصيد المتاح للسحب</h4>
                <p className="mt-2 text-2xl font-semibold text-blue-600">{balance} <span className="text-sm">ريال</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="ml-2 text-blue-500" />
            تحليل الدخل
          </h3>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="w-full" style={{ height: '300px' }}>
            <canvas 
              ref={chartRef} 
              width="800" 
              height="300" 
              className="w-full h-full"
            ></canvas>
          </div>
        </div>
      </div>
      
      {/* Transactions section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="ml-2 text-blue-500" />
            المعاملات الأخيرة
          </h3>
          <div className="mt-3 sm:mt-0">
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <FontAwesomeIcon icon={faFilter} className="ml-2" />
              تصفية
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوصف
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'إيداع' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <FontAwesomeIcon 
                            icon={transaction.type === 'إيداع' ? faArrowDown : faArrowUp} 
                            className={`${
                              transaction.type === 'إيداع' ? 'text-green-600' : 'text-red-600'
                            }`} 
                          />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">{transaction.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        transaction.type === 'إيداع' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'إيداع' ? '+' : '-'}{transaction.amount} {transaction.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'مكتمل' 
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'قيد المعالجة'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {transactions.length === 0 && (
            <div className="py-10 text-center">
              <FontAwesomeIcon icon={faMoneyBillTransfer} className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد معاملات</h3>
              <p className="mt-1 text-sm text-gray-500">ستظهر معاملاتك هنا عند إجراء إيداع أو سحب.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletDashboard; 