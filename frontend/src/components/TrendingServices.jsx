import { product1 } from "../data/product";
import { useState } from "react";
import PopularServiceCard1 from "./card/PopularServiceCard1";
import PopularServiceSlideCard1 from "./card/PopularServiceSlideCard1";

const categories = [
    "الكل",
    "الفيديو والرسوم المتحركة",
  "الموسيقى والصوت",
  "التسويق الرقمي",
  "التصميم والإبداع",
  "البرمجة وتكنولوجيا المعلومات",
];

export default function TrendingServices() {
  const [getCurrentCategory, setCurrentCategory] = useState("الكل");

  // tab handler
  const tabHandler = (select) => {
    setCurrentCategory(select);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-10">
          <div className="mb-6 md:mb-0 text-right">
            <h2 className="text-3xl font-bold mb-2">الخدمات الشائعة</h2>
            <p className="text-gray-600">
              الخدمات الأكثر مشاهدة والأكثر مبيعًا على الإطلاق
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-wrap justify-center md:justify-end mb-6 md:mb-0 flex-row-reverse">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => tabHandler(item)}
                  className={`px-4 py-2 mx-1 mb-2 rounded-md font-medium transition-colors ${
                    getCurrentCategory === item
                      ? "bg-green-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product1
            .filter((item) =>
              getCurrentCategory === "الكل"
                ? item
                : item.tag === getCategoryTag(getCurrentCategory) && item
            )
            .slice(0, 4)
            .map((item, i) => (
              <PopularServiceCard1 
                key={i}
                data={item}
                textAlign="text-right"
                ratingDirection="flex-row-reverse"
              />
            ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to map Arabic categories to English tags
function getCategoryTag(arabicCategory) {
  switch (arabicCategory) {
    case "البرمجة وتكنولوجيا المعلومات":
      return "Development & IT";
    case "التصميم والإبداع":
      return "Design & Creative";
    case "التسويق الرقمي":
      return "Digital Marketing";
    case "الموسيقى والصوت":
      return "Music & Audio";
    case "الفيديو والرسوم المتحركة":
      return "Video & Animation";
    default:
      return "";
  }
}
