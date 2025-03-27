import HeighestRetedCard1 from "../card/HighestRatedCard1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { freelancer1, hightedRated1 } from "../../data/product";
import { Link } from "react-router-dom";
import { browserCategory } from "../../data/project";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function BrowserCategory20() {
  const [showSwiper, setShowSwiper] = useState(false);
  useEffect(() => {
    setShowSwiper(true);
  }, []);

  return (
    <>
      <section className="pb-32 md:pb-24 mx-auto max-w-[1700px] bg-gray-50 rounded-3xl p-20" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center mb-8 animate-fadeIn">
            <div className="w-full lg:w-9/12">
              <div className="text-right">
                <h2 className="text-3xl font-bold mb-2">تصفح المواهب حسب الفئة</h2>
                <p className="text-gray-600">
                  احصل على بعض الإلهام من أكثر من 1800 مهارة
                </p>
              </div>
            </div>
            <div className="w-full lg:w-3/12">
              <div className="lg:text-left mb-3">
                <Link to="/freelancer-1" className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
                  جميع الفئات
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full">
              <div className="ui-hightest-rated">
                {showSwiper && (
                  <Swiper
                    spaceBetween={30}
                    navigation={{
                      prevEl: ".unique-13-pre",
                      nextEl: ".unique-13-next",
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                    loop={true}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      992: {
                        slidesPerView: 3,
                      },
                      1200: {
                        slidesPerView: 4,
                      },
                    }}
                    dir="rtl"
                  >
                    {browserCategory.map((elm, index) => (
                      <SwiperSlide key={index}>
                        <div className="p-2">
                          <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="mb-4">
                              <span className={`text-4xl text-green-500 ${elm.icon}`}></span>
                            </div>
                            <div className="mt-5 text-right">
                              <p className="text-gray-500 text-sm mb-1">{elm.skill} مهارة</p>
                              <h4 className="text-xl font-semibold mb-2">
                                <Link to="/service-1" className="text-gray-800 hover:text-green-500 transition-colors">
                                  {elm.title === "Development & IT" ? "تطوير وتكنولوجيا المعلومات" :
                                   elm.title === "Design & Creative" ? "التصميم والإبداع" :
                                   elm.title === "Digital Marketing" ? "التسويق الرقمي" :
                                   elm.title === "Writing & Translation" ? "الكتابة والترجمة" :
                                   elm.title === "Video & Animation" ? "الفيديو والرسوم المتحركة" :
                                   elm.title === "Music & Audio" ? "الموسيقى والصوت" :
                                   elm.title === "Programming & Tech" ? "البرمجة والتكنولوجيا" :
                                   elm.title === "Business" ? "الأعمال" : elm.title}
                                </Link>
                              </h4>
                              <p className="text-gray-600">
                                {elm.brif && (elm.brif.includes("popular") ? "خدمات شائعة وذات جودة عالية" : "مجموعة متنوعة من المهارات المتخصصة")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
            <div className="relative top-10">
            <button
              type="button"
              style={{ right: "5px", top: "100%", transform: "scale(0.8)" }}
              className="prev-btn pre-slide3 unique-13-next absolute w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-gray-700 hover:text-green-500 transition-colors focus:outline-none"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
            </button>
            <button
              style={{ right: "70px", top: "100%", transform: "scale(0.8)" }}
              type="button"
              className="next-btn next-slide3 unique-13-pre absolute w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-gray-700 hover:text-green-500 transition-colors focus:outline-none"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
            </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
