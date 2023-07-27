import {StyleSheet} from 'react-native';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121724',
  },

  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  postContainer: {
    backgroundColor: '#1B2235',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  caption: {
    color: '#E5E5E5',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 10,
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  usernameContainer: {
    flexDirection: 'row',
  },
  username: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    fontWeight: '800',
  },
  breakUsername: {
    color: '#A5AFCE',
    marginLeft: 3,
    marginTop: 3,
    fontWeight: '600',
    fontSize: 12,
  },

  postBody: {
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  like: {
    color: 'white',
    marginLeft: 5,
    marginTop: 6,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  actionTextShare: {
    color: '#A5AFCE',
    marginLeft: 3,
    marginTop: 3,
  },
  date: {
    color: '#3ABEFE',
    fontSize: 10,
    marginLeft: 11,
    fontWeight: '600',
  },
});
