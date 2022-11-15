import React from "react";

import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { View, Text } from "react-native";
import { ImagePath, Colors, Meal, Add, Settings } from "../../Config";
import { styles, ICON_HEIGHT, ICON_WIDTH } from "./styles";

import Index from '../../Screens/App/User'
import AddFood from "../../Screens/App/AddFood";
import SettingsTab from "../../Screens/App/Settings";

const BottomTab = createBottomTabNavigator();

export default () => {

    return (
        <BottomTab.Navigator
            initialRouteName={'Index'}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <BottomTab.Screen
                name={"Index"}
                component={Index}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Meal
                                    width={ICON_WIDTH}
                                    height={ICON_HEIGHT}
                                    fill={focused ? Colors.secondary : Colors.gray}
                                />
                                <Text style={[styles.tabText, { color: focused ? Colors.secondary : Colors.gray }]}>
                                    Meals
                                </Text>
                            </View>
                        );
                    },
                }}
            />

            <BottomTab.Screen
                name={"AddFood"}
                component={AddFood}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Add
                                    width={ICON_WIDTH}
                                    height={ICON_HEIGHT}
                                    fill={focused ? Colors.secondary : Colors.gray}
                                />
                                <Text style={[styles.tabText, { color: focused ? Colors.secondary : Colors.gray }]}>
                                    AddFood
                                </Text>
                            </View>
                        );
                    },
                }}
            />

            <BottomTab.Screen
                name={"Settings"}
                component={SettingsTab}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Settings
                                    width={ICON_WIDTH}
                                    height={ICON_HEIGHT}
                                    fill={focused ? Colors.secondary : Colors.gray}
                                />
                                <Text style={[styles.tabText, { color: focused ? Colors.secondary : Colors.gray }]}>
                                    Settings
                                </Text>
                            </View>
                        );
                    },
                }}
            />

        </BottomTab.Navigator>
    );
};