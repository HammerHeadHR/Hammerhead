import React from 'react';
import Notification from './Notification.jsx';

const NotificationList = ({ notifications, markAsRead }) => {

  return (
    <div id='notification-list'>
      <h3>Notifications</h3>
      { notifications.map((notification, i) => {
        return <Notification notification={notification} key={'notification' + i } markAsRead={markAsRead}/>
      })}
    </div>
  )
}

export default NotificationList;