import { featuresTwo, frelancersFeatures } from "../../data/features";
import React from "react";

export default function CtaBanner18() {
  return (
    <section className="relative mx-auto max-w-[1700px] py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4">
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
          <div className="w-full lg:w-5/12 xl:w-4/12 animate-fadeInRight">
            <div className="bg-gray-900 text-white rounded-2xl p-8 px-8 relative">
              <div>
                <ul className="mb-0 text-right">
                  {featuresTwo.map((elm, i) => (
                    <li key={i} className="text-white font-medium flex flex-row-reverse items-center mb-3">
                      <i className="far fa-check bg-white text-gray-900 p-1 rounded-full ml-3"></i>
                      {elm === "The best for every budget" ? "الأفضل لكل ميزانية" :
                       elm === "Quality work done quickly" ? "عمل عالي الجودة ينجز بسرعة" :
                       elm === "Protected payments, every time" ? "مدفوعات محمية في كل مرة" :
                       elm === "24/7 support" ? "دعم على مدار الساعة" :
                       elm === "Connect to freelancers with proven business experience" ? "تواصل مع مستقلين ذوي خبرة مثبتة في مجال الأعمال" :
                       elm === "Get matched with the perfect talent by a customer success manager" ? "احصل على تطابق مع الموهبة المثالية من قبل مدير نجاح العملاء" :
                       elm === "Manage teamwork and boost productivity with one powerful workspace" ? "إدارة العمل الجماعي وتعزيز الإنتاجية من خلال مساحة عمل واحدة قوية" :
                       elm === "A business model proven" ? "نموذج أعمال مثبت" :
                       elm === "XML, HTML, PDFs" ? "XML، HTML، ملفات PDF" :
                       elm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="rounded-3xl w-full mt-8"
        src="/images/about/about-19.jpg"
        alt="عرض المواهب المستقلة"
      />
    </section>
  );
}
