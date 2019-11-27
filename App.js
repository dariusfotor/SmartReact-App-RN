import React,{Component} from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import LoginScreen from './pages/LoginScreen';
import {createStackNavigator} from 'react-navigation';

export default class App extends React.Component{

  render(){

    return(
      <View>
      <AppNavigation />

      </View>
    )
  }
}
 const AppNavigation = createStackNavigator({
   Login: {screen: LoginScreen}
 })


