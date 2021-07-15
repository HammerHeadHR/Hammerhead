import React, { useState } from 'react';
import axios from 'axios';

let icon = {
  background: 'red',
  borderRadius: '5px',
  width: '10px',
  height: '10px',
  position: 'absolute',
  top: '5%',
  right: '5%'
}

const Notification = ({ notification, markAsRead }) => {

  const [viewed, setViewed] = useState(notification.viewed);

  const renderUnread = () => {
    return viewed ? null : <div style={icon}></div>
  }

  const markRead = () => {
    if (!notification.viewed) {
      setViewed(true)
      markAsRead(notification.id);
    }
  }

  return (
    <div className='notification' onMouseEnter={markRead}>
      { renderUnread() }
      <p>{notification.dataset}</p>
      <p>Sent by: {notification.sender}</p>
    </div>
  )
}

export default Notification;