import React, { useEffect, useState } from 'react';
import './TitleNotification.css';

interface TitleNotificationProps {
  notifications: string[];
  onDismiss: (index: number) => void;
}

const TitleNotification: React.FC<TitleNotificationProps> = ({ 
  notifications, 
  onDismiss 
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Array<{
    title: string;
    id: number;
    visible: boolean;
  }>>([]);

  useEffect(() => {
    notifications.forEach((notification, index) => {
      const id = Date.now() + index;
      
      setVisibleNotifications(prev => [...prev, {
        title: notification,
        id,
        visible: true
      }]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setVisibleNotifications(prev => 
          prev.map(n => n.id === id ? { ...n, visible: false } : n)
        );
        
        // Remove from DOM after animation
        setTimeout(() => {
          setVisibleNotifications(prev => prev.filter(n => n.id !== id));
          onDismiss(index);
        }, 500);
      }, 4000);
    });
  }, [notifications, onDismiss]);

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="title-notifications">
      {visibleNotifications.map((notification) => (
        <div 
          key={notification.id}
          className={`title-notification ${notification.visible ? 'visible' : 'hidden'}`}
        >
          <div className="notification-header">
            🏆 新しい称号を獲得しました！ 🏆
          </div>
          <div className="notification-title">
            『{notification.title}』
          </div>
          <div className="notification-sparkle">
            ✨✨✨
          </div>
        </div>
      ))}
    </div>
  );
};

export default TitleNotification;