import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MetaComponent from "../../../components/common/MetaComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faBriefcase, 
  faClock, 
  faMoneyBill, 
  faCalendar, 
  faBuilding,
  faUser,
  faCheckCircle,
  faGraduationCap,
  faLanguage
} from '@fortawesome/free-solid-svg-icons';

const JobSingle = () => {
  const { id } = useParams();
  
  // Mock job data (in a real app, this would be fetched based on the ID)
  const job = {
    id: 1,
    title: 'مصمم واجهات مستخدم UI/UX',
    company: 'شركة التقنية المتقدمة',
    logo: 'https://placehold.co/300/100',
    location: 'الرياض، المملكة العربية السعودية',
    type: 'دوام كامل',
    salary: '١٠٠٠٠ - ١٥٠٠٠ ريال',
    posted: 'منذ ٣ أيام',
    deadline: '١٥ أبريل ٢٠٢٤',
    experience: '٣-٥ سنوات',
    qualification: 'بكالوريوس في التصميم أو ما يعادله',
    description: 'نحن نبحث عن مصمم واجهات مستخدم موهوب للانضمام إلى فريقنا المتنامي. المرشح المثالي لديه شغف بتصميم واجهات مستخدم استثنائية ويتمتع بمهارات قوية في تصميم الويب وتطبيقات الجوال.',
    about: 'شركة التقنية المتقدمة هي شركة تقنية رائدة متخصصة في تطوير البرمجيات وحلول الويب والجوال. تأسست الشركة في عام ٢٠١٠ وتضم حاليًا أكثر من ١٠٠ موظف في مكاتبنا في الرياض وجدة ودبي.',
    requirements: [
      'خبرة ٣-٥ سنوات في تصميم واجهات المستخدم للويب وتطبيقات الجوال',
      'إتقان برامج التصميم مثل Figma وAdobe XD وSketch',
      'فهم عميق لمبادئ تجربة المستخدم وتصميم واجهة المستخدم',
      'القدرة على إنشاء واجهات مستخدم جذابة وسهلة الاستخدام',
      'خبرة في تصميم النماذج الأولية التفاعلية',
      'معرفة بأساسيات HTML وCSS',
      'مهارات تواصل ممتازة وقدرة على العمل ضمن فريق'
    ],
    responsibilities: [
      'تصميم واجهات مستخدم جذابة وسهلة الاستخدام لمنتجاتنا الرقمية',
      'التعاون مع مطوري الواجهات الأمامية لتنفيذ التصاميم',
      'إنشاء نماذج أولية تفاعلية لاختبار أفكار التصميم',
      'إجراء أبحاث المستخدم وتحليل البيانات لتحسين تجربة المستخدم',
      'المساهمة في تطوير نظام التصميم الخاص بالشركة',
      'البقاء على اطلاع بأحدث اتجاهات التصميم وأفضل الممارسات'
    ],
    benefits: [
      'راتب تنافسي',
      'تأمين صحي شامل',
      'بدل سكن ومواصلات',
      'فرص تدريب وتطوير مهني',
      'بيئة عمل حديثة وإبداعية',
      'إجازة سنوية ٣٠ يوم مدفوعة',
      'مكافآت سنوية'
    ],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'UI/UX Design', 'HTML/CSS', 'Wireframing', 'Prototyping', 'تصميم المواقع الإلكترونية'],
    languages: [
      { name: 'العربية', level: 'ممتاز' },
      { name: 'الإنجليزية', level: 'جيد جدًا' }
    ],
    category: 'تصميم'
  };
  
  // Similar jobs
  const similarJobs = [
    {
      id: 2,
      title: 'مصمم جرافيك',
      company: 'استوديو الإبداع',
      location: 'جدة، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '٨٠٠٠ - ١٢٠٠٠ ريال',
      posted: 'منذ ٥ أيام'
    },
    {
      id: 3,
      title: 'مصمم UX/UI لتطبيقات الجوال',
      company: 'تقنية المستقبل',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'عن بعد',
      salary: '١٢٠٠٠ - ١٦٠٠٠ ريال',
      posted: 'منذ يومين'
    },
    {
      id: 4,
      title: 'رئيس قسم التصميم',
      company: 'مجموعة الاتصالات السعودية',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '٢٠٠٠٠ - ٢٥٠٠٠ ريال',
      posted: 'منذ ٧ أيام'
    }
  ];

const metadata = {
    title: `${job.title} - ${job.company} | شغلني`
};

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <MetaComponent meta={metadata} />
      
      {/* Job Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:ml-4">
              <img className="h-20 w-20 rounded-md object-cover border border-gray-200" src={job.logo} alt={job.company} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600">
                <div className="flex items-center ml-6 mb-2 md:mb-0">
                  <FontAwesomeIcon icon={faBuilding} className="ml-1 text-gray-400" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center ml-6 mb-2 md:mb-0">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-1 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center ml-6 mb-2 md:mb-0">
                  <FontAwesomeIcon icon={faBriefcase} className="ml-1 text-gray-400" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center ml-6 mb-2 md:mb-0">
                  <FontAwesomeIcon icon={faMoneyBill} className="ml-1 text-gray-400" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center mb-2 md:mb-0">
                  <FontAwesomeIcon icon={faCalendar} className="ml-1 text-gray-400" />
                  <span>تاريخ النشر: {job.posted}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:mr-auto">
              <Link 
                to={`/jobs/${job.id}/apply`} 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                تقديم طلب
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Job Details */}
          <div className="w-full lg:w-2/3 lg:ml-8">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">تفاصيل الوظيفة</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">متطلبات الوظيفة</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index} className="pr-2">{req}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">المسؤوليات</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="pr-2">{resp}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">المزايا والفوائد</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="pr-2">{benefit}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">المهارات</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {skill}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">اللغات المطلوبة</h3>
              <div className="space-y-2 mb-6">
                {job.languages.map((lang, index) => (
                  <div key={index} className="flex items-center">
                    <FontAwesomeIcon icon={faLanguage} className="ml-2 text-gray-500" />
                    <span className="text-gray-700">{lang.name}: </span>
                    <span className="text-gray-600 mr-1">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">عن الشركة</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{job.about}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">وظائف مشابهة</h2>
              <div className="space-y-4">
                {similarJobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors duration-300">
                    <Link to={`/jobs/${job.id}`} className="block">
                      <h3 className="text-lg font-semibold text-green-600 hover:text-green-800">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap text-sm text-gray-600">
                        <div className="flex items-center ml-4 mb-2 md:mb-0">
                          <FontAwesomeIcon icon={faBuilding} className="ml-1 text-gray-400" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center ml-4 mb-2 md:mb-0">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-1 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center ml-4 mb-2 md:mb-0">
                          <FontAwesomeIcon icon={faMoneyBill} className="ml-1 text-gray-400" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center mb-2 md:mb-0">
                          <FontAwesomeIcon icon={faCalendar} className="ml-1 text-gray-400" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow p-6 mb-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">ملخص الوظيفة</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-1/2 text-gray-600">التخصص:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.category}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex">
                  <div className="w-1/2 text-gray-600">نوع الدوام:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.type}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex">
                  <div className="w-1/2 text-gray-600">الخبرة المطلوبة:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.experience}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex">
                  <div className="w-1/2 text-gray-600">المؤهل العلمي:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.qualification}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex">
                  <div className="w-1/2 text-gray-600">الراتب:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.salary}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex">
                  <div className="w-1/2 text-gray-600">الموقع:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.location}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex">
                  <div className="w-1/2 text-gray-600">تاريخ النشر:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.posted}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex">
                  <div className="w-1/2 text-gray-600">آخر موعد للتقديم:</div>
                  <div className="w-1/2 text-gray-900 font-medium">{job.deadline}</div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to={`/jobs/${job.id}/apply`} 
                  className="w-full block text-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  تقديم طلب
                </Link>
              </div>
              
              <div className="mt-4">
                <button 
                  type="button" 
                  className="w-full block text-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  حفظ الوظيفة
                </button>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">هل تحتاج للمساعدة؟</h2>
              <p className="text-gray-700 mb-4">إذا كانت لديك أسئلة حول هذه الوظيفة أو عملية التقديم، يمكنك التواصل معنا:</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="ml-2 text-green-600" />
                  <span className="text-gray-700">دعم العملاء: 8001234567</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 ml-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-700">البريد الإلكتروني: support@shaghelne.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSingle;
