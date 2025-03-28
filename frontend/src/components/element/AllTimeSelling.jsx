import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faUsers, faLock, faHeadset } from '@fortawesome/free-solid-svg-icons';

export default function AllTimeSelling() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transform transition-transform duration-500 animate-fadeIn" style={{ direction: 'rtl' }}>
        <div className="bg-white p-6 rounded-lg">
          <div className="flex flex-col">
            <div className="mb-4 text-green-400 ml-4">
              <FontAwesomeIcon icon={faClipboardList} className="text-4xl" />
            </div>
            <div className="text-right">
              <h4 className="text-xl font-semibold mb-2">انشر وظيفة</h4>
              <p className="text-gray-600">
                من السهل والمجاني نشر وظيفة. فقط قم بملء العنوان والوصف.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg">
          <div className="flex flex-col">
            <div className="mb-4 text-green-400 ml-4">
              <FontAwesomeIcon icon={faUsers} className="text-4xl" />
            </div>
            <div className="text-right">
              <h4 className="text-xl font-semibold mb-2">اختر المستقلين</h4>
              <p className="text-gray-600">
                يمكنك اختيار المستقلين المناسبين بناءً على مهاراتهم وتقييماتهم.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg">
          <div className="flex flex-col">
            <div className="mb-4 text-green-400 ml-4">
              <FontAwesomeIcon icon={faLock} className="text-4xl" />
            </div>
            <div className="text-right">
              <h4 className="text-xl font-semibold mb-2">ادفع بأمان</h4>
              <p className="text-gray-600">
                استخدم نظام الدفع الآمن لدينا واحصل على الخدمة التي تريدها.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg">
          <div className="flex flex-col">
            <div className="mb-4 text-green-400 ml-4">
              <FontAwesomeIcon icon={faHeadset} className="text-4xl" />
            </div>
            <div className="text-right">
              <h4 className="text-xl font-semibold mb-2">نحن هنا للمساعدة</h4>
              <p className="text-gray-600">
                فريق الدعم متاح على مدار الساعة لمساعدتك في أي استفسار.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
