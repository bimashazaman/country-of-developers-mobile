import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../utils/constant';
import {useFocusEffect} from '@react-navigation/native';

const PageScreen = ({navigation}) => {
  const [pages, setPages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPages = async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          const response = await fetch(`${BASE_URL}/pages`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          setPages(jsonData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPages();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Your Pages</Text>
        {/* button to create a new page */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreatePageScreen')}>
          <Text style={styles.buttonText}>Create a Page</Text>
        </TouchableOpacity>
      </View>
      {pages.map((page, index) => (
        <TouchableOpacity
          key={index}
          style={styles.row}
          onPress={() => navigation.navigate('PageProfileScreen', {page})}>
          <Image
            source={require('../../assets/profile.jpg')}
            style={styles.image}
          />
          <Text key={index} style={styles.pageName}>
            {page.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0E121C',
    minHeight: Dimensions.get('window').height,
  },
  innerContainer: {
    backgroundColor: '#0E121C',
  },
  title: {
    color: '#3ABEFE',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 26,
    fontFamily: 'RussoOne-Regular',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 15,
  },
  pageName: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#3ABEFE',
    width: 150,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default PageScreen;
