import Service from '../models/Service';
import { Types } from 'mongoose';

interface ServiceFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  deliveryTime?: number;
}

interface SearchCriteria {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

class ServiceService {
  static async getAll(filters: ServiceFilters = {}) {
    try {
      const query: any = {};
      
      if (filters.category) {
        query.category = filters.category;
      }
      
      if (filters.status) {
        query.status = filters.status;
      }
      
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.price = {};
        
        if (filters.minPrice !== undefined) {
          query.price.$gte = filters.minPrice;
        }
        
        if (filters.maxPrice !== undefined) {
          query.price.$lte = filters.maxPrice;
        }
      }
      
      if (filters.deliveryTime) {
        query.deliveryTime = { $lte: filters.deliveryTime };
      }
      
      return await Service.find(query).populate('userId', 'name profileImage rating');
    } catch (error) {
      console.error('Error in getAll services:', error);
      throw error;
    }
  }
  
  static async getById(id: string) {
    try {
      const service = await Service.findById(id).populate('userId', 'name profileImage rating');
      
      if (!service) {
        throw new Error('Service not found');
      }
      
      return service;
    } catch (error) {
      console.error(`Error in getById service ${id}:`, error);
      throw error;
    }
  }
  
  static async create(userId: string, serviceData: any) {
    try {
      const newService = new Service({
        ...serviceData,
        userId,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      await newService.save();
      return newService;
    } catch (error) {
      console.error('Error in create service:', error);
      throw error;
    }
  }
  
  static async update(id: string, serviceData: any) {
    try {
      const service = await Service.findById(id);
      
      if (!service) {
        throw new Error('Service not found');
      }
      
      // Update only allowed fields
      const updatableFields = [
        'title', 'description', 'price', 'category',
        'tags', 'features', 'deliveryTime', 'revisions', 'status'
      ];
      
      updatableFields.forEach(field => {
        if (serviceData[field] !== undefined) {
          (service as any)[field] = serviceData[field];
        }
      });
      
      service.updatedAt = new Date();
      
      await service.save();
      return service;
    } catch (error) {
      console.error(`Error in update service ${id}:`, error);
      throw error;
    }
  }
  
  static async delete(id: string) {
    try {
      const service = await Service.findById(id);
      
      if (!service) {
        throw new Error('Service not found');
      }
      
      await Service.findByIdAndDelete(id);
      return { success: true };
    } catch (error) {
      console.error(`Error in delete service ${id}:`, error);
      throw error;
    }
  }
  
  static async getByUser(userId: string) {
    try {
      return await Service.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
      console.error(`Error in getByUser services ${userId}:`, error);
      throw error;
    }
  }
  
  static async uploadImage(id: string, imageUrl: string) {
    try {
      const service = await Service.findById(id);
      
      if (!service) {
        throw new Error('Service not found');
      }
      
      // Add the image to the service's images array
      if (!service.images) {
        service.images = [];
      }
      
      service.images.push(imageUrl);
      service.updatedAt = new Date();
      
      await service.save();
      return service;
    } catch (error) {
      console.error(`Error in uploadImage service ${id}:`, error);
      throw error;
    }
  }
  
  static async search(criteria: SearchCriteria) {
    try {
      const query: any = {};
      
      // Text search
      if (criteria.query) {
        query.$or = [
          { title: { $regex: criteria.query, $options: 'i' } },
          { description: { $regex: criteria.query, $options: 'i' } },
          { tags: { $in: [new RegExp(criteria.query, 'i')] } }
        ];
      }
      
      // Category filter
      if (criteria.category) {
        query.category = criteria.category;
      }
      
      // Price range filter
      if (criteria.minPrice !== undefined || criteria.maxPrice !== undefined) {
        query.price = {};
        
        if (criteria.minPrice !== undefined) {
          query.price.$gte = criteria.minPrice;
        }
        
        if (criteria.maxPrice !== undefined) {
          query.price.$lte = criteria.maxPrice;
        }
      }
      
      // Only show active services in search results
      query.status = 'active';
      
      return await Service.find(query)
        .populate('userId', 'name profileImage rating')
        .sort({ rating: -1, createdAt: -1 });
    } catch (error) {
      console.error('Error in search services:', error);
      throw error;
    }
  }
}

export default ServiceService; 