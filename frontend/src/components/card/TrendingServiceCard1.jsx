import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const TrendingServiceCard1 = ({ service }) => {
  const navigate = useNavigate();

  // Handle click on a service card
  const handleServiceClick = () => {
    if (service && service.id) {
      navigate(`/service-details/${service.id}`);
    }
  };

  // If no service data is provided, show a placeholder or loading state
  if (!service) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 h-72 flex items-center justify-center">
        <p className="text-gray-500">لا توجد بيانات متاحة</p>
      </div>
    );
  }

  // Calculate random width for the rating bar (for visual interest)
  const ratingBarWidth = Math.floor(70 + Math.random() * 30); // Between 70-100%

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
      onClick={handleServiceClick}
    >
      {/* Service Image */}
      <div className="relative">
        <img 
          src={service.imageUrl || `https://picsum.photos/seed/${service.id || 'default'}/300/300`} 
          alt={service.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://picsum.photos/seed/fallback/500/300`;
          }}
        />
        <div className="absolute top-0 left-0 bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-1 text-xs font-medium rounded-br-lg">
          {service.category}
        </div>
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white px-3 py-1 text-xs rounded-tl-lg flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-1" />
          <span>{service.deliveryTime || '24h'}</span>
        </div>
      </div>
      
      {/* Service Details */}
      <div className="p-4" dir="rtl">
        {/* Title & Description */}
        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1 hover:text-green-600 transition-colors">{service.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        
        {/* Location */}
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-1" />
          <span>{service.location || 'عن بعد'}</span>
        </div>

        {/* Ratings */}
        <div className="mb-4">
          <div className="flex items-center mb-1">
            <div className="flex items-center text-yellow-400 mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon 
                  key={star} 
                  icon={faStar} 
                  className={`text-sm ${star <= Math.round(service.sellerRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-700">{service.sellerRating || 4.5}</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full w-full">
            <div 
              className="h-1 bg-yellow-400 rounded-full" 
              style={{ width: `${ratingBarWidth}%` }}
            ></div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-3 border-gray-200" />
        
        {/* Seller Info and Price */}
        <div className="flex items-center justify-between mt-2">
          {/* Seller */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full overflow-hidden mr-2 flex-shrink-0 border-2 border-white shadow">
              {service.sellerImgUrl ? (
                <img 
                  src={service.sellerImgUrl} 
                  alt={service.sellerName} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/seed/${service.sellerName || 'seller'}/200/200`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold">
                  {service.sellerName?.charAt(0) || 'م'}
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">{service.sellerName || 'مستقل'}</div>
              <div className="text-xs text-gray-500">{service.sellerLevel || 'بائع محترف'}</div>
            </div>
          </div>
          
          {/* Price */}
          <div className="text-right">
            <div className="text-xs text-gray-500">تبدأ من</div>
            <div className="text-green-600 font-bold text-xl">${service.price || 5}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingServiceCard1;
