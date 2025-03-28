import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

export default function Testimonial2() {
  const [activeTab, setActiveTab] = useState("profile");

  const testimonialData = [
    {
      id: "home",
      content: "لقد كانت تجربتي مع هذه المنصة مميزة للغاية. الدورات التدريبية منظمة بشكل احترافي والمدربون خبراء في مجالاتهم. استطعت تطوير مهاراتي في التصميم بسرعة كبيرة، مما ساعدني في الحصول على فرص عمل جديدة.",
      image: "/images/testimonials/1.jpg",
      name: "ألبرت كول",
      position: "مصمم"
    },
    {
      id: "profile",
      content: "أنا سعيدة جداً باختياري لهذه المنصة لتعلم تطوير المواقع. المحتوى التعليمي شامل وعملي، والدعم الفني متاح على مدار الساعة. بعد إكمال ثلاث دورات، أصبحت قادرة على بناء مواقع ووردبريس كاملة من الصفر.",
      image: "/images/testimonials/2.jpg",
      name: "أليسون داون",
      position: "مطور ووردبريس"
    },
    {
      id: "contact",
      content: "ما يميز هذه المنصة عن غيرها هو التوازن بين النظرية والتطبيق. المشاريع العملية ساعدتني على اكتساب خبرة حقيقية في تطوير الواجهات الأمامية. أوصي بشدة أي شخص يرغب في دخول مجال البرمجة بالتسجيل في هذه الدورات.",
      image: "/images/testimonials/3.jpg",
      name: "دانيال باركر",
      position: "مطور واجهة أمامية"
    }
  ];

  return (
    <>
      <section className="py-16" dir="rtl">
        <div className="container mx-auto px-4 animate-fadeInUp">
          <div className="flex flex-wrap relative top-[50px]">
            <div className="w-full lg:w-6/12 mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3">ما يقوله طلابنا</h2>
                <p className="text-gray-600 mt-2.5">
                  اكتشف البرنامج المثالي لك في دوراتنا.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-full xl:w-10/12 mx-auto">
              <div className="relative mt-10">
                <div className="mb-16">
                  {testimonialData.map((item) => (
                    <div
                      key={item.id}
                      className={`text-center transition-opacity duration-300 ${
                        activeTab === item.id ? "opacity-100" : "opacity-0 hidden"
                      }`}
                    >
                      <div className="text-center rounded-xl p-10 max-w-4xl mx-auto">
                        <div className="mb-6 flex justify-center">
                          <FontAwesomeIcon 
                            icon={faQuoteLeft} 
                            className="text-green-400 scale-150"
                            size="3x"
                          />
                        </div>
                        <h4 className="text-2xl font-medium max-w-3xl mx-auto mb-8 text-gray-700 leading-relaxed">
                          "{item.content}"
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="flex flex-wrap justify-center gap-6">
                  {testimonialData.map((item) => (
                    <li key={item.id} className="cursor-pointer w-1/5">
                      <a
                        className={`block transition-all duration-300 ${
                          activeTab === item.id ? "ring-2 ring-green-500 scale-105 rounded-xl" : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <div className="flex flex-row-reverse justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                          <div className="mr-4 xl:mr-3">
                            <h6 className="font-semibold text-gray-800 text-right">
                              {item.name}
                            </h6>
                            <span className="text-sm text-gray-500 block text-right">{item.position}</span>
                          </div>
                          <img
                            className="rounded-full h-16 w-16 object-cover border-2 border-gray-100"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
