import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
let style = {
  border: 'solid 1px black',
  position: 'relative'
}

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
    <Link to='data-charts' params={{datasetId: notification.dataset_id}}>
      <div className='notification' style={style} onMouseEnter={markRead}>
        { renderUnread() }
        <p>{notification.dataset} | Sent by: {notification.sender}</p>
      </div>
    </Link>
  )
}

export default Notification;