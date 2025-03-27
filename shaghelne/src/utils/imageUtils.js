/**
 * Utility functions for handling images in the application
 */

// Default fallback images
export const DEFAULT_SERVICE_IMAGE = '/images/listings/g-1.jpg';
export const DEFAULT_AUTHOR_IMAGE = '/images/team/fl-s-1.png';
export const DEFAULT_LOGO_IMAGE = '/images/header-logo.svg';

// Array of service image fallbacks for variety
export const SERVICE_FALLBACK_IMAGES = [
  '/images/listings/g-1.jpg',
  '/images/listings/g-2.jpg',
  '/images/listings/g-3.jpg',
  '/images/listings/g-4.jpg',
  '/images/listings/g-5.jpg',
  '/images/listings/g-6.jpg',
];

/**
 * Get a random service fallback image
 * @returns {string} Random fallback image URL
 */
export const getRandomServiceImage = () => {
  return SERVICE_FALLBACK_IMAGES[Math.floor(Math.random() * SERVICE_FALLBACK_IMAGES.length)];
};

/**
 * Validate and normalize image URL
 * @param {string} url - Image URL to validate
 * @param {string} fallback - Fallback image URL
 * @returns {string} Valid image URL or fallback
 */
export const validateImageUrl = (url, fallback = DEFAULT_SERVICE_IMAGE) => {
  // Return fallback if URL is null, undefined, or empty
  if (!url) return fallback;
  
  // Remove any whitespace
  url = url.trim();
  
  // If it's an empty string after trimming
  if (url === '') return fallback;
  
  // If it's already a valid URL or an absolute path, return it
  if (url.startsWith('http') || url.startsWith('/')) return url;
  
  // Otherwise, make it an absolute path
  return `/${url}`;
};

/**
 * Handle image error by applying fallback
 * @param {Event} event - Error event
 * @param {string} fallback - Fallback image URL
 */
export const handleImageError = (event, fallback = DEFAULT_SERVICE_IMAGE) => {
  console.log('Image failed to load:', event.target.src);
  event.target.src = fallback;
  
  // Add error class to apply CSS styling
  event.target.classList.add('error');
};

/**
 * Handle author image error
 * @param {Event} event - Error event
 */
export const handleAuthorImageError = (event) => {
  console.log('Author image failed to load:', event.target.src);
  event.target.src = DEFAULT_AUTHOR_IMAGE;
  
  // Add error class to apply CSS styling
  event.target.classList.add('error');
  event.target.classList.add('author-img-error');
};

/**
 * Preload images to check if they exist
 * @param {string[]} urls - Array of image URLs
 * @param {Function} onComplete - Callback when all images are loaded or failed
 * @param {Function} onProgress - Optional callback for progress updates
 */
export const preloadImages = (urls, onComplete, onProgress) => {
  let loadedCount = 0;
  const results = {};
  
  // If no URLs, return immediately
  if (!urls || urls.length === 0) {
    onComplete({});
    return;
  }
  
  urls.forEach((url) => {
    const img = new Image();
    
    img.onload = () => {
      loadedCount++;
      results[url] = { success: true, url };
      
      if (onProgress) {
        onProgress(loadedCount, urls.length, url, true);
      }
      
      if (loadedCount === urls.length) {
        onComplete(results);
      }
    };
    
    img.onerror = () => {
      loadedCount++;
      results[url] = { success: false, url };
      
      if (onProgress) {
        onProgress(loadedCount, urls.length, url, false);
      }
      
      if (loadedCount === urls.length) {
        onComplete(results);
      }
    };
    
    // Set src to validated URL
    img.src = validateImageUrl(url);
  });
};

export default {
  DEFAULT_SERVICE_IMAGE,
  DEFAULT_AUTHOR_IMAGE,
  DEFAULT_LOGO_IMAGE,
  SERVICE_FALLBACK_IMAGES,
  getRandomServiceImage,
  validateImageUrl,
  handleImageError,
  handleAuthorImageError,
  preloadImages
}; 