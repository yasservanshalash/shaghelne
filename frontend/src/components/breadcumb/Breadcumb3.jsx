export default function Breadcumb3({ path }) {
  return (
    <>
      <section className="py-4 bg-gray-50" dir="rtl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-right">
            <div className="w-full">
              <div className="flex justify-right">
                <div className="flex flex-wrap items-center" dir="rtl">
                  {path?.map((item, i) => (
                    <div key={i} className="flex items-center">
                      <a className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200">{item}</a>
                      {i < path.length - 1 && <span className="mx-2 text-gray-400">/</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
