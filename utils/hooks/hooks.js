/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import axios from 'axios';
import {BASE_URL} from '../constant';

const {useState, useEffect, useCallback} = require('react');
const {
  deletePost,
  fetchPosts,
  likePost,
  unlikePost,
  sharePost,
  createPagePost,
  fetchPostsByUserId,
  fetchPagePosts,
} = require('../api/api');

const useCreatePost = (accessToken, setPosts) => {
  const [loading, setLoading] = useState(false);

  const createPost = async (formData, resetForm) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      resetForm();
      setPosts(prevPosts => [response.data, ...prevPosts]);
    } catch (error) {
      console.log(error);
      // Handle error response here
    } finally {
      setLoading(false);
    }
  };

  return {loading, createPost};
};

export const useSharePost = (postId, accessToken, caption) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShare = async () => {
    setLoading(true);
    try {
      await sharePost(postId, accessToken, caption);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return [handleShare, loading, error];
};

const useFetchPosts = accessToken => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchData = useCallback(async () => {
    // Added useCallback
    setLoading(true);
    const data = await fetchPosts(accessToken);
    setPosts(data);
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData is a dependency now

  return {loading, posts, setPosts, refetch: fetchData}; // Return refetch function
};

export const useFetchPagePosts = (accessToken, pageId) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchData = useCallback(async () => {
    // Added useCallback
    setLoading(true);
    const data = await fetchPagePosts(pageId, accessToken);
    setPosts(data);

    setLoading(false);
  }, [accessToken, pageId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData is a dependency now

  return {loading, posts, setPosts, refetch: fetchData}; // Return refetch function
};

//useFetchPostsByUserId
export const useFetchPostsByUserId = (accessToken, userId) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchDataByUserId = useCallback(async () => {
    // Added useCallback
    setLoading(true);
    const data = await fetchPostsByUserId(userId, accessToken);
    setPosts(data);
    setLoading(false);
  }, [accessToken, userId]);

  useEffect(() => {
    fetchDataByUserId();
  }, [fetchDataByUserId]); // fetchData is a dependency now

  return {loading, posts, setPosts, refetch: fetchDataByUserId}; // Return refetch function
};

const useDeletePost = accessToken => {
  const [loading, setLoading] = useState(false);

  const handleDeletePost = async postId => {
    setLoading(true);
    await deletePost(postId, accessToken);
    await fetchPosts();
    setLoading(false);
  };

  return {loading, handleDeletePost};
};

const useLikePost = (postId, accessToken) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLikePost = async () => {
    setLoading(true);
    try {
      const response = await likePost(postId, accessToken);
      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return [handleLikePost, loading, error];
};

const useUnlikePost = (postId, accessToken) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUnlikePost = async () => {
    setLoading(true);
    try {
      const response = await unlikePost(postId, accessToken);
      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return [handleUnlikePost, loading, error];
};

export const useCreatePagePost = (pageId, accessToken) => {
  const [loading, setLoading] = useState(false);

  const handleCreatePagePost = async (caption, media) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('caption', caption);
    if (media) {
      formData.append('media', {
        uri: media.uri,
        type: media.type,
        name: media.fileName || `image-${Date.now()}`,
      });
    }

    try {
      const response = await createPagePost(pageId, accessToken, formData);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {loading, handleCreatePagePost};
};

export {
  useCreatePost,
  useDeletePost,
  useFetchPosts,
  useLikePost,
  useUnlikePost,
};
