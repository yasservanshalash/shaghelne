"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("../models/Service"));
class ServiceService {
    static getAll() {
        return __awaiter(this, arguments, void 0, function* (filters = {}) {
            try {
                const query = {};
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
                return yield Service_1.default.find(query).populate('userId', 'name profileImage rating');
            }
            catch (error) {
                console.error('Error in getAll services:', error);
                throw error;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield Service_1.default.findById(id).populate('userId', 'name profileImage rating');
                if (!service) {
                    throw new Error('Service not found');
                }
                return service;
            }
            catch (error) {
                console.error(`Error in getById service ${id}:`, error);
                throw error;
            }
        });
    }
    static create(userId, serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newService = new Service_1.default(Object.assign(Object.assign({}, serviceData), { userId, status: 'active', createdAt: new Date(), updatedAt: new Date() }));
                yield newService.save();
                return newService;
            }
            catch (error) {
                console.error('Error in create service:', error);
                throw error;
            }
        });
    }
    static update(id, serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield Service_1.default.findById(id);
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
                        service[field] = serviceData[field];
                    }
                });
                service.updatedAt = new Date();
                yield service.save();
                return service;
            }
            catch (error) {
                console.error(`Error in update service ${id}:`, error);
                throw error;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield Service_1.default.findById(id);
                if (!service) {
                    throw new Error('Service not found');
                }
                yield Service_1.default.findByIdAndDelete(id);
                return { success: true };
            }
            catch (error) {
                console.error(`Error in delete service ${id}:`, error);
                throw error;
            }
        });
    }
    static getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Service_1.default.find({ userId }).sort({ createdAt: -1 });
            }
            catch (error) {
                console.error(`Error in getByUser services ${userId}:`, error);
                throw error;
            }
        });
    }
    static uploadImage(id, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield Service_1.default.findById(id);
                if (!service) {
                    throw new Error('Service not found');
                }
                // Add the image to the service's images array
                if (!service.images) {
                    service.images = [];
                }
                service.images.push(imageUrl);
                service.updatedAt = new Date();
                yield service.save();
                return service;
            }
            catch (error) {
                console.error(`Error in uploadImage service ${id}:`, error);
                throw error;
            }
        });
    }
    static search(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {};
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
                return yield Service_1.default.find(query)
                    .populate('userId', 'name profileImage rating')
                    .sort({ rating: -1, createdAt: -1 });
            }
            catch (error) {
                console.error('Error in search services:', error);
                throw error;
            }
        });
    }
}
exports.default = ServiceService;
