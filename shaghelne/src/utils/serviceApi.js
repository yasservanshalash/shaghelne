import api from './api';

/**
 * Service for handling services-related API calls
 */
class ServiceApi {
  /**
   * Get all services with optional filtering
   * @param {Object} options - Filter options (category, tags, price, etc.)
   * @param {number} page - Page number for pagination
   * @param {number} limit - Number of items per page
   * @returns {Promise} - Promise with services data
   */
  static async getAll(options = {}, page = 0, limit = 10) {
    try {
      // Construct query parameters
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      
      // Add any additional filters
      if (options.category) {
        params.append('category', options.category);
      }
      
      if (options.minPrice) {
        params.append('minPrice', options.minPrice);
      }
      
      if (options.maxPrice) {
        params.append('maxPrice', options.maxPrice);
      }
      
      if (options.tags && options.tags.length > 0) {
        options.tags.forEach(tag => {
          params.append('tags', tag);
        });
      }
      
      // Call the API
      const response = await api.get(`/services?${params.toString()}`);
      
      // Adjust the response structure to match what the components expect
      return this.transformServicesData(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      
      // Return empty data structure for error handling
      return {
        data: [],
        pagination: {
          currentPage: 0,
          totalPages: 0,
          totalItems: 0
        }
      };
    }
  }
  
  /**
   * Get service by ID
   * @param {string} id - Service ID
   * @returns {Promise} - Promise with service data
   */
  static async getById(id) {
    try {
      console.log(`Fetching service with ID: ${id}`);
      
      // Check if the ID is in a valid format (MongoDB ObjectId is typically 24 hex chars)
      // This is just a basic validation, not a comprehensive check
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        console.warn(`ID ${id} does not appear to be a valid MongoDB ObjectId format`);
      }
      
      const response = await api.get(`/services/${id}`);
      console.log('Service data received from API:', response.data);
      
      // If we have data but no _id field, log a warning
      if (response.data && !response.data._id) {
        console.warn('API response is missing _id field:', response.data);
      }
      
      const transformedData = this.transformServiceData(response.data);
      console.log('Transformed service data:', transformedData);
      
      return transformedData;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      
      if (error.response) {
        console.error(`API response status: ${error.response.status}`);
        console.error('API response data:', error.response.data);
        
        // Check if the error is a 404 (service not found)
        if (error.response.status === 404) {
          console.log(`Service with ID ${id} not found in API, trying to find in product1 data`);
        }
      } else if (error.request) {
        console.error('No response received from API', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      
      return null;
    }
  }
  
  /**
   * Get services by user ID
   * @param {string} userId - User ID
   * @param {number} page - Page number for pagination
   * @param {number} limit - Number of items per page
   * @returns {Promise} - Promise with services data
   */
  static async getByUser(userId, page = 0, limit = 10) {
    try {
      const response = await api.get(`/services/user/${userId}?page=${page}&limit=${limit}`);
      return this.transformServicesData(response.data);
    } catch (error) {
      console.error(`Error fetching services for user ${userId}:`, error);
      return {
        data: [],
        pagination: {
          currentPage: 0,
          totalPages: 0,
          totalItems: 0
        }
      };
    }
  }
  
  /**
   * Search services
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @param {number} page - Page number for pagination
   * @param {number} limit - Number of items per page
   * @returns {Promise} - Promise with services data
   */
  static async search(query, filters = {}, page = 0, limit = 10) {
    try {
      // Construct query parameters
      const params = new URLSearchParams();
      params.append('query', query);
      params.append('page', page);
      params.append('limit', limit);
      
      // Add any additional filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value);
          }
        }
      });
      
      const response = await api.get(`/services/search/query?${params.toString()}`);
      return this.transformServicesData(response.data);
    } catch (error) {
      console.error('Error searching services:', error);
      return {
        data: [],
        pagination: {
          currentPage: 0,
          totalPages: 0,
          totalItems: 0
        }
      };
    }
  }
  
  /**
   * Transform MongoDB service data to match the frontend data structure
   * @param {Object} service - Service data from MongoDB
   * @returns {Object} - Transformed service data
   */
  static transformServiceData(service) {
    if (!service) return null;
    
    // Log the raw service data to help with debugging
    console.log('Raw service data to transform:', JSON.stringify(service, null, 2));
    
    // Check if the service has an _id field (MongoDB standard)
    if (!service._id) {
      console.warn('Service data is missing _id field:', service);
    }
    
    // Define a set of fallback images to use randomly for variety
    const fallbackImages = [
      '/images/listings/g-1.jpg',
      '/images/listings/g-2.jpg',
      '/images/listings/g-3.jpg',
      '/images/listings/g-4.jpg',
      '/images/listings/g-5.jpg',
      '/images/listings/g-6.jpg',
    ];
    
    // Get a random fallback image from the array
    const randomFallbackImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    
    // Helper function to ensure image URL is valid
    const validateImageUrl = (url) => {
      // Return a fallback if the URL is null, undefined, or empty
      if (!url) return randomFallbackImage;
      
      // If it's already a valid URL or an absolute path, return it
      if (url.startsWith('http') || url.startsWith('/')) return url;
      
      // Otherwise, make it an absolute path
      return `/${url}`;
    };
    
    // Process images array
    let safeImages = [];
    if (Array.isArray(service.images) && service.images.length > 0) {
      safeImages = service.images
        .filter(img => img) // Filter out null/undefined entries
        .map(validateImageUrl);
    }
    
    // Process gallery array
    let safeGallery = [];
    if (Array.isArray(service.gallery) && service.gallery.length > 0) {
      safeGallery = service.gallery
        .filter(img => img) // Filter out null/undefined entries
        .map(validateImageUrl);
    }
    
    // If no images are available in either images or gallery, create an array with fallback images
    const fallbackGallery = safeImages.length > 0 ? safeImages : 
                           safeGallery.length > 0 ? safeGallery : 
                           [randomFallbackImage, 
                            fallbackImages[(Math.floor(Math.random() * fallbackImages.length) + 1) % fallbackImages.length],
                            fallbackImages[(Math.floor(Math.random() * fallbackImages.length) + 2) % fallbackImages.length]];
    
    // Process author image and information
    let authorImg = '/images/team/fl-s-1.png'; // Default author image
    let authorName = 'Service Provider'; // Default author name
    
    // Handle different author data structures
    if (service.author) {
      if (typeof service.author === 'object') {
        // If author is an object, get the image property
        if (service.author.img) {
          authorImg = validateImageUrl(service.author.img);
        } else if (service.author.profileImage) {
          authorImg = validateImageUrl(service.author.profileImage);
        }
        
        // Get author name
        authorName = service.author.name || authorName;
      } else if (typeof service.author === 'string') {
        // If author is a string, use it as the name
        authorName = service.author;
      }
    } else if (service.userId && typeof service.userId === 'object') {
      // Sometimes the author info is in the userId field
      if (service.userId.profileImage) {
        authorImg = validateImageUrl(service.userId.profileImage);
      }
      authorName = service.userId.name || authorName;
    }
    
    // Return a structure matching the product1 data format
    const transformedData = {
      id: service._id || `generated-${Date.now()}`,
      img: safeImages.length > 0 ? safeImages[0] : randomFallbackImage,
      img2: safeImages.length > 1 ? safeImages[1] : safeImages.length > 0 ? safeImages[0] : randomFallbackImage,
      category: service.subcategory || service.category || 'Uncategorized',
      title: service.title || 'Untitled Service',
      description: service.description || 'No description provided',
      rating: service.rating || 4.5,
      review: service.review || 0,
      author: {
        img: authorImg,
        name: authorName
      },
      price: service.price || 0,
      tag: service.category || 'Uncategorized',
      deliveryTime: service.deliveryTime ? `${service.deliveryTime}${service.deliveryTime === 1 ? 'h' : 'd'}` : '3d',
      level: service.level || 'new',
      location: service.location || 'remote',
      sort: service.sort || 'new-arrivals',
      tool: service.tools && service.tools.length > 0 ? service.tools[0] : 'figma',
      language: service.language || 'english',
      gallery: fallbackGallery,
      images: fallbackGallery,
      features: service.features || [],
      revisions: service.revisions || 3,
      tags: service.tags || [],
      skills: service.skills || [],
      requirements: service.requirements || ''
    };
    
    console.log('Transformed service data:', transformedData);
    return transformedData;
  }
  
  /**
   * Transform multiple services
   * @param {Object} data - Services data from MongoDB
   * @returns {Object} - Transformed services data
   */
  static transformServicesData(data) {
    // Check different possible structures of the response
    let services = [];
    let pagination = {
      currentPage: 0,
      totalPages: 1,
      totalItems: 0
    };
    
    if (Array.isArray(data)) {
      // If data is just an array of services
      services = data;
      pagination.totalItems = data.length;
    } else if (data.data && Array.isArray(data.data)) {
      // If data has a data property with an array of services
      services = data.data;
      pagination = data.pagination || pagination;
    } else if (data.services && Array.isArray(data.services)) {
      // If data has a services property with an array of services
      services = data.services;
      pagination = data.pagination || pagination;
    } else if (data.content && Array.isArray(data.content)) {
      // If data has a content property with an array of services
      services = data.content;
      pagination = {
        currentPage: data.page || 0,
        totalPages: data.totalPages || 1,
        totalItems: data.totalItems || services.length
      };
    }
    
    // Transform each service
    const transformedServices = services.map(service => this.transformServiceData(service));
    
    return {
      data: transformedServices,
      pagination
    };
  }
  
  /**
   * Handle API unavailability by returning fallback data
   * @param {number} count - Number of fallback services to generate
   * @returns {Object} - Fallback services data
   */
  static getFallbackServices(count = 8) {
    const fallbackServices = [];
    const categories = ['Development & IT', 'Design & Creative', 'Digital Marketing', 'Writing & Translation', 'Music & Audio', 'Video & Animation'];
    const levels = ['new', 'lavel-1', 'lavel-2', 'top-rated'];
    const locations = ['united-states', 'united-kingdom', 'canada', 'germany'];
    const sorts = ['best-seller', 'recommended', 'new-arrivals'];
    
    for (let i = 0; i < count; i++) {
      fallbackServices.push({
        id: `fallback-${i + 1}`,
        img: `/images/listings/g-${(i % 12) + 1}.jpg`,
        img2: `/images/listings/g-${((i + 6) % 12) + 1}.jpg`,
        category: 'Web & App Design',
        title: `Fallback Service ${i + 1} - API currently unavailable`,
        rating: 4.5,
        review: 0,
        author: {
          img: '/images/team/fl-s-1.png',
          name: 'Service Provider'
        },
        price: 500 + (i * 100),
        tag: categories[i % categories.length],
        deliveryTime: `${(i % 7) + 1}d`,
        level: levels[i % levels.length],
        location: locations[i % locations.length],
        sort: sorts[i % sorts.length],
        tool: 'figma',
        language: 'english'
      });
    }
    
    return {
      data: fallbackServices,
      pagination: {
        currentPage: 0,
        totalPages: 1,
        totalItems: fallbackServices.length
      }
    };
  }
}

export default ServiceApi; 