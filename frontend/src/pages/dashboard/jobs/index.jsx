import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faCalendar, 
  faMapMarkerAlt, 
  faClock, 
  faMoneyBill,
  faPlus,
  faFilter,
  faSearch,
  faListAlt,
  faTasks,
  faBriefcase,
  faCheckCircle,
  faSpinner,
  faClock as faClockSolid
} from '@fortawesome/free-solid-svg-icons';

const JobsDashboard = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock jobs data
  const availableJobs = [
    {
      id: 1,
      title: 'تصميم واجهة مستخدم لتطبيق جوال',
      company: 'شركة التقنية المتقدمة',
      location: 'الرياض',
      type: 'دوام كامل',
      salary: '١٠٠٠٠ - ١٥٠٠٠ ريال',
      date: '2024-03-28',
      hours: '40 ساعة/أسبوع',
      description: 'نبحث عن مصمم واجهات مستخدم موهوب لتصميم واجهة تطبيق جوال سهلة الاستخدام وجذابة.',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'تصميم تفاعلي'],
      responsibilities: [
        'تصميم واجهات مستخدم سهلة الاستخدام وجذابة',
        'التعاون مع المطورين لتنفيذ التصاميم',
        'إجراء اختبارات مع المستخدمين والاستجابة للتعليقات',
        'تحسين تجربة المستخدم بناءً على تحليلات الاستخدام'
      ]
    },
    {
      id: 2,
      title: 'تطوير واجهة أمامية لموقع تجارة إلكترونية',
      company: 'متجر الإلكترونيات الحديثة',
      location: 'جدة',
      type: 'عن بعد',
      salary: '١٥٠٠٠ - ٢٠٠٠٠ ريال',
      date: '2024-03-25',
      hours: '35 ساعة/أسبوع',
      description: 'نبحث عن مطور واجهة أمامية ذو خبرة لتطوير واجهة موقع تجارة إلكترونية مع التركيز على الأداء والتصميم المتجاوب.',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Redux'],
      responsibilities: [
        'تطوير واجهة أمامية متجاوبة وسريعة',
        'تنفيذ أفضل ممارسات الأداء والوصول',
        'التكامل مع واجهات برمجة التطبيقات الخلفية',
        'تحسين وتطوير الشفرة الحالية'
      ]
    }
  ];

  const myJobs = [
    {
      id: 101,
      title: 'تطوير قاعدة بيانات للنظام الداخلي',
      company: 'مؤسسة البيانات الذكية',
      location: 'الدمام',
      status: 'قيد التنفيذ',
      progress: 60,
      deadline: '2024-04-15',
      payment: '٨٠٠٠ ريال'
    },
    {
      id: 102,
      title: 'تصميم هوية بصرية لشركة ناشئة',
      company: 'استوديو الإبداع',
      location: 'الرياض',
      status: 'مكتمل',
      progress: 100,
      deadline: '2024-03-10',
      payment: '٥٠٠٠ ريال'
    }
  ];

  // Filter jobs based on search term
  const filteredJobs = availableJobs.filter(job => 
    job.title.includes(searchTerm) || 
    job.company.includes(searchTerm) ||
    job.location.includes(searchTerm)
  );

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Function to get stats from my jobs
  const getStats = () => {
    const completed = myJobs.filter(job => job.status === 'مكتمل').length;
    const inProgress = myJobs.filter(job => job.status === 'قيد التنفيذ').length;
    const pending = myJobs.filter(job => job.status === 'معلق').length;
    
    return {
      completed,
      inProgress,
      pending,
      total: myJobs.length
    };
  };

  const stats = getStats();

  return (
    <DashboardLayout>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">إدارة المهام</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">عرض وإدارة المهام الخاصة بك</p>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg stats-card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-white" />
              </div>
              <div className="mr-4">
                <div className="text-sm font-medium text-gray-500">مكتملة</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">{stats.completed}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg stats-card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
                <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 text-white" />
              </div>
              <div className="mr-4">
                <div className="text-sm font-medium text-gray-500">قيد التنفيذ</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">{stats.inProgress}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg stats-card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-2">
                <FontAwesomeIcon icon={faClockSolid} className="h-5 w-5 text-white" />
              </div>
              <div className="mr-4">
                <div className="text-sm font-medium text-gray-500">معلقة</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">{stats.pending}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg stats-card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-2">
                <FontAwesomeIcon icon={faTasks} className="h-5 w-5 text-white" />
              </div>
              <div className="mr-4">
                <div className="text-sm font-medium text-gray-500">المجموع</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">{stats.total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs tabs & search */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-4 border-b-2 font-medium text-sm ${
                activeTab === 'available'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faBriefcase} className="ml-2" />
              المهام المتاحة
            </button>
            <button
              onClick={() => setActiveTab('my-jobs')}
              className={`px-4 py-4 border-b-2 font-medium text-sm ${
                activeTab === 'my-jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faListAlt} className="ml-2" />
              مهامي
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="البحث عن مهام..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex space-x-2 space-x-reverse">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center">
                <FontAwesomeIcon icon={faFilter} className="ml-2" />
                تصفية
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="ml-2" />
                إضافة مهمة جديدة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job content based on active tab */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">{job.company}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                        عرض التفاصيل
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out">
                        تقديم طلب
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                      <div className="flex items-center text-sm font-medium text-gray-500">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-1 text-gray-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 sm:mt-0">
                        <FontAwesomeIcon icon={faBriefcase} className="ml-1 text-gray-400" />
                        {job.type}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 sm:mt-0">
                        <FontAwesomeIcon icon={faClock} className="ml-1 text-gray-400" />
                        {job.hours}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 sm:mt-0">
                        <FontAwesomeIcon icon={faMoneyBill} className="ml-1 text-gray-400" />
                        {job.salary}
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <p className="text-sm text-gray-500">{job.description}</p>
                  <div className="mt-2 flex flex-wrap">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="p-10 text-center">
                <FontAwesomeIcon icon={faBriefcase} className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد مهام متاحة</h3>
                <p className="mt-1 text-sm text-gray-500">لم يتم العثور على مهام متاحة حاليًا.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'my-jobs' && (
        <div className="space-y-4">
          {myJobs.length > 0 ? (
            myJobs.map(job => (
              <div key={job.id} className="bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">{job.company}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'مكتمل' 
                          ? 'bg-green-100 text-green-800' 
                          : job.status === 'قيد التنفيذ'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <div className="flex items-center text-sm font-medium text-gray-500">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-1 text-gray-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 sm:mt-0">
                        <FontAwesomeIcon icon={faCalendar} className="ml-1 text-gray-400" />
                        موعد التسليم: {job.deadline}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 sm:mt-0">
                        <FontAwesomeIcon icon={faMoneyBill} className="ml-1 text-gray-400" />
                        المبلغ: {job.payment}
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-500 ml-2">التقدم:</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          job.status === 'مكتمل' 
                            ? 'bg-green-600' 
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 mr-2">{job.progress}%</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="p-10 text-center">
                <FontAwesomeIcon icon={faListAlt} className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد مهام حالية</h3>
                <p className="mt-1 text-sm text-gray-500">لم تقم بالتقديم على أي مهام بعد.</p>
                <div className="mt-6">
                  <button 
                    onClick={() => setActiveTab('available')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    تصفح المهام المتاحة
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default JobsDashboard; 