/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useAuth from '../../utils/hooks/useAuth';
import {BASE_URL} from '../../utils/constant';
import {Modal} from 'react-native';

const Policy = ({isDarkMode, navigation}) => {
  const [legalPolicies, setLegalPolicies] = useState([
    {
      label: 'Term and services',
      icon: <Icon name="file-invoice" size={21} color="#3ABEFE" />,
    },
    {
      label: 'Community Guidelines',
      icon: <Icon name="award" size={21} color="#3ABEFE" />,
    },
    {
      label: 'Privacy',
      icon: <Icon name="globe" size={21} color="#3ABEFE" />,
    },
    {
      label: 'Ad Choices',
      icon: <Icon name="buysellads" size={21} color="#3ABEFE" />,
    },
    {
      label: 'Cookie policy',
      icon: <Icon name="database" size={21} color="#3ABEFE" />,
    },

    {
      label: 'About',
      icon: <Icon name="info" size={24} color="#3ABEFE" />,
    },
  ]);

  const {accessToken} = useAuth();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDeactivateAccount = () => {
    fetch(`${BASE_URL}/deactivate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message) {
          setShowSuccessModal(true);
          navigation.navigate('Login');
        } else {
          setShowConfirmModal(false);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View>
      <View>
        <Text
          style={[
            {
              color: '#3ABEFE',
              marginRight: 40,
              marginTop: 40,
              fontWeight: 'bold',
              fontSize: 16,
            },
          ]}>
          Legal Policies
        </Text>

        <View style={[{color: '#3ABEFE', marginTop: 10}]}>
          {legalPolicies.map(legal => (
            <View style={styles.policies} key={legal.label}>
              <Text style={[styles.policiesIcon, {color: '#3ABEFE'}]}>
                {legal.icon}
              </Text>
              <Text style={[styles.policiesText]}>{legal.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 40,
          }}
          onPress={() => setShowConfirmModal(true)}>
          <Icon name="user-times" size={21} color="#3ABEFE" />
          <Text
            style={[
              {
                color: '#3ABEFE',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 10,
              },
            ]}>
            Deactivate Account
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showConfirmModal}
          onRequestClose={() => {
            setShowConfirmModal(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#161C2C',
                padding: 30,
                alignItems: 'center',
                borderRadius: 10,
                borderColor: '#3ABEFE',
                borderWidth: 1,
                width: '80%',
                position: 'relative',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                }}>
                Are you sure you want to deactivate your account?
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                  marginTop: 6,
                }}>
                You can reactivate your account anytime by logging in.
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#3ABEFE',
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                  onPress={() => setShowConfirmModal(false)}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 18,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => handleDeactivateAccount()}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 18,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showSuccessModal}
          onRequestClose={() => {
            setShowSuccessModal(false);
            navigation.navigate('Login');
          }}>
          <View
            style={{
              margin: 50,
              backgroundColor: 'white',
              padding: 20,
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text>
              Your account has been deactivated. Login again to reactivate your
              account.
            </Text>
            <Button
              title="Ok"
              onPress={() => {
                setShowSuccessModal(false);
                navigation.navigate('Login');
              }}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  policies: {
    flexDirection: 'row',
    marginTop: 16,
  },
  policiesText: {
    color: '#FFFFFF',
    marginLeft: 22,
    fontFamily: 'Poppins-Regular',

    fontSize: 18,
  },
  policiesIcon: {
    color: '#3ABEFE',
  },
});

export default Policy;
