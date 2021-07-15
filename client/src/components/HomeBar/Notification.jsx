import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

const Notification = ({ notification, markAsRead }) => {

  const [viewed, setViewed] = useState(notification.viewed);

  const renderUnread = () => {
    return viewed ? null : <div id="icon"></div>
  }

  const markRead = () => {
    if (!notification.viewed) {
      setViewed(true)
      markAsRead(notification.id);
    }
  }

  return (
    <Link to='data-charts' params={{datasetId: notification.dataset_id}}>
      <div className='notification' onMouseEnter={markRead}>
        { renderUnread() }
        <p>{notification.dataset} | Sent by: {notification.sender}</p>
      </div>
    </Link>
  )
}

export default Notification;