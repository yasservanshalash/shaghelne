import { inspiringProjects, product1 } from "../../data/product";
import { Link } from "react-router-dom";
import React from "react";

export default function InspiringService11() {
  return (
    <section className="py-12 md:py-24" dir="rtl">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-wrap items-center animate-fadeInUp mb-8"
        >
          <div className="w-full lg:w-9/12">
            <div>
              <h2 className="text-3xl font-bold mb-2">أعمال ملهمة تم إنشاؤها على شغلني</h2>
              <p className="text-gray-600">
                احصل على بعض الإلهام من أكثر من 1800 مهارة
              </p>
            </div>
          </div>
          <div className="w-full lg:w-3/12">
            <div className="text-right mb-4 lg:mb-2">
              <Link className="inline-flex items-center text-gray-700 hover:text-gray-900" to="/blog-1">
                شاهد المزيد<i className="fal fa-arrow-left-long mr-2"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 animate-fadeInUp">
          {inspiringProjects.map((elm, i) => (
            <div key={i} className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-full">
                <img className="w-full rounded-t-xl" src={elm.imageSrc} alt="صورة المشروع" />
              </div>
              <div className="p-4">
                <div>
                  <a className="flex flex-row items-center" href="#">
                  <span className="relative mr-2 ml-4">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={elm.freelancerImageSrc}
                        alt="صورة المستقل"
                      />
                    </span>
                    <span>
                      <h5 className="text-sm font-medium mb-1">{elm.title}</h5>
                      <p className="text-sm text-gray-600 mb-0">بواسطة {elm.author}</p>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
