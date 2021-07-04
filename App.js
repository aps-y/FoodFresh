import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { AuthManager } from './auth/AuthManager';

import Tabs from './navigation/tabs';
import { 
  Home,
  OrderDelivery,
  Restaurants
} from './screens'

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf')
  });
};

const App = () => {

  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  
  if(!fontsLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>setFontsLoaded(true)}/>
  }

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        await AuthManager.signInAsync();
        const token = await AuthManager.getAccessTokenAsync();
        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: async () => {
        await AuthManager.signOutAsync();
        dispatch({ type: 'SIGN_OUT' });
      }
    }),
    []
  );
  

  return (
    <NavigationContainer>
      <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
          }}>
        <Stack.Screen name='Home' component={Tabs} />
        <Stack.Screen name='OrderDelivery' component={OrderDelivery} />
        <Stack.Screen name='Restaurants' component={Restaurants} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
// b1b0388e-7058-4cbb-97c7-bf7a07867a57