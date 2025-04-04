import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CtaBanner21() {
  return (
    <section className="max-w-[1700px] mx-auto rounded-3xl bg-gradient-to-r from-green-600 to-green-700 mb-14" dir="rtl">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-6/12 lg:w-8/12 animate-fadeInLeft order-2 md:order-1">
            <div className="text-white mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                مع المستقلين الموهوبين، أنجز{" "}
                <br className="hidden xl:block" /> المزيد من العمل.
              </h2>
              <p className="mb-8">
                اعمل مع أكبر شبكة من المحترفين المستقلين{" "}
                <br className="hidden lg:block" /> وأنجز مهامك — بسرعة
                وكفاءة عالية.
              </p>
              <Link to="/job-1" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-2xl ml-5 hover:bg-gray-100 transition-colors">
                ابحث عن عمل <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              </Link>
              <Link
                to="/freelancer-1"
                className="inline-block px-6 py-3 border border-white text-white rounded-2xl hover:bg-white hover:text-gray-900 transition-colors"
              >
                ابحث عن موهبة <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-6/12 lg:w-4/12 animate-fadeIn order-1 md:order-2">
            <img
              className="hidden md:block mx-auto"
              src="/images/about/about-16.png"
              alt="رسم توضيحي للعاملين المستقلين"
            />
            <img
              className="hidden md:block absolute -bottom-10 right-10 max-w-xs"
              src="/images/about/element-12.png"
              alt="عنصر زخرفي"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
