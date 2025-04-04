import React from 'react';
// import Breadcumb3 from "../../../components/breadcumb/Breadcumb3";
// import Breadcumb4 from "../../../components/breadcumb/Breadcumb4";
// import Listing1 from "../../../components/section/Listing1";
// import TabSection1 from "../../../components/section/TabSection1";
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
  faStar,
  faTags 
} from '@fortawesome/free-solid-svg-icons';

const ServiceListings = () => {
  // Mock services data
  const services = [
    {
      id: 1,
      title: 'تصميم هوية بصرية احترافية للشركات',
      provider: 'أحمد محمد',
      location: 'الرياض، المملكة العربية السعودية',
      rating: 4.9,
      reviews: 56,
      price: '٥٠٠ - ١٥٠٠ ريال',
      image: 'https://placehold.co/300/100',
      category: 'تصميم',
      description: 'تصميم هوية بصرية متكاملة تشمل الشعار والألوان والخطوط وكل العناصر البصرية التي تعكس قيم علامتك التجارية وتميزها عن المنافسين.',
      deliveryTime: '٥-٧ أيام',
      skills: ['تصميم شعارات', 'هوية بصرية', 'تصميم جرافيك', 'Adobe Illustrator']
    },
    {
      id: 2,
      title: 'تطوير موقع إلكتروني متجاوب',
      provider: 'سارة خالد',
      location: 'جدة، المملكة العربية السعودية',
      rating: 4.8,
      reviews: 42,
      price: '٢٠٠٠ - ٥٠٠٠ ريال',
      image: 'https://placehold.co/300/100',
      category: 'تطوير الويب',
      description: 'تصميم وتطوير موقع إلكتروني احترافي ومتجاوب مع جميع الأجهزة باستخدام أحدث التقنيات مثل React و Next.js.',
      deliveryTime: '١٠-١٤ يوم',
      skills: ['React.js', 'Next.js', 'Tailwind CSS', 'تصميم واجهات مستخدم']
    },
    {
      id: 3,
      title: 'كتابة محتوى تسويقي احترافي',
      provider: 'منى عبدالله',
      location: 'الدمام، المملكة العربية السعودية',
      rating: 4.7,
      reviews: 31,
      price: '٣٠٠ - ٨٠٠ ريال',
      image: 'https://placehold.co/300/100',
      category: 'كتابة وترجمة',
      description: 'كتابة محتوى تسويقي احترافي للمواقع الإلكترونية ومنصات التواصل الاجتماعي بأسلوب جذاب يزيد من معدلات التحويل.',
      deliveryTime: '٣-٥ أيام',
      skills: ['كتابة محتوى', 'تسويق محتوى', 'SEO', 'كتابة إبداعية']
    },
    {
      id: 4,
      title: 'تصميم وتطوير تطبيق جوال',
      provider: 'محمد علي',
      location: 'الرياض، المملكة العربية السعودية',
      rating: 4.9,
      reviews: 27,
      price: '٥٠٠٠ - ١٥٠٠٠ ريال',
      image: 'https://placehold.co/300/100',
      category: 'تطوير تطبيقات',
      description: 'تصميم وتطوير تطبيق جوال احترافي لنظامي iOS و Android باستخدام React Native مع واجهة مستخدم سلسة وتجربة مميزة.',
      deliveryTime: '٢٠-٣٠ يوم',
      skills: ['React Native', 'iOS', 'Android', 'UI/UX']
    },
    {
      id: 5,
      title: 'تحليل وتحسين محركات البحث SEO',
      provider: 'فاطمة أحمد',
      location: 'جدة، المملكة العربية السعودية',
      rating: 4.6,
      reviews: 38,
      price: '١٠٠٠ - ٣٠٠٠ ريال',
      image: 'https://placehold.co/300/100',
      category: 'تسويق رقمي',
      description: 'تحليل شامل لموقعك الإلكتروني وتحسين ترتيبه في محركات البحث من خلال استراتيجيات SEO المتقدمة والكلمات المفتاحية المستهدفة.',
      deliveryTime: '١٥-٢٠ يوم',
      skills: ['SEO', 'تحليلات الويب', 'تسويق محتوى', 'بناء روابط']
    }
  ];

  // Categories for filter
  const categories = [
    { id: 1, name: 'تصميم', count: 342 },
    { id: 2, name: 'تطوير الويب', count: 275 },
    { id: 3, name: 'تسويق رقمي', count: 194 },
    { id: 4, name: 'كتابة وترجمة', count: 152 },
    { id: 5, name: 'تطوير تطبيقات', count: 128 },
    { id: 6, name: 'تحرير فيديو', count: 97 },
    { id: 7, name: 'تصميم صوتي', count: 82 },
    { id: 8, name: 'استشارات أعمال', count: 65 }
  ];

  // Price ranges for filter
  const priceRanges = [
    { id: 1, name: 'أقل من ٥٠٠ ريال', count: 214 },
    { id: 2, name: '٥٠٠ - ١٠٠٠ ريال', count: 183 },
    { id: 3, name: '١٠٠٠ - ٣٠٠٠ ريال', count: 121 },
    { id: 4, name: '٣٠٠٠ - ٥٠٠٠ ريال', count: 87 },
    { id: 5, name: 'أكثر من ٥٠٠٠ ريال', count: 63 }
  ];

  // Delivery time options for filter
  const deliveryTimes = [
    { id: 1, name: 'خلال ٢٤ ساعة', count: 120 },
    { id: 2, name: '١-٣ أيام', count: 175 },
    { id: 3, name: '٣-٧ أيام', count: 143 },
    { id: 4, name: '١-٢ أسبوع', count: 97 },
    { id: 5, name: 'أكثر من أسبوعين', count: 54 }
  ];

const metadata = {
    title: "خدمات متنوعة من المحترفين - شغلني"
};

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <MetaComponent meta={metadata} />
      {/* <TabSection1 /> */}
      {/* <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb4 /> */}
      {/* <Listing1 /> */}
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">اكتشف الخدمات المميزة</h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-green-100">آلاف الخدمات المتنوعة من مقدمي خدمات محترفين</p>
          </div>
          
          {/* Search Bar */}
          <div className="mt-10">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-reverse md:divide-x divide-gray-200">
                <div className="px-4 py-3 flex items-center">
                  <FontAwesomeIcon icon={faSearch} className="ml-3 text-gray-400" />
                  <input type="text" placeholder="ماذا تبحث عنه؟" className="w-full focus:outline-none text-gray-700" />
                </div>
                <div className="px-4 py-3 flex items-center">
                  <FontAwesomeIcon icon={faTags} className="ml-3 text-gray-400" />
                  <select className="w-full bg-transparent focus:outline-none text-gray-700">
                    <option value="">نوع الخدمة</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="px-4 py-3 flex items-center">
                  <FontAwesomeIcon icon={faClock} className="ml-3 text-gray-400" />
                  <select className="w-full bg-transparent focus:outline-none text-gray-700">
                    <option value="">مدة التسليم</option>
                    {deliveryTimes.map(time => (
                      <option key={time.id} value={time.name}>{time.name}</option>
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
              
              <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">نطاق السعر</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <div key={range.id} className="flex items-center">
                    <input
                      id={`price-${range.id}`}
                      name={`price-${range.id}`}
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`price-${range.id}`} className="mr-2 block text-sm text-gray-700">
                      {range.name} <span className="text-gray-500">({range.count})</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">مدة التسليم</h3>
              <div className="space-y-2">
                {deliveryTimes.map(time => (
                  <div key={time.id} className="flex items-center">
                    <input
                      id={`time-${time.id}`}
                      name={`time-${time.id}`}
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`time-${time.id}`} className="mr-2 block text-sm text-gray-700">
                      {time.name} <span className="text-gray-500">({time.count})</span>
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
          
          {/* Service Listings */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 sm:mb-0">تم العثور على {services.length} خدمة</h2>
                <div className="flex items-center">
                  <span className="ml-3 text-sm text-gray-500">ترتيب حسب:</span>
                  <select className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                    <option>الأكثر شعبية</option>
                    <option>الأفضل تقييماً</option>
                    <option>السعر: من الأعلى إلى الأدنى</option>
                    <option>السعر: من الأدنى إلى الأعلى</option>
                  </select>
                </div>
              </div>
              
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {services.map(service => (
                  <div key={service.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 hover:shadow-md transition-all duration-300">
                    <div className="p-5">
                      <div className="flex items-start mb-4">
                        <img src={service.image} alt={service.provider} className="w-12 h-12 rounded-full object-cover border border-gray-200 ml-3" />
                        <div>
                          <Link to={`/services/${service.id}`} className="text-lg font-bold text-gray-900 hover:text-green-600 line-clamp-2">
                            {service.title}
                          </Link>
                          <div className="flex items-center mt-1 text-sm">
                            <FontAwesomeIcon icon={faUser} className="ml-1 text-gray-400" />
                            <span className="text-gray-600">{service.provider}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <div className="flex items-center text-yellow-400">
                              <FontAwesomeIcon icon={faStar} className="ml-1" />
                              <span className="text-gray-700">{service.rating}</span>
                              <span className="text-gray-500 mr-1">({service.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {skill}
                          </span>
                        ))}
                        {service.skills.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{service.skills.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faClock} className="ml-1 text-gray-400" />
                          <span className="text-sm text-gray-600">{service.deliveryTime}</span>
                        </div>
                        <span className="font-bold text-green-600">{service.price}</span>
                      </div>
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

export default ServiceListings;
