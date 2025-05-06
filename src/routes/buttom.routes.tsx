import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Settings } from 'react-native';
import List from '../pages/List';
import User from '../pages/User';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
    return (
        <Tab.Navigator id={undefined}
                screenOptions={{
                    headerShown: false
                }}
                tabBar={props=> <CustomTabBar {...props}/>}
        >
            <Tab.Screen 
                name="List" 
                component={List} 
            />
            <Tab.Screen 
                name="User" 
                component={User} 
            />
        </Tab.Navigator>
    );
}
