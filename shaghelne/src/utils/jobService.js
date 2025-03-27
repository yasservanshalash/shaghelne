import api from './api';
import { API_URL } from './api';
const API_BASE_URL = API_URL;

// Common job type mapping used in multiple methods
const JOB_TYPE_MAP = {
  'FULL_TIME': 'Full Time',
  'PART_TIME': 'Part Time',
  'CONTRACT': 'Contract',
  'FREELANCE': 'Freelance',
  'INTERNSHIP': 'Internship',
  'TEMPORARY': 'Temporary'
};

// Default pagination object used in multiple error handling cases
const DEFAULT_PAGINATION = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  pageSize: 10
};

/**
 * Service for handling job-related API calls
 */
class JobService {
  /**
   * Creates URL parameters from options object
   * @param {Object} options - Filter and pagination options
   * @returns {URLSearchParams} - URL search params object
   */
  static createParams(options = {}) {
    const params = new URLSearchParams();
    
    // Handle pagination
    params.append('page', options.page || 0);
    params.append('limit', options.limit || 10);
    
    // Handle category filter
    if (options.category && options.category.length > 0) {
      options.category.forEach(cat => {
        params.append('category', cat);
      });
    }
    
    // Handle salary/budget filters with multiple possible parameter names
    // Important: Convert to Number and check for NaN to avoid string comparison issues
    if (options.minSalary !== undefined && options.minSalary !== null) {
      const minSalaryValue = Number(options.minSalary);
      if (!isNaN(minSalaryValue) && minSalaryValue > 0) {
        console.log('Adding minSalary filter:', minSalaryValue);
        // Try all common parameter names to increase compatibility with various backends
        params.append('minBudget', minSalaryValue);
        params.append('min_salary', minSalaryValue);
        params.append('minSalary', minSalaryValue);
        params.append('min_budget', minSalaryValue);
        params.append('budget_min', minSalaryValue);
        params.append('salary_min', minSalaryValue);
      } else {
        console.log('Skipping invalid minSalary value:', options.minSalary);
      }
    }
    
    if (options.maxSalary !== undefined && options.maxSalary !== null) {
      const maxSalaryValue = Number(options.maxSalary);
      if (!isNaN(maxSalaryValue)) {
        console.log('Adding maxSalary filter:', maxSalaryValue);
        // Try all common parameter names to increase compatibility with various backends
        params.append('maxBudget', maxSalaryValue);
        params.append('max_salary', maxSalaryValue);
        params.append('maxSalary', maxSalaryValue);
        params.append('max_budget', maxSalaryValue);
        params.append('budget_max', maxSalaryValue);
        params.append('salary_max', maxSalaryValue);
      } else {
        console.log('Skipping invalid maxSalary value:', options.maxSalary);
      }
    }
    
    // Handle job types
    if (options.jobType && options.jobType.length > 0) {
      // Extract backend job type values
      const backendJobTypes = this.processJobTypeFilters(options.jobType);
      
      // Add job types in multiple formats for compatibility
      params.append('jobTypes', backendJobTypes.join(','));
      
      backendJobTypes.forEach(type => {
        params.append('jobType', type);
        params.append('job_type', type);
        params.append('type', type);
      });
    }
    
    // Add any additional parameters
    if (options.query) params.append('query', options.query);
    
    return params;
  }
  
  /**
   * Process job type filters to extract backend format values
   * @param {Array} jobTypes - Array of job type values in various formats
   * @returns {Array} - Array of backend format job type values
   */
  static processJobTypeFilters(jobTypes) {
    return jobTypes.map(type => {
      if (typeof type === 'object' && type.backend) {
        return type.backend;
      } else if (typeof type === 'object' && type.display) {
        return this.getBackendJobType(type.display);
      } else if (typeof type === 'string') {
        return this.getBackendJobType(type);
      }
      return String(type);
    });
  }
  
  /**
   * Extract jobs array from various response formats
   * @param {Object|Array} data - Response data in various formats
   * @returns {Array} - Extracted jobs array
   */
  static extractJobsArray(data) {
    if (!data) return [];
    
    // Handle paginated response with content array
    if (data.content && Array.isArray(data.content)) {
      return data.content;
    }
    
    // Handle paginated response with jobs array
    if (data.jobs && Array.isArray(data.jobs)) {
      return data.jobs;
    }
    
    // Handle standard array
    if (Array.isArray(data)) {
      return data;
    }
    
    // Handle single job object
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
      return [data];
    }
    
    return [];
  }
  
  /**
   * Extract pagination info from response
   * @param {Object} data - Response data
   * @param {number} defaultTotal - Default total items
   * @returns {Object} - Pagination info object
   */
  static extractPagination(data, defaultTotal = 0) {
    if (!data) return { ...DEFAULT_PAGINATION };
    
    return {
      currentPage: data.page || 0,
      totalPages: data.totalPages || 1,
      totalItems: data.totalItems || defaultTotal,
      pageSize: data.size || 10
    };
  }
  
  /**
   * Check if the API is available and verify specific endpoints
   * @returns {Promise<Object>} - Connection status and diagnostics
   */
  static async checkConnection() {
    try {
      console.log('Running API connection diagnostics...');
      
      // First check if the base API is reachable
      try {
        const diagnostics = await api.diagnoseConnection();
        console.log('API connection diagnostics complete:', diagnostics);
        
        // Test direct job fetch with a simple query
        try {
          console.log('Testing direct job fetch with limited results...');
          const testUrl = `${API_BASE_URL}/jobs?limit=1`;
          console.log('Test URL:', testUrl);
          
          const response = await fetch(testUrl);
          
          if (!response.ok) {
            throw new Error(`API returned status: ${response.status} (${response.statusText})`);
          }
          
          const data = await response.json();
          console.log('Sample data received:', data);
          
          // Test job type filtering
          let jobTypeFilterTest = await this.testJobTypeFiltering();
          
          return {
            available: true,
            endpoints: {
              jobs: {
                available: true,
                status: response.status,
                sample: data ? 'Data received' : 'No data'
              },
              jobTypeFilter: jobTypeFilterTest
            },
            baseUrl: API_BASE_URL
          };
        } catch (fetchError) {
          console.error('Direct fetch failed:', fetchError);
          return {
            available: false,
            endpoints: {
              jobs: {
                available: false,
                error: fetchError.message
              }
            },
            baseUrl: API_BASE_URL,
            error: `Failed to fetch jobs: ${fetchError.message}`
          };
        }
      } catch (diagnosticError) {
        console.error('API diagnostics error:', diagnosticError);
        return this.createErrorResponse(diagnosticError, 'Diagnostics error');
      }
    } catch (error) {
      console.error('Error running API diagnostics:', error);
      return this.createErrorResponse(error);
    }
  }
  
  /**
   * Test job type filtering capability
   * @returns {Promise<Object>} - Job type filter test results
   */
  static async testJobTypeFiltering() {
    try {
      console.log('Testing job type filtering...');
      const testJobTypeUrl = `${API_BASE_URL}/jobs?jobType=FULL_TIME&limit=1`;
      console.log('Job type filter test URL:', testJobTypeUrl);
      
      const jobTypeResponse = await fetch(testJobTypeUrl);
      if (jobTypeResponse.ok) {
        const jobTypeData = await jobTypeResponse.json();
        console.log('Job type filter test data:', jobTypeData);
        
        const jobsArray = this.extractJobsArray(jobTypeData);
        
        return {
          status: jobTypeResponse.status,
          ok: true,
          resultsReturned: jobsArray.length
        };
      } else {
        return {
          status: jobTypeResponse.status,
          ok: false,
          statusText: jobTypeResponse.statusText
        };
      }
    } catch (filterError) {
      console.error('Job type filter test failed:', filterError);
      return {
        ok: false,
        error: filterError.message
      };
    }
  }
  
  /**
   * Create standard error response object
   * @param {Error} error - Error object
   * @param {string} prefix - Optional prefix for error message
   * @returns {Object} - Standardized error response
   */
  static createErrorResponse(error, prefix = '') {
    return {
      available: false,
      error: prefix ? `${prefix}: ${error.message}` : error.message,
      baseUrl: API_BASE_URL
    };
  }

  /**
   * Get all jobs with optional filtering and pagination
   * @param {Object} options - Filter and pagination options
   * @returns {Promise} - Promise with jobs data and pagination
   */
  static async getAllJobs(options = {}) {
    try {
      console.log("Fetching jobs with options:", options);
      const params = this.createParams(options);
      
      // Build the URL
      let url = `${API_BASE_URL}/jobs`;
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log("API Request URL:", url);
      
      // Check if API was previously marked as unavailable
      const storedApiAvailability = localStorage.getItem('api_available');
      if (storedApiAvailability === 'false') {
        console.log('API was previously marked as unavailable. Using fake data.');
        return this.generateFakeJobs(options.limit || 10, options);
      }
      
      // Try fetching data - first with axios, then with fetch as fallback
      try {
        const response = await api.get(`/jobs?${params.toString()}`);
        console.log("API Response via axios:", response.data);
        
        localStorage.setItem('api_available', 'true');
        
        const jobsArray = this.extractJobsArray(response.data);
        
        return {
          data: this.transformJobsData(jobsArray),
          pagination: this.extractPagination(response.data, jobsArray.length)
        };
      } catch (axiosError) {
        console.error("Axios request failed, trying with fetch:", axiosError.message);
        
        try {
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`API error with status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("API Response via fetch:", data);
          
          localStorage.setItem('api_available', 'true');
          
          const jobsArray = this.extractJobsArray(data);
          
          return {
            data: this.transformJobsData(jobsArray),
            pagination: this.extractPagination(data, jobsArray.length)
          };
        } catch (fetchError) {
          return this.handleFetchFailure(fetchError, options);
        }
      }
    } catch (error) {
      return this.handleFetchFailure(error, options);
    }
  }
  
  /**
   * Handle fetch failure by using fake data
   * @param {Error} error - Error that occurred
   * @param {Object} options - Original options for generating fake data
   * @returns {Object} - Fake data response
   */
  static handleFetchFailure(error, options = {}) {
    console.error("Fetch failed:", error.message);
    localStorage.setItem('api_available', 'false');
    console.log('Using fake data instead.');
    return this.generateFakeJobs(options.limit || 10, options);
  }

  /**
   * Get job by ID
   * @param {string} jobId - Job ID
   * @returns {Promise} - Promise with job data
   */
  static async getJobById(jobId) {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      return this.transformJobData(response.data);
    } catch (error) {
      console.error(`Error fetching job ${jobId}:`, error);
      throw error;
    }
  }

  /**
   * Search jobs
   * @param {Object} criteria - Search criteria
   * @returns {Promise} - Promise with jobs data
   */
  static async searchJobs(criteria = {}) {
    try {
      const params = this.createParams(criteria);
      
      const url = `/jobs/search/query${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await api.get(url);
      
      const jobsArray = this.extractJobsArray(response.data);
      
      return {
        data: this.transformJobsData(jobsArray),
        pagination: response.data.pagination || this.extractPagination(response.data, jobsArray.length)
      };
    } catch (error) {
      console.error('Error searching jobs:', error);
      
      return {
        data: [],
        pagination: { ...DEFAULT_PAGINATION },
        error: error.message || 'Failed to search jobs'
      };
    }
  }

  /**
   * Transform backend job data to match frontend data structure
   * @param {Object} job - Backend job data
   * @returns {Object} - Transformed job data for frontend
   */
  static transformJobData(job) {
    if (!job) return null;
    
    try {
      // Create a safe base object with default values
      return {
        id: job._id || job.id || `job-${Math.random().toString(36).substring(2, 9)}`,
        title: job.title || 'Job Title Not Available',
        description: job.description || 'No description available',
        salary: job.salary || job.budget || 0,
        jobType: this.formatJobType(job.jobType || job.type),
        location: job.location || { city: 'Remote' },
        category: job.category || 'Uncategorized',
        subcategory: job.subcategory || '',
        img: job.company?.logo || job.img || '/images/team/client-1.png',
        server: job.company?.name || job.server || 'Company',
        company: job.company || {},
        level: job.level || '',
        benefits: [
          `$${job.salary || job.budget || '0'}`,
          this.formatJobType(job.jobType || job.type),
          job.category || 'Uncategorized',
          job.location?.city || 'Remote'
        ],
        requirements: job.requirements || [],
        createdAt: job.createdAt || new Date().toISOString(),
        updatedAt: job.updatedAt || new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error transforming job data:", error);
      
      // Return a minimal valid job object
      return {
        id: `error-${Math.random().toString(36).substring(2, 9)}`,
        title: 'Error Loading Job',
        description: 'There was an error loading this job data.',
        salary: 0,
        jobType: 'Unknown',
        location: { city: 'Unknown' },
        category: 'Error',
        img: '/images/team/client-1.png',
        server: 'Error',
        benefits: ['Error Loading Job'],
        requirements: [],
      };
    }
  }

  /**
   * Transform array of backend job data to match frontend data structure
   * @param {Array} jobs - Array of backend job data
   * @returns {Array} - Transformed jobs data for frontend
   */
  static transformJobsData(jobs) {
    if (!jobs || !jobs.length) return [];
    return jobs.map(job => this.transformJobData(job));
  }

  /**
   * Format job type for display
   * @param {string} jobType - Backend job type enum
   * @returns {string} - Formatted job type
   */
  static formatJobType(jobType) {
    if (!jobType) return 'Full Time';
    
    // If it's an array, use the first value
    if (Array.isArray(jobType)) {
      jobType = jobType[0];
    }
    
    // Convert to string if not already
    const jobTypeStr = String(jobType);
    
    // Check for exact match in map
    if (JOB_TYPE_MAP[jobTypeStr]) {
      return JOB_TYPE_MAP[jobTypeStr];
    }
    
    // Check for uppercase version
    const uppercaseType = jobTypeStr.toUpperCase();
    if (JOB_TYPE_MAP[uppercaseType]) {
      return JOB_TYPE_MAP[uppercaseType];
    }
    
    // Check if it's already in a display format (has spaces, properly capitalized)
    if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(jobTypeStr)) {
      return jobTypeStr; // Already properly formatted
    }
    
    // Try to convert from enum format to display format
    if (/^[A-Z_]+$/.test(jobTypeStr)) {
      return jobTypeStr
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    return jobTypeStr;
  }

  /**
   * Extract unique values from jobs array
   * @param {Array} jobsArray - Array of job objects
   * @param {string} field - Field to extract values from
   * @param {Function} formatter - Optional formatter function
   * @returns {Map} - Map of unique values and their counts
   */
  static extractUniqueValues(jobsArray, field, formatter = (v) => v) {
    const valuesMap = new Map();
    
    jobsArray.forEach(job => {
      if (job[field]) {
        const value = formatter(job[field]);
        if (valuesMap.has(value)) {
          valuesMap.set(value, valuesMap.get(value) + 1);
        } else {
          valuesMap.set(value, 1);
        }
      }
    });
    
    return valuesMap;
  }
  
  /**
   * Convert map of values to array format for UI
   * @param {Map} valuesMap - Map of values and counts
   * @returns {Array} - Array of objects with id, title, and total
   */
  static mapToUIArray(valuesMap) {
    return Array.from(valuesMap.entries()).map(([title, count]) => ({
      id: Math.random().toString(36).substr(2, 9),
      title,
      total: count
    }));
  }

  /**
   * Get all categories from jobs data
   * @returns {Promise} - Promise with categories data
   */
  static async getAllCategories() {
    try {
      console.log('Attempting to fetch categories from jobs data');
      
      const response = await api.get('/jobs', { 
        params: { limit: 100 },
        timeout: 10000
      });
      
      const jobsArray = this.extractJobsArray(response.data);
      if (jobsArray.length === 0) {
        throw new Error('Invalid job data format received from server');
      }
      
      const categoriesMap = this.extractUniqueValues(jobsArray, 'category');
      const categories = this.mapToUIArray(categoriesMap);
      
      console.log(`Successfully extracted ${categories.length} unique categories`);
      return categories;
    } catch (error) {
      this.logNetworkError(error, 'Error fetching categories');
      throw error;
    }
  }

  /**
   * Get all job types from jobs data
   * @returns {Promise} - Promise with job types data
   */
  static async getAllJobTypes() {
    try {
      console.log('Attempting to fetch job types from jobs data');
      
      const response = await api.get('/jobs', { 
        params: { limit: 100 },
        timeout: 10000
      });
      
      const jobsArray = this.extractJobsArray(response.data);
      if (jobsArray.length === 0) {
        throw new Error('Invalid job data format received from server');
      }
      
      const jobTypesMap = this.extractUniqueValues(
        jobsArray, 
        'jobType', 
        value => this.formatJobType(value)
      );
      
      const jobTypes = this.mapToUIArray(jobTypesMap);
      
      console.log(`Successfully extracted ${jobTypes.length} unique job types`);
      return jobTypes;
    } catch (error) {
      this.logNetworkError(error, 'Error fetching job types');
      throw error;
    }
  }
  
  /**
   * Log specific network error types with additional context
   * @param {Error} error - The error object
   * @param {string} context - The context in which the error occurred
   */
  static logNetworkError(error, context = 'API request') {
    console.error(`${context}:`, error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('API request timed out. The server may be slow or unresponsive.');
    }
    
    if (error.message.includes('Network Error')) {
      console.error('Network error. The API server may be down or unreachable.');
    }
  }

  /**
   * Test API filter parameters directly (for debugging)
   * @param {Object} filterParams - Raw filter parameters to test
   * @returns {Promise} - Promise with API response data
   */
  static async testFilters(filterParams = {}) {
    try {
      console.log('Testing filter parameters directly:', filterParams);
      
      const params = new URLSearchParams();
      
      // Add all parameters directly
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params.append(key, value);
        }
      });
      
      // Add a limit to avoid fetching too many results
      if (!params.has('limit')) {
        params.append('limit', 10);
      }
      
      const url = `/jobs${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Direct filter test URL:', url);
      
      // Add specific tests for salary filters as these are often problematic
      if (filterParams.minSalary !== undefined || filterParams.maxSalary !== undefined) {
        console.log('Testing salary filters specifically...');
        
        // Test with different salary parameter combinations
        const salaryTests = [];
        
        if (filterParams.minSalary !== undefined) {
          const minVal = Number(filterParams.minSalary);
          
          // Test with just minSalary using different parameter names
          salaryTests.push(
            this.singleParamSalaryTest('minSalary', minVal),
            this.singleParamSalaryTest('min_salary', minVal),
            this.singleParamSalaryTest('minBudget', minVal),
            this.singleParamSalaryTest('min_budget', minVal)
          );
        }
        
        if (filterParams.maxSalary !== undefined) {
          const maxVal = Number(filterParams.maxSalary);
          
          // Test with just maxSalary using different parameter names
          salaryTests.push(
            this.singleParamSalaryTest('maxSalary', maxVal),
            this.singleParamSalaryTest('max_salary', maxVal),
            this.singleParamSalaryTest('maxBudget', maxVal),
            this.singleParamSalaryTest('max_budget', maxVal)
          );
        }
        
        // Combine min and max test results
        const salaryTestResults = await Promise.all(salaryTests.map(p => p.catch(e => ({ 
          error: e.message,
          success: false 
        }))));
        
        console.log('Salary parameter test results:', salaryTestResults);
      }
      
      const response = await api.get(url);
      console.log('Filter test response:', response.data);
      
      return {
        success: true,
        data: response.data,
        url: url,
        params: filterParams
      };
    } catch (error) {
      console.error('Error testing filters:', error);
      
      return {
        success: false,
        error: error.message,
        url: error.config?.url,
        params: filterParams
      };
    }
  }
  
  /**
   * Test a single salary parameter for backend compatibility
   * @param {string} paramName - Name of the parameter to test
   * @param {number} value - Salary value to test
   * @returns {Promise} - Test result promise
   * @private
   */
  static async singleParamSalaryTest(paramName, value) {
    try {
      const params = new URLSearchParams();
      params.append(paramName, value);
      params.append('limit', 3); // Keep sample size small
      
      const url = `/jobs?${params.toString()}`;
      console.log(`Testing salary param '${paramName}=${value}'`);
      
      const response = await api.get(url);
      const resultsCount = Array.isArray(response.data) ? response.data.length :
        (response.data.content ? response.data.content.length : 
          (response.data.jobs ? response.data.jobs.length : 0));
          
      return {
        paramName,
        value,
        success: true,
        resultsCount,
        url
      };
    } catch (error) {
      console.error(`Error testing salary param '${paramName}':`, error);
      return {
        paramName,
        value,
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Convert display job type to backend format
   * @param {string} displayType - Human-readable job type
   * @returns {string} - Backend format job type
   */
  static getBackendJobType(displayType) {
    if (!displayType) return 'FULL_TIME';
    
    // Convert to string and normalize
    const displayTypeStr = String(displayType);
    
    // Create reverse mapping of JOB_TYPE_MAP
    const reverseMap = Object.entries(JOB_TYPE_MAP).reduce((map, [backend, display]) => {
      map[display] = backend;
      return map;
    }, {});
    
    // Check for exact match
    if (reverseMap[displayTypeStr]) {
      return reverseMap[displayTypeStr];
    }
    
    // Check for case-insensitive match
    const lowerCaseType = displayTypeStr.toLowerCase();
    for (const [display, backend] of Object.entries(reverseMap)) {
      if (display.toLowerCase() === lowerCaseType) {
        return backend;
      }
    }
    
    // If it looks like it's already in backend format (all caps with underscores)
    if (/^[A-Z_]+$/.test(displayTypeStr)) {
      return displayTypeStr;
    }
    
    // Convert from display format to backend format
    return displayTypeStr
      .toUpperCase()
      .replace(/\s+/g, '_');
  }

  /**
   * Generate fake job data for testing when API is unavailable
   * @param {number} limit - Number of fake jobs per page
   * @param {Object} filters - Optional filters to apply
   * @returns {Object} - Object with data and pagination
   */
  static generateFakeJobs(limit = 10, filters = {}) {
    console.log('Generating fake job data with filters:', filters);
    
    const jobTypes = Object.keys(JOB_TYPE_MAP);
    const categories = ['Design', 'Development', 'Marketing', 'Customer Service', 'Administrative'];
    const locations = ['New York', 'Remote', 'San Francisco', 'London', 'Berlin'];
    const levels = ['Entry Level', 'Intermediate', 'Expert'];
    const salaries = [1000, 2000, 3000, 5000, 8000, 10000, 15000];
    
    // Generate random jobs
    let jobs = Array.from({ length: 30 }, (_, i) => ({
      id: `job-${i + 1}`,
      _id: `job-${i + 1}`,
      title: `Job ${i + 1} - ${categories[Math.floor(Math.random() * categories.length)]} Position`,
      description: `This is a fake job generated for testing purposes when the API is unavailable.`,
      salary: salaries[Math.floor(Math.random() * salaries.length)],
      jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      location: { city: locations[Math.floor(Math.random() * locations.length)] },
      category: categories[Math.floor(Math.random() * categories.length)],
      subcategory: '',
      company: {
        name: `Company ${i % 5 + 1}`,
        logo: `/images/team/client-${i % 5 + 1}.png`,
      },
      level: levels[Math.floor(Math.random() * levels.length)],
      requirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    
    // Apply filters
    if (filters.category && filters.category.length > 0) {
      jobs = jobs.filter(job => filters.category.includes(job.category));
    }
    
    if (filters.jobType && filters.jobType.length > 0) {
      const backendJobTypes = this.processJobTypeFilters(filters.jobType);
      
      jobs = jobs.filter(job => 
        backendJobTypes.some(filterType => job.jobType === filterType)
      );
    }
    
    // Handle salary filters - convert to numbers and compare
    if (filters.minSalary !== undefined && filters.minSalary !== null) {
      const minValue = Number(filters.minSalary);
      if (!isNaN(minValue) && minValue > 0) {
        console.log('Applying minSalary filter:', minValue);
        jobs = jobs.filter(job => job.salary >= minValue);
      }
    }
    
    if (filters.maxSalary !== undefined && filters.maxSalary !== null) {
      const maxValue = Number(filters.maxSalary);
      if (!isNaN(maxValue)) {
        console.log('Applying maxSalary filter:', maxValue);
        jobs = jobs.filter(job => job.salary <= maxValue);
      }
    }
    
    if (filters.level && filters.level.length > 0) {
      jobs = jobs.filter(job => filters.level.includes(job.level));
    }
    
    // Handle pagination
    const page = filters.page || 0;
    const pageSize = limit || 10;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = jobs.slice(startIndex, endIndex);
    
    return {
      data: this.transformJobsData(paginatedJobs),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(jobs.length / pageSize),
        totalItems: jobs.length,
        pageSize: pageSize
      }
    };
  }
}

export default JobService; 