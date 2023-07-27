import axios from 'axios';
import {BASE_URL} from '../constant';

export const addFriend = async (userId, accessToken) => {
  return await axios.post(
    `${BASE_URL}/friends/${userId}/add`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const acceptFriend = async (userId, accessToken) => {
  return await axios.post(
    `${BASE_URL}/friends/${userId}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const removeFriend = async (userId, accessToken) => {
  return await axios.post(
    `${BASE_URL}/friends/${userId}/remove`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const cancelFriendRequest = async (userId, accessToken) => {
  return await axios.post(
    `${BASE_URL}/friends/${userId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const rejectFriendRequest = async (userId, accessToken) => {
  return await axios.post(
    `${BASE_URL}/friends/${userId}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const checkFriendship = async (userId, accessToken) => {
  return await axios.get(`${BASE_URL}/friends/${userId}/checkFriendship`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

export const checkFriendRequest = async (userId, accessToken) => {
  return await axios.get(`${BASE_URL}/friends/${userId}/checkFriendRequest`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

export const checkFriendRequestReceived = async (userId, accessToken) => {
  return await axios.get(
    `${BASE_URL}/friends/${userId}/checkFriendRequestReceived`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};
