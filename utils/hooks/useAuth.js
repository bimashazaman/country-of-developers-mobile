import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const [accessToken, setAccessToken] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('access_token');
      const user = await AsyncStorage.getItem('user');
      setAccessToken(token);
      setCurrentUser(user);
    })();
  }, []);

  return {accessToken, currentUser};
};

export default useAuth;
