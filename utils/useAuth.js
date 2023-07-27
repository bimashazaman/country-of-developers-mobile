import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './constant';

export const useAuth = () => {
  const [token, setToken] = useState(AsyncStorage.getItem('token'));

  const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (response.ok) {
      const json = await response.json();
      const {token} = await response.json();
      await AsyncStorage.setItem('access_token', json.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(json.user));
      setToken(token);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    AsyncStorage.removeItem('access_token');
    setToken(null);
  };

  return {token, login, logout};
};
