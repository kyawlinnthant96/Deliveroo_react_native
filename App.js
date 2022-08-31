import React from 'react';
import {TailwindProvider} from 'tailwindcss-react-native';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

// Navigation
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <TailwindProvider>
      <AppNavigator />
    </TailwindProvider>
  );
};

export default App;
