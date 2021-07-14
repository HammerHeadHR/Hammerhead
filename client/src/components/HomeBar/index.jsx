import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Alert from './Alert.jsx';
import Avatar from './Avatar.jsx';

const HomeBar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  let receiverId = 1;

  useEffect(() => {
    axios.get(`/notifications/${receiverId}`)
    .then((notifications) => {
      setNotificationCount(notifications.data.length);
    })
  }, []);

  return (
    <div id="homebar">
      <Alert count={notificationCount} notifications={notifications}/>
      <Avatar />
    </div>
  );

};

export default HomeBar;