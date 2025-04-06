import React, { createContext, useState, useContext } from 'react';

// Create notification context
const NotificationContext = createContext();

// Types of notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // Show a notification
  const showNotification = (message, type = NOTIFICATION_TYPES.INFO, duration = 5000) => {
    setNotification({ message, type });
    
    // Auto-hide notification after duration
    if (duration) {
      setTimeout(() => {
        setNotification(null);
      }, duration);
    }
  };

  // Clear notification
  const clearNotification = () => {
    setNotification(null);
  };

  // Shorthand methods for different notification types
  const notifySuccess = (message, duration) => showNotification(message, NOTIFICATION_TYPES.SUCCESS, duration);
  const notifyError = (message, duration) => showNotification(message, NOTIFICATION_TYPES.ERROR, duration);
  const notifyWarning = (message, duration) => showNotification(message, NOTIFICATION_TYPES.WARNING, duration);
  const notifyInfo = (message, duration) => showNotification(message, NOTIFICATION_TYPES.INFO, duration);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        clearNotification,
        notifySuccess,
        notifyError,
        notifyWarning,
        notifyInfo
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};