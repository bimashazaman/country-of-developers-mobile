import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constant';

export const useLogin = navigation => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false); // Add this state

  const handleLogin = async values => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      // Clear only related keys
      await AsyncStorage.multiRemove(['access_token', 'user', 'user_id']);

      // Set new values to AsyncStorage
      await AsyncStorage.multiSet([
        ['access_token', json.access_token],
        ['user', JSON.stringify(json.user)],
        ['user_id', JSON.stringify(json.user.id)],
      ]);

      console.log(json);
      setLoginSuccessful(true); // Set loginSuccessful to true after successful login

      // Navigate to HomeScreen
      navigation.navigate('Home');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {handleLogin, loading, errorMessage, loginSuccessful}; // Return loginSuccessful from the hook
};
