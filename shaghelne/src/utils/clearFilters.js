import listingStore from '@/store/listingStore';

/**
 * Utility to clear all filters in the listing store
 */
export const clearAllFilters = () => {
  console.log('Clearing all filters');
  const store = listingStore.getState();
  
  // Get all setter functions from the store
  const {
    setDeliveryTime,
    setLevel,
    setLocation,
    setBestSeller,
    setDesginTool,
    setSpeak,
    setSearch,
    setCategory,
    setProjectType,
    setEnglishLevel,
    setJobType,
    setNoOfEmployee
  } = store;
  
  // Clear all filters by calling each setter with an empty value
  setDeliveryTime([]);
  setLevel([]);
  setLocation([]);
  setBestSeller("best-seller"); // Default value
  setDesginTool([]);
  setSpeak([]);
  setSearch('');
  setCategory([]);
  setProjectType([]);
  setEnglishLevel([]);
  
  // Explicitly clear job types and log for debugging
  console.log('Current job types before clearing:', store.getJobType);
  setJobType([]);
  setTimeout(() => {
    console.log('Job types after clearing:', listingStore.getState().getJobType);
  }, 50);
  
  setNoOfEmployee([]);
  
  console.log('All filters cleared');
};

export default clearAllFilters; 