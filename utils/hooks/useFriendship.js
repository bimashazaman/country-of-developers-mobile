import {useState} from 'react';
import * as api from '../api/friendApi';

const useFriendship = (userId, accessToken) => {
  const [isFriend, setIsFriend] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestReceived, setIsRequestReceived] = useState(false);

  const addFriend = () => {
    api
      .addFriend(userId, accessToken)
      .then(() => {
        setIsRequestSent(true);
      })
      .catch(error => console.error(error));
  };

  const acceptFriend = () => {
    api
      .acceptFriend(userId, accessToken)
      .then(() => {
        setIsRequestReceived(false);
        setIsFriend(true);
      })
      .catch(error => console.error(error));
  };

  const removeFriend = () => {
    api
      .removeFriend(userId, accessToken)
      .then(() => {
        setIsFriend(false);
      })
      .catch(error => console.error(error));
  };

  const cancelFriendRequest = () => {
    api
      .cancelFriendRequest(userId, accessToken)
      .then(() => {
        setIsRequestSent(false);
      })
      .catch(error => console.error(error));
  };

  const rejectFriendRequest = () => {
    api
      .rejectFriendRequest(userId, accessToken)
      .then(() => {
        setIsRequestReceived(false);
      })
      .catch(error => console.error(error));
  };

  return {
    isFriend,
    isRequestSent,
    isRequestReceived,
    addFriend,
    acceptFriend,
    removeFriend,
    cancelFriendRequest,
    rejectFriendRequest,
  };
};

export default useFriendship;
