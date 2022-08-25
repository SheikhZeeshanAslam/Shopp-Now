import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/screens/Home';
import MyCart from './components/screens/MyCart';
import Productinfo from './components/screens/Productinfo';




const App = () => {

  const Stack = createNativeStackNavigator();
  
  return (
    
  
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {
          headerShown:false,
        }
      }>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='My Cart' component={MyCart} />
      <Stack.Screen name='Productinfo' component={Productinfo} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
  
});

export default App;
