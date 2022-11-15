import React from "react";

import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { View, Text } from "react-native";
import { Colors, Meal, Settings, Reports, Add } from "../../Config";

import { styles, ICON_HEIGHT, ICON_WIDTH } from "./styles";

import Index from '../../Screens/App/Admin'
import SettingsTab from "../../Screens/App/Settings";
import AddFood from "../../Screens/App/AddFood";
import Report from "../../Screens/App/Admin/Report";

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
                                    All Meals
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
                name={"Report"}
                component={Report}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Reports
                                    width={ICON_WIDTH}
                                    height={ICON_HEIGHT}
                                    fill={focused ? Colors.secondary : Colors.gray}
                                />
                                <Text style={[styles.tabText, { color: focused ? Colors.secondary : Colors.gray }]}>
                                    Reports
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