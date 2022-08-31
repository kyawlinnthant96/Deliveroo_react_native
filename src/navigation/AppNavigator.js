import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';

// components
import HomeScreen from '../screens/Home';
import RestaurantScreen from '../screens/Restaurant';
import BasketScreen from '../screens/Basket';
import PreparingOrderScreen from '../screens/PreparingOrder';
import DeliveryScreen from '../screens/Delivery';

// redux toolkit
import {store} from '../store/store';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PrepareOrder"
            component={PreparingOrderScreen}
            options={{
              presentation: 'fullScreenModal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              presentation: 'fullScreenModal',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
