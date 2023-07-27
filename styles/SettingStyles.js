const {StyleSheet} = require('react-native');

export const SettingsStyles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    color: '#3ABEFE',
    fontSize: 24,
    marginLeft: 16,
  },
  saveButton: {
    color: '#3ABEFE',
    backgroundColor: '#3ABEFE',
    textAlign: 'center',
    borderRadius: 20,
    width: 80,
    justifyContent: 'center',
    padding: 4,
    marginRight: 16,
  },

  saveButtonText: {
    marginLeft: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '800',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'RussoOne-Regular',
    color: '#3ABEFE',
  },
  container: {
    padding: 20,
  },
  formField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 800,
    marginBottom: 5,
    color: '#FFFFFF',
    marginLeft: 44,
    marginTop: 10,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 20,
    width: 280,
    marginLeft: 16,
    backgroundColor: '#1A2235',
    color: 'white',
  },

  imageUpload: {
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    borderRadius: 5,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  NameInputdetails: {
    flexDirection: 'row',
  },
});
