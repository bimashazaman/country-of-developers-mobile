import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constant';

export const useRegister = (navigation, initialValues) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async values => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const text = await response.text(); // Read the response as text first
        console.log(text); // Log the response to see what it is
        try {
          const json = JSON.parse(text); // Try parsing the response as JSON
          throw new Error(json.message); // If it's JSON, throw the error
        } catch {
          throw new Error('Server response was not OK'); // If it's not JSON, throw a generic error
        }
      }

      const json = await response.json(); // If the response was OK, then it should be JSON, so we parse it as JSON
      await AsyncStorage.setItem('access_token', json.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(json.user));
      await AsyncStorage.setItem('user_id', JSON.stringify(json.user.id));
      console.log(json);
      navigation.navigate('Home');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {handleRegister, loading, errorMessage};
};
