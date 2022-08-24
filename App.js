import React from 'react';
import {TailwindProvider} from 'tailwindcss-react-native';

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
