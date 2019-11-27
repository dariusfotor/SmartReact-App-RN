import React,{Component} from 'react';
import { StyleSheet, Text, View, Button,TextInput, ScrollView } from 'react-native';

export default class LoginScreen extends React.Component{

  
  render(){

    return(
      <View>
          <Text>Smart control system of Ruzgiai home</Text>
        <Button
        title="Login"
        />
        <Text>Creater by Darius Ruzgys</Text>
      </View>
    )
  }
}