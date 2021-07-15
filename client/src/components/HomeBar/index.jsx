import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Alert from './Alert.jsx';
import Avatar from './Avatar.jsx';
import logo from '../../../dist/img/hammerhead.svg';

const HomeBar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  let receiverId = 3;

  const markAsRead = (notificationId) => {
    let data = {
      notificationId: notificationId
    }
    axios.put('/notifications', data)
      .then(() => setUnread(unread - 1))
  }

  useEffect(() => {
    axios.get(`/notifications/${receiverId}`)
    .then((notifications) => {
      setNotifications(notifications.data);
      setNotificationCount(notifications.data.length);
      let count = 0;
      notifications.data.map(notification => {
        if (!notification.viewed) {
          count++;
        }
      })
      setUnread(count);
    })
  }, []);

  return (
    <div id="homebar">
      <img src={logo} alt="Hammerhead Logo"/>
      <Alert count={notificationCount} notifications={notifications} unread={unread} markAsRead={markAsRead}/>
      {/* <Avatar /> */}
    </div>
  );

};

export default HomeBar;