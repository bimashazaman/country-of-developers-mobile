import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgetPasswordScreen = ({route, navigation}) => {
  const [Mobile, setMobile] = useState('');
  const handleResetPassword = () => {
    navigation.navigate('ResetPasswordScreen');
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient colors={['#0E121C', '#0E121C']} style={styles.container}>
      <Image
        source={require('../../assets/ps-logo-full.png')}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.Back} onPress={handleGoBack}>
        <TouchableOpacity>
          <Text style={styles.actionText}>
            <Icon name="arrow-left" size={18} color="#3ABEFE" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.backButton}> BACK</Text>
      </TouchableOpacity>
      <Text style={styles.title}>FORGOT PASSWORD</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        placeholderTextColor="#556080"
        value={Mobile}
        onChangeText={text => setMobile(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <LinearGradient colors={['#008CF3', '#11224A']} style={styles.button}>
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          By Creating an Account you Accept our{' '}
        </Text>
        <TouchableOpacity>
          <Text style={styles.link}> Term and conditions</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#fff',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 4,
  },
  backButton: {
    color: '#3ABEFE',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    marginTop: 2,
  },
  Back: {
    flexDirection: 'row',
    marginTop: 50,
    marginRight: 260,
  },

  title: {
    fontSize: 24,
    fontFamily: 'RussoOne-Regular',
    marginBottom: 70,
    marginTop: 60,

    color: '#fff',
  },
  logo: {
    width: '90%',
    height: 55,
    marginTop: 35,
  },

  input: {
    width: '80%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#3ABEFE',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,

    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 60,
    width: '80%',
    alignItems: 'center',
    marginTop: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  link: {
    color: '#3ABEFE',
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontSize: 12,
  },

  bottom: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bottomText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },
  ForgetPass: {
    color: '#FFFFFF',
    fontWeight: '400',
    marginRight: 150,
  },
});

export default ForgetPasswordScreen;
