import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaComponent from "../../../components/common/MetaComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilter, 
  faSearch, 
  faBriefcase, 
  faMapMarkerAlt, 
  faClock, 
  faMoneyBill,
  faCalendar,
  faUser,
  faStar 
} from '@fortawesome/free-solid-svg-icons';

const JobListings = () => {
  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: 'مصمم واجهات مستخدم UI/UX',
      company: 'شركة التقنية المتقدمة',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '١٠٠٠٠ - ١٥٠٠٠ ريال',
      posted: 'منذ ٣ أيام',
      deadline: '١٥ أبريل ٢٠٢٤',
      description: 'نحن نبحث عن مصمم واجهات مستخدم موهوب للانضمام إلى فريقنا المتنامي. يجب أن يكون لديك خبرة في تصميم تطبيقات الجوال وواجهات الويب.',
      category: 'تصميم',
      rating: 4.9,
      reviews: 28,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'HTML/CSS', 'تصميم تفاعلي']
    },
    {
      id: 2,
      title: 'مطور واجهة أمامية React',
      company: 'تقنية الإبداع',
      location: 'جدة، المملكة العربية السعودية',
      type: 'عن بعد',
      salary: '١٥٠٠٠ - ٢٠٠٠٠ ريال',
      posted: 'منذ ٥ أيام',
      deadline: '٢٠ أبريل ٢٠٢٤',
      description: 'مطلوب مطور واجهة أمامية ذو خبرة في React.js وNext.js لتطوير تطبيقات ويب تفاعلية عالية الأداء.',
      category: 'تطوير الويب',
      rating: 4.7,
      reviews: 42,
      skills: ['React.js', 'JavaScript', 'HTML/CSS', 'Next.js', 'Redux']
    },
    {
      id: 3,
      title: 'مهندس برمجيات باك إند',
      company: 'مؤسسة التقنية الرقمية',
      location: 'الدمام، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '١٨٠٠٠ - ٢٥٠٠٠ ريال',
      posted: 'منذ يوم واحد',
      deadline: '١٠ أبريل ٢٠٢٤',
      description: 'نبحث عن مهندس برمجيات باك إند ذو خبرة للعمل على تطوير واجهات برمجة التطبيقات وقواعد البيانات وأنظمة الخلفية.',
      category: 'تطوير البرمجيات',
      rating: 4.8,
      reviews: 35,
      skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker']
    },
    {
      id: 4,
      title: 'مصمم جرافيك',
      company: 'استوديو الإبداع',
      location: 'المدينة المنورة، المملكة العربية السعودية',
      type: 'دوام جزئي',
      salary: '٨٠٠٠ - ١٢٠٠٠ ريال',
      posted: 'منذ ٧ أيام',
      deadline: '٢٥ أبريل ٢٠٢٤',
      description: 'مطلوب مصمم جرافيك مبدع لتصميم المواد التسويقية والعلامات التجارية وواجهات المستخدم.',
      category: 'تصميم',
      rating: 4.6,
      reviews: 19,
      skills: ['Photoshop', 'Illustrator', 'InDesign', 'تصميم الشعارات', 'تصميم الويب']
    },
    {
      id: 5,
      title: 'مدير مشروع تقني',
      company: 'شركة الحلول التقنية',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '٢٥٠٠٠ - ٣٥٠٠٠ ريال',
      posted: 'منذ ٤ أيام',
      deadline: '١٨ أبريل ٢٠٢٤',
      description: 'نبحث عن مدير مشروع تقني ذو خبرة لقيادة فريق التطوير وإدارة مشاريع البرمجيات من البداية إلى النهاية.',
      category: 'إدارة',
      rating: 4.9,
      reviews: 51,
      skills: ['إدارة المشاريع', 'Agile', 'Scrum', 'JIRA', 'مهارات قيادية']
    }
  ];

  // Categories for filter
  const categories = [
    { id: 1, name: 'تصميم', count: 256 },
    { id: 2, name: 'تطوير الويب', count: 621 },
    { id: 3, name: 'تطوير التطبيقات', count: 372 },
    { id: 4, name: 'تسويق رقمي', count: 145 },
    { id: 5, name: 'كتابة محتوى', count: 113 },
    { id: 6, name: 'هندسة برمجيات', count: 98 },
    { id: 7, name: 'تحليل بيانات', count: 74 },
    { id: 8, name: 'إدارة مشاريع', count: 52 }
  ];

  // Locations for filter
  const locations = [
    { id: 1, name: 'الرياض', count: 385 },
    { id: 2, name: 'جدة', count: 293 },
    { id: 3, name: 'الدمام', count: 156 },
    { id: 4, name: 'مكة', count: 98 },
    { id: 5, name: 'المدينة المنورة', count: 67 },
    { id: 6, name: 'عن بعد', count: 412 }
  ];

  // Job types for filter
  const jobTypes = [
    { id: 1, name: 'دوام كامل', count: 738 },
    { id: 2, name: 'دوام جزئي', count: 354 },
    { id: 3, name: 'عمل حر', count: 521 },
    { id: 4, name: 'عقد مؤقت', count: 269 },
    { id: 5, name: 'تدريب', count: 87 }
  ];

const metadata = {
    title: "وظائف وفرص عمل - شغلني"
};

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <MetaComponent meta={metadata} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">ابحث عن وظيفتك المثالية</h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-green-100">أكثر من 5000 وظيفة متاحة في مختلف المجالات والمدن</p>
          </div>
          
          {/* Search Bar */}
          <div className="mt-10">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-reverse md:divide-x divide-gray-200">
                <div className="px-4 py-3 flex items-center">
                  <FontAwesomeIcon icon={faSearch} className="ml-3 text-gray-400" />
                  <input type="text" placeholder="عنوان الوظيفة أو الكلمات المفتاحية" className="w-full focus:outline-none text-gray-700" />
                </div>
                <div className="px-4 py-3 flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-3 text-gray-400" />
                  <select className="w-full bg-transparent focus:outline-none text-gray-700">
                    <option value="">المدينة أو المنطقة</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.name}>{location.name}</option>
                    ))}
                  </select>
                </div>
                <div className="px-4 py-3 flex items-center">
                  <FontAwesomeIcon icon={faBriefcase} className="ml-3 text-gray-400" />
                  <select className="w-full bg-transparent focus:outline-none text-gray-700">
                    <option value="">التخصص أو المجال</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-center md:justify-end">
                <button type="button" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  بحث
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Filters */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0 lg:ml-8">
            <div className="bg-white rounded-lg shadow p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">الفئات</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      name={`category-${category.id}`}
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${category.id}`} className="mr-2 block text-sm text-gray-700">
                      {category.name} <span className="text-gray-500">({category.count})</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">المواقع</h3>
              <div className="space-y-2">
                {locations.map(location => (
                  <div key={location.id} className="flex items-center">
                    <input
                      id={`location-${location.id}`}
                      name={`location-${location.id}`}
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`location-${location.id}`} className="mr-2 block text-sm text-gray-700">
                      {location.name} <span className="text-gray-500">({location.count})</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">نوع الوظيفة</h3>
              <div className="space-y-2">
                {jobTypes.map(type => (
                  <div key={type.id} className="flex items-center">
                    <input
                      id={`type-${type.id}`}
                      name={`type-${type.id}`}
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`type-${type.id}`} className="mr-2 block text-sm text-gray-700">
                      {type.name} <span className="text-gray-500">({type.count})</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  مسح التصفية
                </button>
                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  تطبيق
                </button>
              </div>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 sm:mb-0">تم العثور على {jobs.length} وظيفة</h2>
                <div className="flex items-center">
                  <span className="ml-3 text-sm text-gray-500">ترتيب حسب:</span>
                  <select className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                    <option>الأحدث</option>
                    <option>الأقدم</option>
                    <option>الراتب: من الأعلى إلى الأدنى</option>
                    <option>الراتب: من الأدنى إلى الأعلى</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-6">
                {jobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <Link to={`/jobs/${job.id}`} className="text-xl font-bold text-green-600 hover:text-green-800">{job.title}</Link>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="ml-1 text-gray-400" />
                            {job.company}
                          </span>
                          <span className="mx-3">•</span>
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-1 text-gray-400" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center">
                        <div className="flex items-center text-yellow-400">
                          <FontAwesomeIcon icon={faStar} />
                          <span className="mr-1 text-sm text-gray-700">{job.rating}</span>
                          <span className="mr-1 text-sm text-gray-500">({job.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-600">{job.description}</p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="flex items-center ml-6">
                          <FontAwesomeIcon icon={faBriefcase} className="ml-2 text-gray-400" />
                          <span className="text-sm text-gray-700">{job.type}</span>
                        </div>
                        <div className="flex items-center ml-6">
                          <FontAwesomeIcon icon={faMoneyBill} className="ml-2 text-gray-400" />
                          <span className="text-sm text-gray-700">{job.salary}</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendar} className="ml-2 text-gray-400" />
                          <span className="text-sm text-gray-700">{job.posted}</span>
                        </div>
                      </div>
                      <Link to={`/jobs/${job.id}/apply`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        تقديم طلب
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-reverse space-x-reverse-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">السابق</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-current="page" className="z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    8
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    9
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    10
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">التالي</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
