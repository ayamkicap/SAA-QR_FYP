import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import TabNavigation from './Apps/Navigations/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigationTop from './Apps/Navigations/TabNAvigationTop';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const handleLoginSuccess = async (accessToken) => {
    // Update the app state or perform any other actions after successful login
    console.log('Login successful. Access token:', accessToken);

    await AsyncStorage.setItem('token', accessToken)
  .then(() => {
    setIsLoggedIn(true); // Set isLoggedIn state to true
    setAccessToken(accessToken); // Store the access token
  })
  .catch(error => console.error('Error setting token:', error));

    
  };
  

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      {isLoggedIn ? (
        <NavigationContainer>
          {/* <TabNavigationTop/> */}
          <TabNavigation />
        </NavigationContainer>
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} /> // Pass onLoginSuccess prop here
      )}

      {/* <NavigationContainer>
          <TabNavigation />
        </NavigationContainer> */}
    </View>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import * as React from 'react'
// import MainContainer from './navigation/MainContainer';
// import { NavigationContainer} from '@react-navigation/native';

// export default function App() {
//   return(
//     <NavigationContainer>
//       <MainContainer />
//     </NavigationContainer>
//   );
// }
