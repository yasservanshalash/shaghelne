import { Link } from "react-router-dom";
import FooterHeader from "./FooterHeader";
import { useLocation } from "react-router-dom";
import FooterSelect2 from "./FooterSelect2";
import { about, category, support } from "../../data/footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <>
      <section
        className={`pt-6 pb-0 bg-green-100 mt-10`}
        dir="rtl"
      >
        <div className="container mx-auto px-4">
          <FooterHeader />
          <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
              <div className="mb-4 sm:mb-5">
                <h5 className="mb-4 text-green-800 font-bold">
                  عن الموقع
                </h5>
                <div className="flex flex-col space-y-2">
                  {about.map((item, i) => (
                    <Link key={i} to={item.path} className="text-gray-700 hover:text-green-700">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
              <div className="mb-4 sm:mb-5">
                <h5 className="mb-4 text-green-800 font-bold">
                  التصنيفات
                </h5>
                <ul className="pr-0 space-y-2">
                  {category.map((item, i) => (
                    <li key={i}>
                      <Link to={item.path} className="text-gray-700 hover:text-green-700">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
              <div className="mb-4 sm:mb-5">
                <h5 className="mb-4 text-green-800 font-bold">
                  الدعم
                </h5>
                <ul className="pr-0 space-y-2">
                  {support.map((item, i) => (
                    <li key={i}>
                      <Link to={item.path} className="text-gray-700 hover:text-green-700">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
              <div className="mb-5">
                <div className="mb-4 sm:mb-5">
                  <div>
                    <h5 className="text-green-800 font-bold mb-5">اشترك معنا</h5>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded"
                        placeholder="عنوان بريدك الإلكتروني"
                      />
                      <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-3 py-1 rounded">إرسال</button>
                    </div>
                  </div>
                </div>
                <div className="mb-4 sm:mb-5">
                  <h5 className="text-green-800 font-bold mb-5">التطبيقات</h5>
                  <div className="mb-4 lg:mb-5">
                    <div className="w-full">
                      <a className="flex items-center mb-2.5 text-gray-700 hover:text-green-700">
                        <h6
                          className="text-base font-normal mb-0"
                        >
                          تطبيق آيفون
                        </h6>
                        <FontAwesomeIcon icon={faApple} className="text-lg ml-4" />
                      </a>
                      <a className="flex items-center text-gray-700 hover:text-green-700">
                        <h6
                          className="text-base font-normal mb-0"
                        >
                          تطبيق أندرويد
                        </h6>
                        <FontAwesomeIcon icon={faGooglePlay} className="text-base ml-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t border-green-200 py-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2">
              <div className="text-center md:text-right">
                <p
                  className="mb-2 md:mb-0 text-gray-700 font-heading"
                >
                  © شغلني. {new Date().getFullYear()}{" "}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="text-center md:text-left">
                <FooterSelect2 />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
