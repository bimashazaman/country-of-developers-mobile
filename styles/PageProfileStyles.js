const {StyleSheet} = require('react-native');

export const PageProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E121C',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: -40,
    borderWidth: 3,
    borderColor: '#fff',
    marginLeft: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 40,
    color: '#fff',
  },
  username: {
    color: 'grey',
    marginBottom: 10,
    marginLeft: 40,
  },
  description: {
    padding: 20,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
  },
});
