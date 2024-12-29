export function requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
  
  export function scheduleNotification(title: string, body: string, delay: number) {
    if ('Notification' in window && Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification(title, { body });
      }, delay);
    }
  }
  
  