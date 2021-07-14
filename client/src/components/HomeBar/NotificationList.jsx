import React from 'react';
import Notification from './Notification.jsx';

let style = {
  width: '200px',
  height: '500px',
  border: 'solid 1px black',
  background: 'white',
  overflow: 'scroll'
}

const NotificationList = ({ notifications, markAsRead }) => {

  return (
    <div id='notification-list' style={style}>
      <h3>Notifications</h3>
      { notifications.map((notification, i) => {
        return <Notification notification={notification} key={'notification' + i } markAsRead={markAsRead}/>
      })}
    </div>
  )
}

export default NotificationList;