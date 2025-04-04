import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faStarHalfAlt, 
  faUser,
  faCalendarAlt,
  faComment
} from '@fortawesome/free-solid-svg-icons';

const ReviewsDashboard = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.user);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      clientName: 'أحمد محمد',
      clientAvatar: '',
      rating: 5,
      comment: 'ممتاز جدًا، تم إنجاز العمل باحترافية وجودة عالية.',
      date: '2024-03-28',
      project: 'تصميم موقع ويب'
    },
    {
      id: 2,
      clientName: 'سارة علي',
      clientAvatar: '',
      rating: 4,
      comment: 'عمل رائع، التزام بالوقت المحدد. أتمنى المزيد من التفاصيل في المستقبل.',
      date: '2024-03-20',
      project: 'تطوير تطبيق موبايل'
    },
    {
      id: 3,
      clientName: 'محمد خالد',
      clientAvatar: '',
      rating: 5,
      comment: 'تجربة ممتازة، سرعة في التنفيذ وجودة عالية.',
      date: '2024-03-15',
      project: 'تصميم هوية بصرية'
    },
    {
      id: 4,
      clientName: 'فاطمة أحمد',
      clientAvatar: '',
      rating: 3.5,
      comment: 'عمل جيد، لكن كان هناك بعض التأخير في التسليم.',
      date: '2024-03-10',
      project: 'خدمات ترجمة'
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-400" />
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300" />
      );
    }

    return stars;
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  // Count reviews by rating
  const ratingCounts = {
    5: reviews.filter(review => Math.floor(review.rating) === 5).length,
    4: reviews.filter(review => Math.floor(review.rating) === 4).length,
    3: reviews.filter(review => Math.floor(review.rating) === 3).length,
    2: reviews.filter(review => Math.floor(review.rating) === 2).length,
    1: reviews.filter(review => Math.floor(review.rating) === 1).length,
  };

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">المراجعات</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">مراجعات العملاء والتقييمات</p>
        </div>
      </div>

      {/* Rating summary */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">ملخص التقييمات</h3>
        </div>
        <div className="border-t border-gray-200 p-6">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center mb-6 md:mb-0 md:w-1/4">
              <div className="text-5xl font-bold text-gray-900">{averageRating}</div>
              <div className="flex mt-2">
                {renderStars(parseFloat(averageRating))}
              </div>
              <div className="text-sm text-gray-500 mt-1">{reviews.length} تقييم</div>
            </div>
            
            <div className="md:w-3/4 md:mr-8">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center mt-2">
                  <div className="text-sm text-gray-600 w-10">{rating} <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" /></div>
                  <div className="w-full bg-gray-200 h-2 mx-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-yellow-400 h-full rounded-full" 
                      style={{ width: `${reviews.length ? (ratingCounts[rating] / reviews.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 w-10">{ratingCounts[rating]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">جميع المراجعات</h3>
          <div className="ml-2">
            <select className="mt-1 block pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>الأحدث أولاً</option>
              <option>الأقدم أولاً</option>
              <option>التقييم: من الأعلى إلى الأدنى</option>
              <option>التقييم: من الأدنى إلى الأعلى</option>
            </select>
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          {reviews.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {review.clientAvatar ? (
                          <img 
                            className="h-10 w-10 rounded-full"
                            src={review.clientAvatar}
                            alt={review.clientName}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="mr-4">
                        <h4 className="text-sm font-medium text-gray-900">{review.clientName}</h4>
                        <div className="mt-1 flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="ml-1" />
                      {review.date}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      <FontAwesomeIcon icon={faComment} className="ml-2 text-blue-500" />
                      التعليق:
                    </div>
                    <p className="text-sm text-gray-500">{review.comment}</p>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    المشروع: {review.project}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <FontAwesomeIcon icon={faStar} className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد مراجعات</h3>
              <p className="mt-1 text-sm text-gray-500">تظهر مراجعات العملاء هنا بعد إكمال المشاريع.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReviewsDashboard;
