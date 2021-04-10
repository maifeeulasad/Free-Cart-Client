import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from "./src/reducer";

import SplashScreen from "./src/component/SplashScreen";
import HomeScreen from "./src/component/HomeScreen";

export const PageContext = React.createContext();
const Stack = createStackNavigator();

const store = createStore(reducer);

export default function App() {
  return (
      <>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </>
  );
}