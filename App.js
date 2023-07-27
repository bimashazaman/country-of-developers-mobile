import React, {useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appScreens, authScreens} from './screens/Imports/screens';
import {UserProvider} from './utils/UserContext';
import {Alert, Text} from 'react-native';
import {useLogin} from './utils/hooks/useLogin';

const Stack = createStackNavigator();

const initialState = {isLoading: true, isLogged: false, token: null};

const login = (state, action) => ({
  ...state,
  isLogged: true,
  token: action.token,
  user: action.user,
});

const logout = state => ({...state, isLogged: false, token: null, user: null});
const startLoading = state => ({...state, isLoading: true});
const finishLoading = state => ({...state, isLoading: false});

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return startLoading(state);
    case 'FINISH_LOADING':
      return finishLoading(state);
    case 'LOGIN':
      return login(state, action);
    case 'LOGOUT':
      return logout(state);
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {handleLogin, loading, errorMessage, loginSuccessful} = useLogin(); // Use your new useLogin hook

  useEffect(() => {
    const bootstrapAsync = async () => {
      let user;
      let accessToken;
      try {
        dispatch({type: 'START_LOADING'});
        accessToken = await AsyncStorage.getItem('access_token');
        user = JSON.parse(await AsyncStorage.getItem('user'));
        if (accessToken && user) {
          dispatch({type: 'LOGIN', token: accessToken, user});
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({type: 'FINISH_LOADING'});
      }
    };
    bootstrapAsync();
  }, []);

  // useEffect hook to handle successful login
  useEffect(() => {
    if (loginSuccessful) {
      (async () => {
        let user;
        let accessToken;
        try {
          accessToken = await AsyncStorage.getItem('access_token');
          user = JSON.parse(await AsyncStorage.getItem('user'));
          dispatch({type: 'LOGIN', token: accessToken, user});
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [loginSuccessful]);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
    }
  }, [errorMessage]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={
            state.isLogged ? appScreens.Home.name : authScreens.Login.name
          }>
          {state.isLogged
            ? Object.keys(appScreens).map(screen => (
                <Stack.Screen
                  key={screen}
                  name={screen}
                  component={appScreens[screen].component}
                  options={appScreens[screen].options}
                />
              ))
            : Object.keys(authScreens).map(screen => (
                <Stack.Screen
                  key={screen}
                  name={screen}
                  component={authScreens[screen].component}
                  options={authScreens[screen].options}
                />
              ))}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default React.memo(App);
