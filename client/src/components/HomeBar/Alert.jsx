import React, { useState } from 'react';
import NotificationList from './NotificationList.jsx';

const Alert = ({ count, unread, notifications, markAsRead}) => {

  const [opened, setOpened] = useState(false);

  const getUnread = () => {
    return unread > 0
      ? <span style={{backgroundColor: 'red'}}>{unread}</span>
      : null;
  }

  return opened ? (
    <>
      <div class="alert" onClick={() => setOpened(!opened)}>
        {getUnread()}
        <NotificationList notifications={notifications} markAsRead={markAsRead}/>
      </div>
    </>
  )
  : (
    <>
      <div class="alert" onClick={() => setOpened(!opened)}>
        {getUnread()}
      </div>
    </>
  )
};

export default Alert;