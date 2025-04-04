import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">عن شغّلني</h3>
            <p className="text-gray-400 mb-4">
              منصة شغّلني تربط بين أصحاب المشاريع والمستقلين المحترفين في مختلف المجالات، توفر بيئة عمل آمنة وموثوقة للطرفين.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">الرئيسية</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white">الوظائف</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">الخدمات</Link>
              </li>
              <li>
                <Link to="/freelancers" className="text-gray-400 hover:text-white">المستقلون</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">اتصل بنا</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">فئات مميزة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services?category=design" className="text-gray-400 hover:text-white">تصميم</Link>
              </li>
              <li>
                <Link to="/services?category=web-development" className="text-gray-400 hover:text-white">تطوير الويب</Link>
              </li>
              <li>
                <Link to="/services?category=mobile-development" className="text-gray-400 hover:text-white">تطوير تطبيقات الجوال</Link>
              </li>
              <li>
                <Link to="/services?category=marketing" className="text-gray-400 hover:text-white">تسويق رقمي</Link>
              </li>
              <li>
                <Link to="/services?category=writing" className="text-gray-400 hover:text-white">كتابة ومحتوى</Link>
              </li>
              <li>
                <Link to="/services?category=translation" className="text-gray-400 hover:text-white">ترجمة</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mt-1 ml-3" />
                <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-green-500 ml-3" />
                <span className="text-gray-400">+966 12 345 6789</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-500 ml-3" />
                <span className="text-gray-400">info@shaghalni.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} شغّلني. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 