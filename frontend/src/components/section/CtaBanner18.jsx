import { featuresTwo, frelancersFeatures } from "../../data/features";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CtaBanner18() {
  return (
    <section className="relative mx-auto max-w-[1700px] py-16 lg:py-20 flex" dir="rtl">
      <div className="container mx-auto p-10 bg-green-200 flex rounded-2xl">
        <div
          className="flex flex-wrap items-center animate-fadeInDown"
          data-wow-delay="400ms"
        >
          <div className="w-full lg:w-7/12 xl:w-5/12 xl:mr-[8.333%] mb-16 md:mb-24 lg:mb-0 animate-fadeInLeft">
            <div className="mb-8">
              <div>
                <h2 className="text-3xl font-bold text-right">
                  عالم كامل من المواهب المستقلة{" "}
                  <br className="hidden xl:block" /> في متناول يديك
                </h2>
              </div>
            </div>
            <div>
              {frelancersFeatures.map((elm, i) => (
                <div key={i} className="flex flex-row-reverse items-start mb-8">
                  <span
                    className={`flex-shrink-0 ${elm.iconClass}`}
                  ></span>
                  <div className="flex-grow mr-5 text-right">
                    <h4 className="mb-1 font-semibold">
                      {elm.title === "Proof of quality" ? "دليل على الجودة" :
                      elm.title === "No cost until you hire" ? "لا تكلفة حتى توظف" :
                      elm.title === "Safe and secure" ? "آمن ومضمون" :
                      elm.title}
                    </h4>
                    <p className="text-gray-600 text-base">
                      {elm.content === "Check any pro's work samples, client reviews, and identity verification." ? 
                        "تحقق من عينات عمل أي محترف ومراجعات العملاء والتحقق من الهوية." : 
                      elm.content === "Interview potential fits for your job, negotiate rates, and only pay for work you approve." ? 
                        "قابل المرشحين المناسبين لوظيفتك، وتفاوض على الأسعار، وادفع فقط مقابل العمل الذي توافق عليه." :
                      elm.content === "Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it." ? 
                        "ركز على عملك مع العلم أننا نساعد في حماية بياناتك وخصوصيتك. نحن هنا لتقديم الدعم على مدار الساعة طوال أيام الأسبوع إذا احتجت إليه." :
                      elm.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-5/12 xl:w-4/12 animate-fadeInRight z-10 relative right-[100px]">
            <div className="bg-gray-900 text-white rounded-2xl p-8 px-8 relative">
              <div>
                <ul className="mb-0 text-right">
                  {featuresTwo.map((elm, i) => (
                    <li key={i} className="text-white font-medium flex items-center justify-between mb-3 flex gap-2">
                      <FontAwesomeIcon 
                        icon={faCheck} 
                        className="bg-white text-gray-900 p-1 rounded-full" 
                        size="sm" 
                      />
                      <span className="flex-grow ml-3 text-right">{elm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="rounded-3xl mt-8 relative left-[250px] bottom-[20px]"
        src="/images/about/about-19.jpg"
        alt="عرض المواهب المستقلة"
      />
    </section>
  );
}
