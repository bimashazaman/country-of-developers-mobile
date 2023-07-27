/* eslint-disable no-alert */
// api.js
import axios from 'axios';
import {Alert} from 'react-native';
import {BASE_URL} from '../constant';

const fetchPosts = async accessToken => {
  const response = await axios.get(`${BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  // console.log('fetchPosts response:', response.data.data.data); // data.data.data is not a typo
  return response.data.data.data;
};

export const fetchPagePosts = async (pageId, accessToken) => {
  const response = await axios.get(`${BASE_URL}/pages/${pageId}/posts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};

//fetch posts by user id
export const fetchPostsByUserId = async (userId, accessToken) => {
  const response = await axios.get(`${BASE_URL}/postsByUserId/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.posts;
};

const deletePost = async (postId, accessToken) => {
  const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  Alert.alert('Post deleted successfully');
  return response.data;
};

const createPost = async (values, media, accessToken) => {
  const formData = new FormData();
  formData.append('caption', values.caption);
  if (media) {
    formData.append('media', {
      uri: media.uri,
      type: media.type,
      name: media.fileName || `image-${Date.now()}`,
    });
  }

  try {
    const response = await axios.post(`${BASE_URL}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('createPost response:', response.data);
    Alert.alert('Post created successfully');
  } catch (error) {
    console.error('createPost error:', error.response.data); // Log detailed error message
    console.log(error);
    throw error;
  }
};

const likePost = (postId, accessToken) => {
  console.log('likePost postId:', postId); // Check postId
  console.log('likePost accessToken:', accessToken); // Check accessToken

  return axios
    .post(
      `${BASE_URL}/likes/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .catch(error => {
      console.error('likePost error:', error.response.data); // Log detailed error message
      throw error;
    });
};

const unlikePost = (postId, accessToken) => {
  return axios.delete(`${BASE_URL}/likes/posts/${postId}/unlike`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

async function sharePost(postId, accessToken, caption) {
  const response = await fetch(`${BASE_URL}/posts/` + postId + '/share', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      caption: caption, // optional
    }),
  });

  const data = await response.json();

  Alert.alert('Post shared successfully');
  return data;
}

export const createPagePost = async (pageId, accessToken, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/pages/${pageId}/posts`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    alert('Post created successfully');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create page post');
  }
};

export {fetchPosts, deletePost, createPost, likePost, unlikePost, sharePost};
