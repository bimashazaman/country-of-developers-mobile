import {Dimensions} from 'react-native';

const {StyleSheet} = require('react-native');

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121724',
    minHeight: Dimensions.get('window').height,
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    marginTop: 50,
    fontFamily: 'RussoOne-Regular',
    color: '#fff',
  },
  logo: {
    width: '80%',
    height: 55,
    marginTop: 30,
    marginBottom: 22,
    padding: 10,
  },
  error: {
    color: '#D83742',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    fontWeight: 800,
  },
  input: {
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#3ABEFE',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
    padding: 10,
    marginBottom: 20,
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#0C538C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'RussoOne-Regular',
    marginBottom: 20,
    width: '50%',
    alignItems: 'center',
    marginTop: 50,
    textAlign: 'center',
    justifyContent: 'center',
    //Shadow
    shadowColor: '#3ABEFE',
    shadowOffset: {
      //small light shadow
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4D515B',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'RussoOne-Regular',
    fontWeight: '900',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 320,
  },
  link: {
    color: '#3ABEFE',
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontFamily: 'Poppins-SemiBold',
  },

  bottom: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  bottomText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontFamily: 'Poppins-SemiBold',
  },
  ForgetPass: {
    color: '#FFFFFF',
    marginRight: 190,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
  },
  Logos: {
    flexDirection: 'row',
    marginTop: 35,
    alignItems: 'center',
    width: '55%',
    height: 38,
    justifyContent: 'space-between',
  },

  FacebookLogo: {
    backgroundColor: '#385B91',
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  GoogleLogo: {
    backgroundColor: '#D13123',
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    width: 105,
  },
  Or: {
    color: '#fff',
    fontFamily: 'RussoOne-Regular',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
});
