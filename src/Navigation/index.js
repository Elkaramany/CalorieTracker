import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

import Auth from './AuthStack'
import App from './AppStack/index'

const MainNavigator = () => {
  const { token } = useSelector((state) => state.AuthReducer)

  return (
    <NavigationContainer>
      {token ?
        <App />
        :
        <Auth />
      }
    </NavigationContainer>
  );
};

export default MainNavigator;
