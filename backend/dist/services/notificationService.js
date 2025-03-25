"use strict";
// This is a simple notification service for our backend
// In a real application, you might connect to a notification system or database table
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// In-memory storage for notifications (for demo purposes)
const notifications = [];
class NotificationService {
    static getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return notifications.filter(notification => notification.userId === userId);
        });
    }
    static getById(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = notifications.find(n => n.id === notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }
            return notification;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newNotification = Object.assign(Object.assign({ id: Date.now().toString() }, data), { isRead: false, createdAt: new Date() });
            notifications.push(newNotification);
            return newNotification;
        });
    }
    static markAsRead(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = notifications.findIndex(n => n.id === notificationId);
            if (index === -1) {
                throw new Error('Notification not found');
            }
            notifications[index].isRead = true;
            return notifications[index];
        });
    }
    static markAllAsRead(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            notifications.forEach(notification => {
                if (notification.userId === userId && !notification.isRead) {
                    notification.isRead = true;
                    count++;
                }
            });
            return { message: `Marked ${count} notifications as read` };
        });
    }
    static delete(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = notifications.findIndex(n => n.id === notificationId);
            if (index === -1) {
                throw new Error('Notification not found');
            }
            notifications.splice(index, 1);
            return { message: 'Notification deleted successfully' };
        });
    }
}
exports.default = NotificationService;
