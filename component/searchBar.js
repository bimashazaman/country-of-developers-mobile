import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleSearchClick = () => {
    navigation.navigate('SearchUsers');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchBarPlaceholder} onPress={handleSearchClick}>
          Search Users
        </Text>
        <TextInput
          style={styles.searchBar}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholder=""
          placeholderTextColor="#7688A1"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121724',
    margin: 'auto',
    padding: 5,
    color: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8,
    marginRight: 3,
    height: 34,
    width: '90%',
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarPlaceholder: {
    color: '#7688A1',
    marginRight: 10,
    fontSize: 16,
  },
  searchBar: {
    flex: 1,
    padding: 2,
    fontSize: 16,
    height: 23,
    color: 'white',
    backgroundColor: '#121724',
    paddingHorizontal: 10,
  },
  searchButton: {
    height: 30,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    width: '20%',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SearchBar;
