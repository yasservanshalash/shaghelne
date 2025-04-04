import { useLocation } from "react-router-dom";

import { useState } from "react";

const categories = [
  "جميع الفئات",
  "تصميم الجرافيك",
  "التسويق الرقمي",
  "الكتابة والترجمة",
  "الفيديو والرسوم المتحركة",
  "الصوت والموسيقى",
  "البرمجة والتقنية",
  "الأعمال",
  "نمط الحياة",
  "الشائع",
  // "All Categories",
  // "Graphics Design",
  // "Digital Marketing",
  // "Writing Translation",
  // "Video Animation",
  // "Music Audio",
  // "Programming Tech",
  // "Business",
  // "Lifestyle",
  // "Trending",
];

// categories_list_section overflow-hidden

export default function TabSection1() {
  const [getCurrentTab, setCurrentTab] = useState("جميع الفئات");

  const { pathname } = useLocation();

  return (
    <>
    <section className={`${pathname === "/home-3" ? "bg-green-50" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="relative overflow-x-auto">
            <ul className="flex flex-nowrap justify-center space-x-6 space-x-reverse border-b border-gray-200 pb-1 overflow-x-auto scrollbar-hide" dir="rtl">
              {categories.map((item, index) => (
                <li key={index} className="whitespace-nowrap">
                  <button
                    onClick={() => setCurrentTab(item)}
                    className={`py-3 px-2 font-medium text-sm border-b-2 transition-all duration-200 ${
                      getCurrentTab === item 
                        ? "text-green-600 border-green-500" 
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
