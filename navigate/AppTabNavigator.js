/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import FriendRequestScreen from '../screens/Friends/FriendRequestScreen';
import ChatsScreen from '../screens/Chat/ChatsScreen';
import AppHeader from './AppHeader';
import MenuScreen from '../screens/Menu/MenuScreen';
import {Image, Text} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
// import ProfileScreen from '../screens/Profile/ProfileScreen';
import {WEB_URL} from '../utils/constant';

const Tab = createBottomTabNavigator();

const AppTabNavigator = ({navigation}) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem('user')
      .then(data => {
        setUser(JSON.parse(data));
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <AppHeader navigation={navigation} />

      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let label;
            let CustomIcon;

            if (route.name === 'Feed') {
              iconName = focused ? 'home' : 'home';
              label = 'Feed';
            } else if (route.name === 'Friend Request') {
              iconName = focused ? 'user-plus' : 'user-plus';
              label = 'Friends';
            } else if (route.name === 'Chats') {
              iconName = focused ? 'envelope' : 'envelope';
              label = 'Chats';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog';
              label = 'Settings';
            } else if (route.name === 'Profile') {
              CustomIcon = (
                <>
                  {user?.avatar == null ? (
                    <Image
                      source={require('../assets/profile.jpg')}
                      style={{
                        width: 30,
                        height: 30,
                        marginTop: 10,
                        borderRadius: 50,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: `${WEB_URL}/avatars/${user?.avatar}`}}
                      style={{
                        width: 30,
                        height: 30,
                        marginTop: 10,
                        borderRadius: 50,
                      }}
                    />
                  )}
                </>
              );
              label = 'Profile';
            } else if (route.name === 'Menu') {
              iconName = focused ? 'bars' : 'bars';
              label = 'Menu';
            }

            return (
              <>
                {CustomIcon || (
                  <Icon
                    name={iconName}
                    size={size}
                    color={color}
                    style={{
                      marginTop: 10,
                    }}
                  />
                )}

                {/* LABEL */}
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  {label}
                </Text>
              </>
            );
          },

          animation: 'fade', // Add this
          animationEnabled: true, // And this
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Add your animation here
          tabBarActiveTintColor: '#4CB2E9',
          tabBarInactiveTintColor: '#fff',
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveBackgroundColor: '#005594',
          tabBarInactiveBackgroundColor: '#005594',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#005594',
            height: 60,
            paddingBottom: 10,
          },
        })}>
        <Tab.Screen name="Feed" component={HomeScreen} />
        <Tab.Screen name="Friend Request" component={FriendRequestScreen} />
        {/* <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{user: user}}
        /> */}
        <Tab.Screen name="Chats" component={ChatsScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
      </Tab.Navigator>
    </>
  );
};

export default AppTabNavigator;
