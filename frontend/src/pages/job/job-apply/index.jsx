import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaComponent from "../../../components/common/MetaComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding,
  faMapMarkerAlt, 
  faBriefcase, 
  faMoneyBill, 
  faFileUpload,
  faCheck,
  faUser,
  faEnvelope,
  faPhone,
  faGraduationCap,
  faLink
} from '@fortawesome/free-solid-svg-icons';

const JobApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    currentCompany: '',
    portfolioLink: '',
    coverLetter: '',
    resume: null,
    agreeToTerms: false
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صالح';
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.resume) newErrors.resume = 'السيرة الذاتية مطلوبة';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      // Here you would typically submit the form data to your API
      alert('تم تقديم طلبك بنجاح!');
      navigate('/dashboard/jobs');
    }
  };
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };
  
  // Mock job data (in a real app, this would be fetched based on the ID)
  const job = {
    id: 1,
    title: 'مصمم واجهات مستخدم UI/UX',
    company: 'شركة التقنية المتقدمة',
    logo: 'https://placehold.co/300/100',
    location: 'الرياض، المملكة العربية السعودية',
    type: 'دوام كامل',
    salary: '١٠٠٠٠ - ١٥٠٠٠ ريال',
    deadline: '١٥ أبريل ٢٠٢٤'
  };

const metadata = {
    title: `تقديم طلب: ${job.title} - ${job.company} | شغلني`
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center" dir="rtl">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <FontAwesomeIcon icon={faUser} className="text-green-600 text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تسجيل الدخول مطلوب</h2>
            <p className="text-gray-600 mb-6">يجب تسجيل الدخول لتتمكن من تقديم طلب على هذه الوظيفة</p>
            <Link 
              to={`/login?redirect=/jobs/${id}/apply`}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              تسجيل الدخول
            </Link>
            <div className="mt-4">
              <Link
                to={`/jobs/${id}`}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                العودة إلى تفاصيل الوظيفة
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <MetaComponent meta={metadata} />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Job Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img 
                src={job.logo} 
                alt={job.company} 
                className="h-16 w-16 rounded-md object-cover border border-gray-200 ml-4 mb-4 sm:mb-0" 
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <div className="mt-2 flex flex-wrap text-sm text-gray-600">
                  <div className="flex items-center ml-4 mb-2 sm:mb-0">
                    <FontAwesomeIcon icon={faBuilding} className="ml-1 text-gray-400" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center ml-4 mb-2 sm:mb-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-1 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center ml-4 mb-2 sm:mb-0">
                    <FontAwesomeIcon icon={faBriefcase} className="ml-1 text-gray-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center mb-2 sm:mb-0">
                    <FontAwesomeIcon icon={faMoneyBill} className="ml-1 text-gray-400" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">تقديم طلب وظيفي</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">المعلومات الشخصية</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
              </div>
              
              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">المعلومات المهنية</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                      المؤهل التعليمي
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="education"
                        id="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="بكالوريوس هندسة برمجيات"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      سنوات الخبرة
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    >
                      <option value="">اختر سنوات الخبرة</option>
                      <option value="0-1">أقل من سنة</option>
                      <option value="1-2">1-2 سنوات</option>
                      <option value="3-5">3-5 سنوات</option>
                      <option value="5-10">5-10 سنوات</option>
                      <option value="10+">أكثر من 10 سنوات</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="currentCompany" className="block text-sm font-medium text-gray-700 mb-1">
                      الشركة الحالية
                    </label>
                    <input
                      type="text"
                      name="currentCompany"
                      id="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-1">
                      رابط معرض الأعمال أو LinkedIn
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faLink} className="text-gray-400" />
                      </div>
                      <input
                        type="url"
                        name="portfolioLink"
                        id="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="https://www.linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cover Letter */}
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                  الرسالة التعريفية
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="اكتب رسالة مختصرة تعبر فيها عن سبب اهتمامك بهذه الوظيفة ولماذا أنت مناسب لها..."
                />
              </div>
              
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  السيرة الذاتية <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FontAwesomeIcon 
                      icon={faFileUpload} 
                      className="mx-auto h-12 w-12 text-gray-400" 
                    />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="resume"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                      >
                        <span>رفع ملف</span>
                        <input 
                          id="resume" 
                          name="resume" 
                          type="file" 
                          className="sr-only" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleChange}
                        />
                      </label>
                      <p className="pr-1">أو سحب وإفلات</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX حتى 10MB</p>
                    {formData.resume && (
                      <p className="text-sm text-green-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheck} className="ml-1" />
                        {formData.resume.name}
                      </p>
                    )}
                  </div>
                </div>
                {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
              </div>
              
              {/* Terms & Conditions */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                  />
                </div>
                <div className="mr-3 text-sm">
                  <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                    أوافق على <a href="#" className="text-green-600 hover:text-green-500">الشروط والأحكام</a> وسياسة الخصوصية.
                  </label>
                  {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex justify-between">
                <Link
                  to={`/jobs/${id}`}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  إلغاء
                </Link>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  تقديم الطلب
                </button>
              </div>
            </form>
          </div>
          
          {/* Tips Section */}
          <div className="bg-green-50 rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">نصائح للتقديم</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <div className="ml-2 text-green-600">•</div>
                <span>تأكد من أن سيرتك الذاتية محدثة وتعكس المهارات المطلوبة للوظيفة.</span>
              </li>
              <li className="flex">
                <div className="ml-2 text-green-600">•</div>
                <span>اكتب رسالة تعريفية مخصصة لهذه الوظيفة توضح سبب اهتمامك بالمنصب.</span>
              </li>
              <li className="flex">
                <div className="ml-2 text-green-600">•</div>
                <span>تحقق من وجود روابط صالحة وإملاء صحيح في طلبك.</span>
              </li>
              <li className="flex">
                <div className="ml-2 text-green-600">•</div>
                <span>احرص على الرد السريع في حال تم التواصل معك لإجراء مقابلة.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApply; 