// Utilites
import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import  {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Calling other files 
import CheckOutCart from "./app/Screens/CheckOutScreen";
import ReadNFCScreen from './app/Screens/ReadNFCScreen';


const TopTabs = createMaterialTopTabNavigator();

class App extends React.Component {
  render() {

    return ( 
      <NavigationContainer> 
        <TopTabs.Navigator>
          <TopTabs.Screen name = "Home " component = {ReadNFCScreen} />
          <TopTabs.Screen name = "Cart" component = {CheckOutCart} />
        </TopTabs.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;