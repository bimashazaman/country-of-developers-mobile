const {StyleSheet} = require('react-native');

export const ChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#090C13',
  },

  username: {
    color: '#FFFFFF',
    marginLeft: 6,
    marginTop: 16,
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },

  flexRow: {
    flexDirection: 'row',
  },

  Header: {
    backgroundColor: '#1A2134',
    width: 409,
    height: 55,
    flexDirection: 'row',
  },
  actionBack: {
    marginTop: 16,
    marginLeft: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 8,
    marginLeft: 120,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1A2134',
  },

  TextContainer: {
    color: '#556080',
    fontWeight: '800',
    width: 350,
    marginHorizontal: 20,
    height: 26,
    marginTop: 3,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    caretColor: 'green',
    padding: 6,
    marginLeft: 4,
    backgroundColor: '#1A2134',
    color: '#fff',
  },

  actionText: {
    marginLeft: 40,
    marginTop: 2,
  },
});
