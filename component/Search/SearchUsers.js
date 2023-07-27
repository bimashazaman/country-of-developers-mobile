/* eslint-disable react-native/no-inline-styles */
import {Text, View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const SearchUsers = ({navigation}) => {
  return (
    <LinearGradient colors={['#0E1018', '#1A2132']}>
      <View>
        <Formik
          initialValues={{search: ''}}
          onSubmit={(values, {setSubmitting}) => {
            navigation.navigate('SearchScreen', {
              searchQuery: values.search,
            });
            setSubmitting(false);
          }}>
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <View style={{backgroundColor: '#121724'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={values.search}
                    placeholderTextColor="#A9A9A9"
                    onChangeText={handleChange('search')}
                  />
                  <Icon
                    name="search"
                    size={24}
                    color="white"
                    onPress={handleSubmit}
                    style={styles.sendIcon}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="image"
                    size={24}
                    color="#3ABEFE"
                    onPress={() => navigation.navigate('CreatePosts')}
                    style={{marginRight: 10, marginTop: 10}}
                  />
                </View>
              </View>
              {errors.search && touched.search && (
                <Text style={{color: 'red', marginLeft: 16}}>
                  {errors.search}
                </Text>
              )}
            </View>
          )}
        </Formik>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 290,
    resizeMode: 'cover',
  },
  searchInput: {
    padding: 8,
    marginTop: 10,
    marginLeft: 16,
    color: '#fff',
    width: '93%',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    height: 35,
  },
  sendIcon: {
    position: 'absolute',
    top: '50%',
    right: 20,
    marginTop: -7,
  },
});

export default SearchUsers;
