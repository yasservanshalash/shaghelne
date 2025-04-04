import { product1 } from "../../../data/product";
import MostViewServiceCard1 from "../card/MostViewServiceCard1";
import DoughnutChart from "../chart/DoughnutChart";
import LineChart from "../chart/LineChart";
import DashboardNavigation from "../header/DashboardNavigation";
import RecentServiceCard1 from "../card/RecentServiceCard1";
import { job1 } from "../../../data/job";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileContract, 
  faCheckCircle, 
  faListCheck, 
  faStar, 
  faGenderless 
} from '@fortawesome/free-solid-svg-icons';

export default function DashboardInfo() {
  return (
    <div className="w-full">
      {/* Dashboard header */}
      <div className="mb-10">
        <div className="w-full mb-6">
          <DashboardNavigation />
        </div>
        <div className="w-full">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">لوحة التحكم</h2>
            <p className="text-gray-600 mt-1">نظرة عامة على نشاطك والإحصائيات</p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {/* Services Offered */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-between stats-card">
          <div>
            <div className="text-sm text-gray-600">الخدمات المقدمة</div>
            <div className="text-2xl font-bold text-gray-800 my-1">25</div>
            <div className="text-xs text-gray-500">
              <span className="text-blue-600 font-medium">10</span> عروض جديدة
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <FontAwesomeIcon icon={faFileContract} className="text-xl" />
          </div>
        </div>

        {/* Completed Services */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-between stats-card">
          <div>
            <div className="text-sm text-gray-600">الخدمات المكتملة</div>
            <div className="text-2xl font-bold text-gray-800 my-1">1292</div>
            <div className="text-xs text-gray-500">
              <span className="text-blue-600 font-medium">80+</span> اكتمال جديد
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
          </div>
        </div>

        {/* In Queue Services */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-between stats-card">
          <div>
            <div className="text-sm text-gray-600">الخدمات في الانتظار</div>
            <div className="text-2xl font-bold text-gray-800 my-1">182</div>
            <div className="text-xs text-gray-500">
              <span className="text-blue-600 font-medium">35+</span> انتظار جديد
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <FontAwesomeIcon icon={faListCheck} className="text-xl" />
          </div>
        </div>

        {/* Total Review */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-between stats-card">
          <div>
            <div className="text-sm text-gray-600">إجمالي التقييمات</div>
            <div className="text-2xl font-bold text-gray-800 my-1">22,786</div>
            <div className="text-xs text-gray-500">
              <span className="text-blue-600 font-medium">290+</span> تقييم جديد
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <FontAwesomeIcon icon={faStar} className="text-xl" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        <div className="xl:col-span-8">
          <LineChart />
        </div>
        <div className="xl:col-span-4">
          <DoughnutChart />
        </div>
      </div>

      {/* Information Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Most Viewed Services */}
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-5">
            <h5 className="text-lg font-medium text-gray-800">الخدمات الأكثر مشاهدة</h5>
            <a className="text-blue-600 underline text-sm hover:text-blue-800">مشاهدة الكل</a>
          </div>
          <div>
            {product1.slice(0, 3).map((item, i) => (
              <div key={i}>
                <MostViewServiceCard1 data={item} />
                {product1.slice(0, 3).length !== i + 1 && (
                  <hr className="my-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Purchased Services */}
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-5">
            <h5 className="text-lg font-medium text-gray-800">الخدمات المشتراة مؤخرًا</h5>
            <a className="text-blue-600 underline text-sm hover:text-blue-800">مشاهدة الكل</a>
          </div>
          <div>
            {job1.slice(0, 3).map((item, i) => (
              <div key={i}>
                <RecentServiceCard1 data={item} />
                {product1.slice(0, 3).length !== i + 1 && (
                  <hr className="my-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
          <div className="border-b border-gray-200 pb-4 mb-5">
            <h5 className="text-lg font-medium text-gray-800">النشاط الأخير</h5>
          </div>

          {/* Timeline Items */}
          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex">
              <div className="text-gray-500 text-sm w-16">08:42</div>
              <div className="relative flex items-start mr-3">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-3 mt-1.5"></div>
                <div className="mr-2">
                  <span className="block text-sm font-medium text-gray-800">شراء بواسطة علي برايس</span>
                  <span className="block text-sm text-gray-500 mt-1">منتج ساعة ذكية متطورة</span>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex">
              <div className="text-gray-500 text-sm w-16">14:37</div>
              <div className="relative flex items-start mr-3">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-3 mt-1.5"></div>
                <div className="mr-2">
                  <span className="block text-sm font-medium text-gray-800">
                    إيداع <span className="text-blue-600 font-medium">700 دولار</span> إلى TFN
                  </span>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex">
              <div className="text-gray-500 text-sm w-16">16:50</div>
              <div className="relative flex items-start mr-3">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-3 mt-1.5"></div>
                <div className="mr-2">
                  <span className="block text-sm font-medium text-gray-800">ناتاشا كاري أعجبت بالمنتجات</span>
                  <span className="block text-sm text-gray-500 mt-1">تسمح للمستخدمين بالإعجاب بالمنتجات في متجرك.</span>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex">
              <div className="text-gray-500 text-sm w-16">21:03</div>
              <div className="relative flex items-start mr-3">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-3 mt-1.5"></div>
                <div className="mr-2">
                  <span className="block text-sm font-medium text-gray-800">منتج مفضل</span>
                  <span className="block text-sm text-gray-500 mt-1">إستر جيمس فضلت المنتج.</span>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex">
              <div className="text-gray-500 text-sm w-16">23:07</div>
              <div className="relative flex items-start mr-3">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-3 mt-1.5"></div>
                <div className="mr-2">
                  <span className="block text-sm font-medium text-gray-800">عروض اليوم من ديجيتيك جالاكسي</span>
                  <span className="block text-sm text-gray-500 mt-1">العرض ساري على طلبات 500 ريال وما فوق للمنتجات المختارة فقط.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
