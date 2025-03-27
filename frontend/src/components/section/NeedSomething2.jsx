import AllTimeSelling from "../element/AllTimeSelling";

export default function NeedSomething2() {
  return (
    <>
      <section className="py-16 md:py-20 bg-white" dir="rtl">
        <div className="container mx-auto px-4 transform transition-transform duration-500 animate-fadeIn">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="mb-10 text-right">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">هل تحتاج إلى إنجاز شيء ما؟</h2>
                <p className="text-gray-600">
                  الخدمات الأكثر مشاهدة والأعلى مبيعاً على الإطلاق
                </p>
              </div>
            </div>
          </div>
          <AllTimeSelling />
        </div>
      </section>
    </>
  );
}
