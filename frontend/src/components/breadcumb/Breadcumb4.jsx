import FsLightbox from "fslightbox-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Breadcumb4() {
  const [toggler, setToggler] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <section className="pt-0" dir="rtl">
        <div
          className={`mx-auto max-w-7xl pt-28 pb-28 rounded-2xl relative overflow-hidden flex items-center px-7 lg:px-8 ${
            pathname === "/service-1"
              ? "bg-green-50 lg:mx-5"
              : pathname === "/service-2"
              ? "bg-blue-50"
              : pathname === "/service-5"
              ? "bg-green-50 mb-14 mx-0"
              : "bg-gray-50"
          }`}
        >
          <img
            className="absolute left-0 top-0 animate-pulse"
            src="/images/vector-img/left-top.png"
            alt="vector-img"
          />
          <img
            className="absolute right-0 bottom-0 animate-pulse"
            src="/images/vector-img/right-bottom.png"
            alt="vector-img"
          />
          <img
            className="absolute left-[100px] animate-bounce hidden lg:block"
            src="/images/vector-img/vector-service-v1.png"
            alt="vector-img"
            style={{ animationDuration: "3s", animationDelay: "1.5s" }}
          />

          <div className="container mx-auto">
            <div className="animate-in fade-in duration-700">
              <div
                className={`${
                  pathname === "/service-5" ? "w-full lg:w-2/3" : "w-full lg:w-5/12"
                }`}
              >
                <div
                  className={`relative ${
                    pathname === "/service-5" ? "pl-20 sm:pl-0" : ""
                  }`}
                  dir="rtl"
                >
                  <h2 className="text-3xl font-bold mb-3">التصميم والإبداع</h2>
                  <p className="text-gray-600 mb-7">
                    قدم لزائرك تجربة عبر الإنترنت سلسة مع تصميم UX قوي
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() => setToggler(!toggler)}
                      className="mr-3 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-green-600 hover:text-white transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faPlay} size="sm" />
                    </button>
                    <h6 className="m-0 font-medium">كيف يعمل شاغلني</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FsLightbox
        toggler={toggler}
        sources={["https://www.youtube.com/watch?v=7EHnQ0VM4KY"]}
      />
    </>
  );
}
