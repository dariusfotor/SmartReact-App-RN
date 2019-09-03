import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import *as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyBwN5nkIv7tFYYLeL9nUBXr2TW43E76ZX8",
  authDomain: "durys-bf59d.firebaseapp.com",
  databaseURL: "https://durys-bf59d.firebaseio.com",
  projectId: "durys-bf59d",
  storageBucket: "durys-bf59d.appspot.com",
  messagingSenderId: "1069232893325"
};
firebase.initializeApp(config);

export default class App extends React.Component{

  constructor(){
    super();
    this.state={
      turnOn: 1,
      turnOff: 0,
      tempFRBase: "",
      humidFRBase: ""
    }
    this.db_relay = firebase.database().ref().child('Reles_busena');
    this.db_relay_2 = firebase.database().ref().child('Reles_busena_2');
    this.db_temp = firebase.database().ref().child("Temperatura");
    this.db_dregme = firebase.database().ref().child("Dregme");
  }
  componentDidMount(){
    //Temperatura is FB
    this.db_temp.on('value', temp=>{
      this.setState({
        tempFRBase: temp.val()
      })
    }
    )
    //Dregme is FB
    this.db_dregme.on('value', humid=>{
      this.setState({
        humidFRBase: humid.val()
      })
    }
    )
  }
turnOnRelay=()=>{
  this.db_relay.set(
    this.state.turnOn
  )
}
turnOffRelay=()=>{
  this.db_relay.set(
    this.state.turnOff
  )
}
turnOnRelay_2=()=>{
  this.db_relay_2.set(
    this.state.turnOn
  )
}
turnOffRelay_2=()=>{
  this.db_relay_2.set(
    this.state.turnOff
  )
}
  render(){
    return(
      <View style={styles.screen}>
        <View style ={styles.header}>
          <Text style={styles.headerTitle}>Namu valdymo sistema</Text>
        </View>
        <View style={styles.switch}>
          <Text style={styles.switchTitle}>Jungikliai</Text>
          <Text style ={styles.switch1}>Pirma rele</Text>
          <View style={this.turnOnRelay ? styles.systemOn : styles.systemOff}></View>
          <Button style={styles.button} onPress={this.turnOnRelay} title="Ijungti"></Button>
          <Button style={styles.button} onPress={this.turnOffRelay} title="Isjungti"></Button>
          <Text style={styles.switch2}>Antra rele</Text>
          <View style={this.turnOnRelay_2 ? styles.systemOn : styles.systemOff}></View>
          <Button style={styles.button} onPress={this.turnOnRelay_2} title="Ijungti"></Button>
          <Button style={styles.button} onPress={this.turnOffRelay_2} title="Isjungti"></Button>
        </View>
        <View>
          <Text style={styles.temp} >Temperatura: {this.state.tempFRBase} C</Text>
          <Text style={styles.humid} >Dregme: {this.state.humidFRBase} %</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen:{
    paddingTop: 20,
    backgroundColor: "#577284",
  },
  header:{
    textAlign:"center",
    backgroundColor: "#577284",
  },
  headerTitle:{
    fontSize: 34,
    color: "#f0f8ff",
    fontWeight:"600",
    textAlign:"center",
    paddingTop: 10,
    paddingBottom: 10,
    
  },
  switch:{
  paddingTop:10,
    backgroundColor:"#B4B7BA",

  },
  switchTitle:{
    fontSize: 26,
    color: "#f0f8ff",
    fontWeight:"600",
    textAlign:"center",
  },
  switch1:{
    color: "#f0f8ff",
    fontSize: 22,
    textAlign:"center",
    paddingTop:10,
    marginBottom:20,
    
  },
  switch2:{
    color: "#f0f8ff",
    fontSize: 22,
    textAlign:"center",
    marginBottom:20,
    paddingTop:10,
  },
  temp:{
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 20,
    color: "#f0f8ff",
  },
  humid:{
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 20,
    color: "#f0f8ff",
  },
  systemOn:{
    backgroundColor: "#029A0E",
    height: 25,

  },
  systemOff:{
    backgroundColor:"#B80404",
    height: 25,
  }

});
