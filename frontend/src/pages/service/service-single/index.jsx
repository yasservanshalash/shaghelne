import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MetaComponent from "../../../components/common/MetaComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faClock, 
  faMoneyBill,
  faUser,
  faStar,
  faCheckCircle,
  faShieldAlt,
  faInfoCircle,
  faTag,
  faComment,
  faList
} from '@fortawesome/free-solid-svg-icons';

const ServiceSingle = () => {
  const { id } = useParams();
  
  // Mock service data (in a real app, this would be fetched based on the ID)
  const service = {
    id: 1,
    title: 'تصميم هوية بصرية احترافية للشركات',
    provider: 'أحمد محمد',
    providerTitle: 'مصمم جرافيك محترف',
    location: 'الرياض، المملكة العربية السعودية',
    image: 'https://placehold.co/300/600x400',
    profileImage: 'https://placehold.co/300/100',
    rating: 4.9,
    reviewsCount: 56,
    price: '٥٠٠ - ١٥٠٠ ريال',
    description: 'تصميم هوية بصرية متكاملة تشمل الشعار والألوان والخطوط وكل العناصر البصرية التي تعكس قيم علامتك التجارية وتميزها عن المنافسين.',
    deliveryTime: '٥-٧ أيام',
    revisions: 'غير محدود',
    providerSince: '٢٠١٨',
    completedProjects: '١٣٧',
    skills: ['تصميم شعارات', 'هوية بصرية', 'تصميم جرافيك', 'Adobe Illustrator', 'تصميم بطاقات عمل', 'تصميم أغلفة'],
    gallery: [
      'https://placehold.co/300/600x400',
      'https://placehold.co/300/600x400',
      'https://placehold.co/300/600x400',
      'https://placehold.co/300/600x400'
    ],
    longDescription: `
      تصميم هوية بصرية متكاملة لعلامتك التجارية تشمل جميع العناصر البصرية التي تحتاجها لبناء صورة احترافية ومميزة. 
      
      أقدم لك خدمة تصميم هوية بصرية متكاملة تجعل علامتك التجارية تبرز وسط المنافسين وتترك انطباعًا دائمًا في أذهان عملائك.
      
      الخدمة تشمل:
      
      1. تصميم شعار احترافي وفريد من نوعه يعكس قيم وروح علامتك التجارية.
      2. اختيار مجموعة ألوان متناسقة تناسب مجال عملك وتميز هويتك.
      3. تحديد الخطوط المناسبة للعلامة التجارية واستخداماتها المختلفة.
      4. تصميم قوالب للأوراق الرسمية (ترويسة، ظرف، بطاقة عمل).
      5. دليل استخدام الهوية البصرية (Brand Guidelines).
      6. ملفات بصيغ قابلة للتعديل.
      
      كل ما تحتاجه لبدء مشروعك بهوية بصرية احترافية ومتميزة.
    `,
    packages: [
      {
        name: 'أساسي',
        price: '٥٠٠ ريال',
        description: 'تصميم شعار وبطاقة عمل',
        includes: [
          'تصميم شعار (٣ مقترحات)',
          'تصميم بطاقة عمل',
          'ملفات قابلة للتعديل',
          'تسليم خلال ٥ أيام',
          'تعديلات غير محدودة'
        ]
      },
      {
        name: 'قياسي',
        price: '١٠٠٠ ريال',
        description: 'هوية بصرية أساسية',
        includes: [
          'تصميم شعار (٥ مقترحات)',
          'تصميم بطاقة عمل',
          'ترويسة وظرف',
          'مجموعة ألوان وخطوط',
          'ملفات قابلة للتعديل',
          'تسليم خلال ٦ أيام',
          'تعديلات غير محدودة'
        ]
      },
      {
        name: 'متقدم',
        price: '١٥٠٠ ريال',
        description: 'هوية بصرية متكاملة',
        includes: [
          'تصميم شعار (٧ مقترحات)',
          'تصميم بطاقة عمل',
          'ترويسة وظرف',
          'مجموعة ألوان وخطوط',
          'دليل استخدام الهوية البصرية',
          'ملفات بصيغ مختلفة',
          'تصميم توقيع بريد إلكتروني',
          'غلاف وسائل التواصل الاجتماعي',
          'تسليم خلال ٧ أيام',
          'تعديلات غير محدودة'
        ]
      }
    ],
    faqs: [
      {
        question: 'ما هي المعلومات التي تحتاجها لبدء العمل؟',
        answer: 'أحتاج إلى معلومات عن نشاط شركتك، الفئة المستهدفة، المنافسين، وأي أفكار أو تفضيلات لديك بخصوص التصميم والألوان.'
      },
      {
        question: 'هل يمكنني طلب تعديلات على التصميم؟',
        answer: 'نعم، جميع الباقات تشمل تعديلات غير محدودة حتى تكون راضيًا تمامًا عن النتيجة النهائية.'
      },
      {
        question: 'ما هي صيغ الملفات التي سأحصل عليها؟',
        answer: 'ستحصل على ملفات بصيغ متعددة: AI، EPS، PDF، PNG، JPG. كما ستحصل على ملفات المصدر القابلة للتعديل.'
      },
      {
        question: 'هل يمكنك تصميم عناصر إضافية غير مذكورة في الباقات؟',
        answer: 'نعم، يمكننا مناقشة أي عناصر إضافية تحتاجها وإضافتها للطلب مقابل رسوم إضافية يتم الاتفاق عليها.'
      }
    ],
    reviewsList: [
      {
        name: 'محمد السيد',
        date: 'منذ ٣ أشهر',
        rating: 5,
        comment: 'تجربة رائعة! حصلت على هوية بصرية احترافية ومميزة لشركتي. أحمد متعاون جدًا ومبدع في عمله. سأتعامل معه مرة أخرى بالتأكيد.'
      },
      {
        name: 'سارة الأحمد',
        date: 'منذ شهرين',
        rating: 4,
        comment: 'التصميم جميل جدًا والتسليم كان في الموعد المحدد. فقط كنت أتمنى المزيد من الخيارات في البداية، لكن النتيجة النهائية ممتازة.'
      },
      {
        name: 'خالد العمري',
        date: 'منذ أسبوعين',
        rating: 5,
        comment: 'أحمد محترف ومتفهم لاحتياجات العميل. قدم لي هوية بصرية متكاملة لمشروعي الجديد تفوق توقعاتي. شكرًا جزيلاً!'
      }
    ]
  };
  
  // Similar services
  const similarServices = [
    {
      id: 2,
      title: 'تصميم شعار احترافي لعلامتك التجارية',
      provider: 'سارة الخالد',
      rating: 4.8,
      reviews: 42,
      price: '٣٠٠ - ٧٠٠ ريال',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 3,
      title: 'تصميم مواد تسويقية للشركات والمؤسسات',
      provider: 'علي الزهراني',
      rating: 4.7,
      reviews: 38,
      price: '٤٠٠ - ٩٠٠ ريال',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 4,
      title: 'تصميم أغلفة ومنشورات لوسائل التواصل الاجتماعي',
      provider: 'نورة العتيبي',
      rating: 4.9,
      reviews: 27,
      price: '٢٥٠ - ٦٠٠ ريال',
      image: 'https://placehold.co/300x200'
    }
  ];

const metadata = {
    title: `${service.title} - ${service.provider} | شغلني`
};

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <MetaComponent meta={metadata} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="w-full lg:w-2/3 lg:ml-8">
            {/* Service Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h1>
              
              <div className="flex items-center mb-6">
                <img 
                  src={service.profileImage} 
                  alt={service.provider} 
                  className="w-12 h-12 rounded-full object-cover border border-gray-200 ml-3" 
                />
                <div>
                  <h3 className="font-medium text-gray-900">{service.provider}</h3>
                  <p className="text-sm text-gray-600">{service.providerTitle}</p>
                </div>
                <div className="flex items-center mr-auto text-sm">
                  <div className="flex items-center text-yellow-400">
                    <FontAwesomeIcon icon={faStar} className="ml-1" />
                    <span className="text-gray-700">{service.rating}</span>
                  </div>
                  <span className="text-gray-500 mr-1">({service.reviewsCount} تقييم)</span>
                </div>
              </div>
              
              <div className="mb-6">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-auto rounded-lg object-cover" 
                />
              </div>
              
              {/* Gallery */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {service.gallery.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`${service.title} - صورة ${index + 1}`} 
                    className="rounded-lg object-cover w-full h-24" 
                  />
                ))}
              </div>
            </div>
            
            {/* Service Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">وصف الخدمة</h2>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                {service.longDescription}
              </div>
            </div>
            
            {/* Service Packages */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">باقات الخدمة</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.packages.map((pkg, index) => (
                  <div key={index} className={`border rounded-lg ${index === 2 ? 'border-green-500 shadow-md' : 'border-gray-200'}`}>
                    <div className={`p-4 border-b ${index === 2 ? 'bg-green-50 border-green-500' : 'border-gray-200'}`}>
                      <h3 className={`font-bold text-lg ${index === 2 ? 'text-green-600' : 'text-gray-900'}`}>{pkg.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                      <p className={`text-xl font-bold ${index === 2 ? 'text-green-600' : 'text-gray-900'}`}>{pkg.price}</p>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 ml-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        className={`w-full mt-4 px-4 py-2 rounded-md font-medium text-sm ${
                          index === 2 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        اختيار الباقة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
              
              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">التقييمات والمراجعات</h2>
                <div className="flex items-center text-yellow-400">
                  <FontAwesomeIcon icon={faStar} className="ml-1" />
                  <span className="text-gray-700">{service.rating}</span>
                  <span className="text-gray-500 mr-1">({service.reviewsCount} تقييم)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {service.reviewsList.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{review.name}</h3>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon 
                          key={i} 
                          icon={faStar} 
                          className={i < review.rating ? "text-yellow-400 ml-1" : "text-gray-300 ml-1"} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50">
                  عرض كل التقييمات
                </button>
              </div>
            </div>
            
            {/* Similar Services */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">خدمات مشابهة</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarServices.map(service => (
                  <div key={service.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 hover:shadow-md transition-all duration-300">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <Link to={`/services/${service.id}`} className="block text-gray-900 font-bold hover:text-green-600 mb-2 line-clamp-2">
                        {service.title}
                      </Link>
                      <div className="flex items-center text-sm mb-2">
                        <FontAwesomeIcon icon={faUser} className="ml-1 text-gray-400" />
                        <span className="text-gray-600">{service.provider}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="flex items-center text-yellow-400">
                          <FontAwesomeIcon icon={faStar} className="ml-1" />
                          <span className="text-gray-700">{service.rating}</span>
                          <span className="text-gray-500 mr-1">({service.reviews})</span>
                        </div>
                        <span className="mr-auto font-bold text-green-600">{service.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">سعر الخدمة</h3>
                  <span className="font-bold text-2xl text-green-600">{service.price}</span>
                </div>
                <p className="text-gray-600 text-sm">اختر الباقة المناسبة لاحتياجاتك من قسم الباقات.</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faClock} className="text-gray-400 mt-1 ml-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">مدة التسليم</h4>
                    <p className="text-gray-600">{service.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400 mt-1 ml-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">التعديلات</h4>
                    <p className="text-gray-600">{service.revisions}</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4">
                التواصل مع البائع
              </button>
              <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                طلب عرض مخصص
              </button>
            </div>
            
            {/* Provider Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <img 
                  src={service.profileImage} 
                  alt={service.provider} 
                  className="w-16 h-16 rounded-full object-cover border border-gray-200 ml-4" 
                />
                <div>
                  <h3 className="font-bold text-gray-900">{service.provider}</h3>
                  <p className="text-sm text-gray-600">{service.providerTitle}</p>
                  <button className="text-green-600 text-sm font-medium mt-1 hover:text-green-700">
                    عرض الملف الشخصي
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">من:</span>
                  <span className="text-gray-900">{service.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">عضو منذ:</span>
                  <span className="text-gray-900">{service.providerSince}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">مشاريع مكتملة:</span>
                  <span className="text-gray-900">{service.completedProjects}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">التقييم:</span>
                  <div className="flex items-center text-yellow-400">
                    <FontAwesomeIcon icon={faStar} className="ml-1" />
                    <span className="text-gray-700">{service.rating}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                <FontAwesomeIcon icon={faComment} className="ml-2" />
                مراسلة
              </button>
            </div>
            
            {/* Skills & Tags */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">المهارات والكلمات المفتاحية</h3>
              <div className="flex flex-wrap gap-2">
                {service.skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <FontAwesomeIcon icon={faTag} className="ml-1 text-xs" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="bg-green-50 rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="ml-2 text-green-600" />
                نصائح للأمان
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <div className="ml-2 text-green-600">•</div>
                  <span>تواصل دائمًا مع البائع من خلال المنصة للحفاظ على حقوقك.</span>
                </li>
                <li className="flex items-start">
                  <div className="ml-2 text-green-600">•</div>
                  <span>استخدم نظام الدفع الخاص بنا لضمان حماية المعاملات المالية.</span>
                </li>
                <li className="flex items-start">
                  <div className="ml-2 text-green-600">•</div>
                  <span>راجع التقييمات والمراجعات قبل طلب الخدمة لمعرفة تجارب الآخرين.</span>
                </li>
                <li className="flex items-start">
                  <div className="ml-2 text-green-600">•</div>
                  <span>وضح متطلباتك بشكل دقيق قبل البدء بالعمل لتجنب سوء الفهم.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSingle;
