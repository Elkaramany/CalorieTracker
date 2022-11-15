import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Index from '../../Screens/Auth';
import SignUp from '../../Screens/Auth/SignUp'

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'Index'}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
