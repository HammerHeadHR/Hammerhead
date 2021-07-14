import React, { useState } from 'react';
import NotificationList from './NotificationList.jsx';

let style = {
  height: '30px',
  width: '30px',
  borderRadius: '50%',
  backgroundColor: 'gray',
  marginLeft: '80%',
};

const Alert = ({ count, unread, notifications, markAsRead}) => {

  const [opened, setOpened] = useState(false);

  const getUnread = () => {
    return unread > 0
      ? <span style={{backgroundColor: 'red'}}>{unread}</span>
      : null;
  }

  return opened ? (
    <>
      <div style={style} onClick={() => setOpened(!opened)}>
        {getUnread()}
        <NotificationList notifications={notifications} markAsRead={markAsRead}/>
      </div>
    </>
  )
  : (
    <>
      <div style={style} onClick={() => setOpened(!opened)}>
        {getUnread()}
      </div>
    </>
  )
};

export default Alert;