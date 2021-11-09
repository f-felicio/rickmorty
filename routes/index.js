import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Episode from '../src/screens/EpisodeDetails';
import Character from '../src/screens/CharacterDetails';
import Home from '../src/screens/Home';

const {Navigator, Screen} = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Home" component={Home} />
        <Screen name="Character" component={Character} />
        <Screen name="Episode" component={Episode} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
