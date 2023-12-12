import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/interfaces/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: any[] = [];
  totalNotifications = 0;
  userLocalStorage: string | null = '';


  
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {  
    this.userLocalStorage = localStorage.getItem('userName');
    this.loadNotifications()
  }

  private loadNotifications() {
    this.notificationService.getNotificationsByUser().subscribe(
      (data: Notification[]) => {
        // Formatear la fecha en un formato más legible
        this.notifications = data.map(notification => ({
          ...notification,
          formattedDate: notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : '',
          formattedTime: notification.createdAt ? new Date(notification.createdAt).toLocaleTimeString() : '',
        }));
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  deleteNotification(notificationId: number) { // Cambia el tipo de dato de 'string' a 'number'
    this.notificationService.deleteNotification(notificationId).subscribe(
      (response) => {
        // Actualizar la lista de notificaciones después de eliminar
        this.loadNotifications();
      },
      (error) => {
        console.error('Error deleting notification:', error);
      }
    );
  }
}
