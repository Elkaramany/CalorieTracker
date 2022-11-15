import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Admin from "./Admin";
import User from "./User";
import UpdateFood from '../../Screens/App/UpdateFood';
import UserEntries from "../../Screens/App/Admin/UserEntries";
import AddFoodAdmin from "../../Screens/App/AddFood";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    const { userType } = useSelector((state) => state.AuthReducer)
    let App = userType === "Admin" ? Admin : User

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'App'}
        >
            <Stack.Screen name="App" component={App} />
            <Stack.Screen name="UpdateFood" component={UpdateFood} />
            <Stack.Screen name="UserEntries" component={UserEntries} />
            <Stack.Screen name="AddFoodAdmin" component={AddFoodAdmin} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
