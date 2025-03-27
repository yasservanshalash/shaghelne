import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className='flex flex-row-reverse justify-between items-center mx-[40px] p-4'>
            <div>
                <h1 className='text-4xl font-bold'><span className='text-green-500'>.</span>شغلني</h1>
            </div>
            <div className='flex flex-row-reverse gap-4'>
            <button>الصفحة الرئيسية</button>
            <button>الأشغال</button>
            <button>المستخدمون</button>
            <button>الصفحات</button>
            <button>اتصل بنا</button>
            </div>
            <div className='flex flex-row-reverse gap-4'>
                <button>كن بائعاً</button>
                <button className='px-3 py-1 rounded-md border border-gray-300'>تسجيل الدخول</button>
                <button className='bg-green-500 text-white px-3 py-1 rounded-md'>إنشاء حساب</button>
            </div>
        </nav>
    </>
  )
}

export default Navbar