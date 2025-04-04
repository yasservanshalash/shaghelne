import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer/Footer';
import TabSection1 from '../../components/section/TabSection1';
import Breadcumb3 from '../../components/breadcumb/Breadcumb3';
import Breadcumb4 from '../../components/breadcumb/Breadcumb4';
import Listing1 from '../../components/section/Listing1';
import ListingOption1 from '../../components/element/ListingOption1';
import FilterButton from '../../components/filter/FilterButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import TrendingServiceCard1 from '../../components/card/TrendingServiceCard1';
import { fetchServices } from '../../redux/thunk/servicesThunks';
import { 
  selectFilteredServices, 
  selectServicesLoading, 
  selectServicesError,
  filterServicesByCategory
} from '../../redux/slices/slices/servicesSlice';
import { AppDispatch } from '../../redux/store';
// Import your pagination component here if you have one
// import Pagination from '../../components/common/Pagination';

// Filter type enum to identify which filter is open
type FilterType = 'delivery' | 'budget' | 'level' | 'location' | null;

// Sort options type
type SortOption = 'best_seller' | 'recommended' | 'new_arrivals';

const Services: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector(selectFilteredServices);
  const loading = useSelector(selectServicesLoading);
  const error = useSelector(selectServicesError);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8); // Adjust this value based on your design

  // Track which filter is currently open
  const [openFilter, setOpenFilter] = useState<FilterType>(null);

  // Sort by state
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');

  // Delivery time filter state
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string | null>(null);
  
  // Budget filter state
  const [budgetRange, setBudgetRange] = useState<number>(5000);
  const [initialBudgetRange] = useState<number>(5000); // Save initial value for comparison
  
  // Level filter state
  const [selectedLevels, setSelectedLevels] = useState<{[key: string]: boolean}>({
    topRated: false,
    levelTwo: false,
    levelOne: false,
    newSeller: false
  });
  
  // Location filter state
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // State to track if any filter is applied
  const [isAnyFilterApplied, setIsAnyFilterApplied] = useState<boolean>(false);

  // Fetch services when component mounts
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(services.length / itemsPerPage);
  }, [services, itemsPerPage]);

  // Get current services for the page
  const currentServices = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return services.slice(indexOfFirstItem, indexOfLastItem);
  }, [services, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    // Ensure the page number is within valid range
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    
    setCurrentPage(pageNumber);
    // Scroll to the top of the services section
    window.scrollTo({
      top: document.getElementById('services-grid')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  // Check if any filter is applied or non-default sort is selected
  useEffect(() => {
    const hasDeliveryFilter = selectedDeliveryTime !== null;
    const hasBudgetFilter = budgetRange !== initialBudgetRange;
    const hasLevelFilter = Object.values(selectedLevels).some(value => value);
    const hasLocationFilter = selectedLocation !== "";
    const hasNonDefaultSort = selectedSort !== 'recommended';

    setIsAnyFilterApplied(
      hasDeliveryFilter || 
      hasBudgetFilter || 
      hasLevelFilter || 
      hasLocationFilter || 
      hasNonDefaultSort
    );
  }, [selectedDeliveryTime, budgetRange, selectedLevels, selectedLocation, selectedSort, initialBudgetRange]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [services]);

  // Toggle filter function that closes other filters
  const toggleFilter = (filter: FilterType) => {
    setIsSortDropdownOpen(false); // Close sort dropdown when filter is opened
    if (openFilter === filter) {
      setOpenFilter(null);
    } else {
      setOpenFilter(filter);
    }
  };

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
    setOpenFilter(null); // Close any open filters when sort dropdown is opened
  };

  // Select sort option
  const selectSortOption = (option: SortOption) => {
    setSelectedSort(option);
    setIsSortDropdownOpen(false);
  };

  // Reset all filters and sort options to their defaults
  const clearAllFilters = () => {
    setSelectedDeliveryTime(null);
    setBudgetRange(initialBudgetRange);
    setSelectedLevels({
      topRated: false,
      levelTwo: false,
      levelOne: false,
      newSeller: false
    });
    setSelectedLocation("");
    setSelectedSort('recommended');
    setOpenFilter(null);
    setIsSortDropdownOpen(false);
    // Reset category in Redux store
    dispatch(filterServicesByCategory('all'));
    // Reset pagination
    setCurrentPage(1);
  };

  // Get the sort option display text based on the selected option
  const getSortDisplayText = (option: SortOption): string => {
    switch (option) {
      case 'best_seller':
        return 'الأكثر مبيعًا';
      case 'recommended':
        return 'موصى به';
      case 'new_arrivals':
        return 'وصل حديثًا';
      default:
        return 'موصى به';
    }
  };

  const applyDeliveryFilter = () => {
    // Logic to apply the filter
    console.log("Applying delivery filter:", selectedDeliveryTime);
    setOpenFilter(null);
  };

  const applyBudgetFilter = () => {
    // Logic to apply the budget filter
    console.log("Applying budget filter:", budgetRange);
    setOpenFilter(null);
  };

  const applyLevelFilter = () => {
    // Logic to apply the level filter
    console.log("Applying level filter:", selectedLevels);
    setOpenFilter(null);
  };

  const applyLocationFilter = () => {
    // Logic to apply the location filter
    console.log("Applying location filter:", selectedLocation);
    setOpenFilter(null);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  // Custom pagination component if you don't have one already
  const PaginationComponent = () => {
    // Don't render if there's only one page
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-8" dir="rtl">
        <nav className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-r-md border border-gray-300 ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Previous Page"
          >
            السابق
          </button>
          
          <div className="hidden md:flex">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show correct page numbers when there are many pages
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 border-t border-b border-gray-300 ${
                    currentPage === pageNum
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } ${i === 0 ? '' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <div className="flex md:hidden">
            <span className="px-4 py-2 border-t border-b border-gray-300 bg-white">
              {currentPage} / {totalPages}
            </span>
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-l-md border border-gray-300 ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Next Page"
          >
            التالي
          </button>
        </nav>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
      <TabSection1 />
      <Breadcumb3 path={["الرئيسية", "الخدمات", "تصميم الجرافيك"]} />
      <Breadcumb4 />
      <section className="py-8 px-4 lg:px-8" dir="rtl">
        <div className="flex justify-between items-center container mx-auto mb-4">
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Delivery Time Filter */}
            <FilterButton 
              label="وقت التسليم"
              isOpen={openFilter === 'delivery'}
              onToggle={() => toggleFilter('delivery')}
            >
              <h3 className="font-medium mb-3 text-gray-700">وقت التسليم</h3>
              <div className="space-y-3">
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="deliveryTime" 
                    value="24h" 
                    className="form-radio text-green-600 h-4 w-4" 
                    checked={selectedDeliveryTime === "24h"}
                    onChange={() => setSelectedDeliveryTime("24h")}
                  />
                  <span className="mr-2 text-sm">24 ساعة</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="deliveryTime" 
                    value="3-4days" 
                    className="form-radio text-green-600 h-4 w-4" 
                    checked={selectedDeliveryTime === "3-4days"}
                    onChange={() => setSelectedDeliveryTime("3-4days")}
                  />
                  <span className="mr-2 text-sm">3 إلى 4 أيام</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="deliveryTime" 
                    value="7days+" 
                    className="form-radio text-green-600 h-4 w-4" 
                    checked={selectedDeliveryTime === "7days+"}
                    onChange={() => setSelectedDeliveryTime("7days+")}
                  />
                  <span className="mr-2 text-sm">7 أيام أو أكثر</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="deliveryTime" 
                    value="anytime" 
                    className="form-radio text-green-600 h-4 w-4" 
                    checked={selectedDeliveryTime === "anytime"}
                    onChange={() => setSelectedDeliveryTime("anytime")}
                  />
                  <span className="mr-2 text-sm">في أي وقت</span>
                </label>
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={applyDeliveryFilter}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  تطبيق
                </button>
              </div>
            </FilterButton>

            {/* Budget Filter */}
            <FilterButton 
              label="الميزانية"
              isOpen={openFilter === 'budget'}
              onToggle={() => toggleFilter('budget')}
            >
              <h3 className="font-medium mb-3 text-gray-700">الميزانية</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">0</span>
                  <span className="text-sm font-medium">{budgetRange} $</span>
                  <span className="text-sm">10000</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={applyBudgetFilter}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  تطبيق
                </button>
              </div>
            </FilterButton>

            {/* Level Filter */}
            <FilterButton 
              label="مستوى البائع"
              isOpen={openFilter === 'level'}
              onToggle={() => toggleFilter('level')}
            >
              <h3 className="font-medium mb-3 text-gray-700">مستوى البائع</h3>
              <div className="space-y-3">
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    className="form-checkbox text-green-600 h-4 w-4 rounded" 
                    checked={selectedLevels.topRated}
                    onChange={() => handleLevelChange('topRated')}
                  />
                  <span className="mr-2 text-sm">بائع مميز</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    className="form-checkbox text-green-600 h-4 w-4 rounded" 
                    checked={selectedLevels.levelTwo}
                    onChange={() => handleLevelChange('levelTwo')}
                  />
                  <span className="mr-2 text-sm">المستوى الثاني</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    className="form-checkbox text-green-600 h-4 w-4 rounded" 
                    checked={selectedLevels.levelOne}
                    onChange={() => handleLevelChange('levelOne')}
                  />
                  <span className="mr-2 text-sm">المستوى الأول</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    className="form-checkbox text-green-600 h-4 w-4 rounded" 
                    checked={selectedLevels.newSeller}
                    onChange={() => handleLevelChange('newSeller')}
                  />
                  <span className="mr-2 text-sm">بائع جديد</span>
                </label>
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={applyLevelFilter}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  تطبيق
                </button>
              </div>
            </FilterButton>

            {/* Location Filter */}
            <FilterButton 
              label="الموقع"
              isOpen={openFilter === 'location'}
              onToggle={() => toggleFilter('location')}
            >
              <h3 className="font-medium mb-3 text-gray-700">الموقع</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="البحث عن البلد أو المدينة"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {['السعودية', 'مصر', 'الإمارات', 'الأردن', 'المغرب'].map((location) => (
                    <div 
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`py-1 px-2 rounded cursor-pointer hover:bg-gray-100 ${selectedLocation === location ? 'bg-green-50 text-green-700' : ''}`}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={applyLocationFilter}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  تطبيق
                </button>
              </div>
            </FilterButton>

            {/* Clear Filter Button - Only shown when filters are applied */}
            {isAnyFilterApplied && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} size="sm" />
                <span className="text-sm font-medium">مسح الفلاتر</span>
              </button>
            )}
          </div>
          <div className="relative flex items-center gap-4">
            {/* Sort By Dropdown */}
            <div className="text-sm text-gray-500 mb-2">ترتيب حسب</div>
            <div className="relative">
              <button
                onClick={toggleSortDropdown}
                className="flex items-center justify-between w-44 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                aria-expanded={isSortDropdownOpen}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{getSortDisplayText(selectedSort)}</span>
                </div>
                <FontAwesomeIcon 
                  icon={isSortDropdownOpen ? faChevronUp : faChevronDown} 
                  className="text-gray-400" 
                  size="sm" 
                />
              </button>
              
              {isSortDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-10 py-1 border border-gray-200">
                  <button
                    className={`w-full text-right px-4 py-2 text-sm ${selectedSort === 'recommended' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
                    onClick={() => selectSortOption('recommended')}
                  >
                    موصى به
                  </button>
                  <button
                    className={`w-full text-right px-4 py-2 text-sm ${selectedSort === 'best_seller' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
                    onClick={() => selectSortOption('best_seller')}
                  >
                    الأكثر مبيعًا
                  </button>
                  <button
                    className={`w-full text-right px-4 py-2 text-sm ${selectedSort === 'new_arrivals' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
                    onClick={() => selectSortOption('new_arrivals')}
                  >
                    وصل حديثًا
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-grid" className="container mx-auto px-4 py-8" dir="rtl">
        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل الخدمات...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-auto max-w-2xl text-center">
            <p>حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى.</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">لا توجد خدمات متاحة حاليًا</p>
            <p className="text-gray-500">يرجى تغيير معايير البحث أو المحاولة مرة أخرى لاحقًا.</p>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentServices.map((service) => (
                <TrendingServiceCard1 key={service.id} service={service} />
              ))}
            </div>
            
            {/* Pagination */}
            <PaginationComponent />
            {/* If you have an existing pagination component, use it like this: */}
            {/* <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Services