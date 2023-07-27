const {StyleSheet} = require('react-native');

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121724',
  },
  darkModeContainer: {
    backgroundColor: '#0E121C',
  },
  UserDetails: {
    backgroundColor: '#1A2235',
    paddingBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  BlankCover: {
    backgroundColor: '#121825',
    width: '100%',
    height: 200,
  },
  BlankCoverText: {
    color: 'grey',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Poppins-Medium',
  },
  likeButton: {
    flexDirection: 'row',
  },
  CameraIcon: {
    marginLeft: '85%',
    bottom: 16,
    color: '#FFFFFF',
    backgroundColor: '#3ABEFE',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    padding: 7,
    justifyContent: 'center',
  },
  ProfileCameraIcon: {
    marginLeft: '65%',
    top: 10,
    color: '#FFFFFF',
    backgroundColor: '#3ABEFE',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    padding: 7,
    justifyContent: 'center',
  },
  profileImageContainer: {
    position: 'absolute',
    top: 150,
    left: '50%',
    marginLeft: -75,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 100,
    backgroundColor: '#121724',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 80,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
  darkModeName: {
    color: 'white',
  },
  bio: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: '#3ABEFE',
    fontFamily: 'Poppins-Regular',
  },
  darkModeBio: {
    color: '#3ABEFE',
  },
  About: {
    flexDirection: 'row',
    fontSize: 12,
    // marginTop: 6,
    textAlign: 'center',
    color: 'white',
    width: 150,
    marginTop: 16,
  },
  darkModeAbout: {
    color: 'white',
  },
  actionText: {
    marginTop: 1,
    marginLeft: 4,
    color: '#A5AFCE',

    fontFamily: 'Poppins-Medium',
  },
  editButtonContainer: {
    backgroundColor: '#3ABEFE',
    width: 120,
    height: 30,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '35%',
    // marginTop: 20,
  },
  editIcon: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    marginTop: 2,
  },
  editButton: {
    color: 'white',
    fontSize: 12,
    marginLeft: 6,
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
  },
  postsContainer: {
    flex: 1,
    marginTop: 1,
  },

  actionButton: {
    width: 120,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  actionButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  friendContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
  },
});
