// This is a simple notification service for our backend
// In a real application, you might connect to a notification system or database table

interface Notification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead?: boolean;
  createdAt?: Date;
}

// In-memory storage for notifications (for demo purposes)
const notifications: Notification[] = [];

class NotificationService {
  static async getAll(userId: string) {
    return notifications.filter(notification => notification.userId === userId);
  }
  
  static async getById(notificationId: string) {
    const notification = notifications.find(n => n.id === notificationId);
    
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    return notification;
  }
  
  static async create(data: Notification) {
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...data,
      isRead: false,
      createdAt: new Date()
    };
    
    notifications.push(newNotification);
    return newNotification;
  }
  
  static async markAsRead(notificationId: string) {
    const index = notifications.findIndex(n => n.id === notificationId);
    
    if (index === -1) {
      throw new Error('Notification not found');
    }
    
    notifications[index].isRead = true;
    return notifications[index];
  }
  
  static async markAllAsRead(userId: string) {
    let count = 0;
    
    notifications.forEach(notification => {
      if (notification.userId === userId && !notification.isRead) {
        notification.isRead = true;
        count++;
      }
    });
    
    return { message: `Marked ${count} notifications as read` };
  }
  
  static async delete(notificationId: string) {
    const index = notifications.findIndex(n => n.id === notificationId);
    
    if (index === -1) {
      throw new Error('Notification not found');
    }
    
    notifications.splice(index, 1);
    return { message: 'Notification deleted successfully' };
  }
}

export default NotificationService; 