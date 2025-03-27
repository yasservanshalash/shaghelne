import React from 'react'

const HeroHome = () => {
    const popular = ["مصمم", "مطور", "ويب", "IOS", "PHP", "Senior"];

  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-[80vh] overflow-hidden">
        {/* Background SVG */}
        <div className="absolute w-full h-full opacity-10 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 480 360" 
            className="w-[80%] max-w-4xl transform scale-[1.25]"
          >
            <path 
              fill="#22c55e" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="5" 
              d="M420 180h0s0 0 0 0a45 45 0 0 1-20-37.4V80h-94c-23.4 0-46.4-7-66-20h0s0 0 0 0c-19.6 13-42.5 20-66 20H80v62.6c0 15-7.5 29-20 37.4h0s0 0 0 0a45 45 0 0 1 20 37.4V280h94c23.4 0 46.4 7 66 20h0s0 0 0 0c19.6-13 42.5-20 66-20h94v-62.6c0-15 7.5-29 20-37.4Z"
            />
          </svg>
        </div>

        {/* Left side decorative images */}
        <div className="absolute left-0 top-0 h-full w-full hidden lg:block pointer-events-none mx-[200px]">
          <img
            src="/images/about/home20-hero-1.png"
            alt="decorative"
            className="absolute left-10 top-[10%] w-20 opacity-80 animate-bounce-slow rounded-full"
          />
          <img
            src="/images/about/home20-hero-2.png"
            alt="decorative"
            className="absolute left-28 top-[30%] w-16 opacity-80 animate-bounce-slow rounded-full"
            style={{ animationDelay: "0.5s" }}
          />
          <img
            src="/images/about/home20-hero-3.png"
            alt="decorative"
            className="absolute left-5 top-[50%] w-24 opacity-80 animate-bounce-slow rounded-full"
            style={{ animationDelay: "1s" }}
          />
          <img
            src="/images/about/home20-hero-4.png"
            alt="decorative"
            className="absolute left-24 top-[70%] w-14 opacity-80 animate-bounce-slow rounded-full"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Right side decorative images */}
        <div className="absolute right-0 top-0 h-full w-1/4 hidden lg:block pointer-events-none mx-[200px]">
          <img
            src="/images/about/home20-hero-5.png"
            alt="decorative"
            className="absolute right-10 top-[15%] w-20 opacity-80 animate-bounce-slow rounded-full"
          />
          <img
            src="/images/about/home20-hero-6.png"
            alt="decorative"
            className="absolute right-32 top-[35%] w-16 opacity-80 animate-bounce-slow rounded-full"
            style={{ animationDelay: "0.7s" }}
          />
          <img
            src="/images/about/home20-hero-7.png"
            alt="decorative"
            className="absolute right-8 top-[55%] w-24 opacity-80 animate-bounce-slow rounded-full"
            style={{ animationDelay: "1.2s" }}
          />
          <img
            src="/images/about/home20-hero-8.png"
            alt="decorative"
            className="absolute right-20 top-[75%] w-14 opacity-80 animate-bounce-slow rounded-full"
            style={{ animationDelay: "1.7s" }}
          />
        </div>

        {/* Main content */}
        <div className='flex flex-col text-center items-center justify-center z-10'>
          <h1 className='text-4xl mb-5 font-bold'>انضم إلينا واستكشف
            <br/>
            آلاف المستقلين</h1>
          <p className='text-lg'>اعمل مع أشخاص موهوبين بأفضل الأسعار للحصول على أقصى استفادة من وقتك وتكلفتك</p>
          <div className="mt-8 w-full max-w-2xl bg-white rounded-full shadow-lg border-2 border-gray-300 p-6 flex flex-row-reverse gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="ابحث عن خدمة..." 
                className="w-full h-[50px] px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-right box-border" 
                dir="rtl" 
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1 relative">
              <select 
                className="w-full h-[50px] px-4 py-2 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-right box-border appearance-none" 
                dir="rtl"
              >
                <option value="">اختر المدينة</option>
                <option value="riyadh">الرياض</option>
                <option value="jeddah">جدة</option>
                <option value="dammam">الدمام</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <button className="h-[50px] bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors box-border">
              بحث
            </button>
          </div>

          <div className="block md:flex flex-row-reverse justify-center mt-8 text-center">
            <p className="text-sm mr-2 mb-0">:بحث شائع</p>
            <div className="flex flex-wrap justify-center">
              {popular.map((elm, i) => (
                <a key={i} className="text-gray-600 hover:text-green-500 cursor-pointer mx-1">
                  {`${elm}${i !== popular.length - 1 ? "،" : ""}`}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your App.css */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </>
  )
}

export default HeroHome