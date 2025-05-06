import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import BottomRoutes from "./buttom.routes";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Login" 
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={Login} 
      />
      <Stack.Screen 
        name="BottomRoutes" 
        component={BottomRoutes} 
      />
    </Stack.Navigator>
  );
}
