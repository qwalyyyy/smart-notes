// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ReportDetailScreen from './screens/ReportDetailScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Мои отчеты' }} />
        <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ title: 'Детали отчета' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
