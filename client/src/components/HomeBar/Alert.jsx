import React, { useState } from 'react';
import NotificationList from './NotificationList.jsx';

const Alert = ({ count, unread, notifications, markAsRead}) => {

  const [opened, setOpened] = useState(false);

  const getUnread = () => {
    if (unread > 0) {
      const audioEl = document.getElementsByClassName("audio-element")[0]
      audioEl.play()
    }
    return unread > 0
      ? <span>{unread}</span>
      : null;
  }

  return opened ? (
    <>
      <div className="alert" onClick={() => setOpened(!opened)}>
        {getUnread()}
        <NotificationList notifications={notifications} markAsRead={markAsRead}/>
      </div>
    </>
  )
  : (
    <>
      <div className="alert" onClick={() => setOpened(!opened)}>
        {getUnread()}
      </div>
    </>
  )
};

export default Alert;