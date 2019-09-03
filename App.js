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
      relay_status: "",
      relay_status_2: "",
      tempFRBase: "",
      humidFRBase: "",
      temp_over: '',
    }
    this.db_relay = firebase.database().ref().child('Reles_busena');
    this.db_relay_2 = firebase.database().ref().child('Reles_busena_2');
    this.db_temp = firebase.database().ref().child("Temperatura");
    this.db_dregme = firebase.database().ref().child("Dregme");
    this.db_temp_over = firebase.database().ref().child("Temp_virs_27");
  }
  componentDidMount(){
    //Temperatura is FB
    this.db_temp.on('value', temp=>{
      this.setState({
        tempFRBase: temp.val()
      })
    }
    )
    //Temperatura nustatyta virs norimos
    this.db_temp_over.orderByKey().limitToLast(2).on('value', temp_over=>{
      this.setState({
        temp_over: temp_over.val()
      })
    }
    )
    //Reles status
    this.db_relay.on('value', data=>{
      this.setState({
        relay_status: data.val()
      })
    }
    )
    //Reles status 2
    this.db_relay_2.on('value', data=>{
      this.setState({
        relay_status_2: data.val()
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
getTempOver(){
  if(this.state.temp_over){
    return this.state.temp_over.map(function(over,i){
      return (
      <View key={i} >
        <Text style={styles.temp_over}>{over.busena}</Text>
        <Text>{over.laikas}</Text>
      </View>)
      })
  }
}
  render(){
    const relay1 = this.db_relay
    const relay2 = this.db_relay_2
    return(
      <View style={styles.screen}>
        <View style ={styles.header}>
          <Text style={styles.headerTitle}>Namu valdymo sistema</Text>
        </View>
        <View style={styles.switch}>
          <Text style={styles.switchTitle}>Jungikliai</Text>
          <Text style ={styles.switch1}>Pirma rele</Text>
          <View style={this.state.relay_status===1 ? styles.systemOn : styles.systemOff}></View>
          <Button style={styles.button} onPress={this.turnOnRelay } title="Ijungti"></Button>
          <Button style={styles.button} onPress={this.turnOffRelay} title="Isjungti"></Button>
          <Text style={styles.switch2}>Antra rele</Text>
          <View style={this.state.relay_status_2 ? styles.systemOn : styles.systemOff}></View>
          <Button style={styles.button} onPress={this.turnOnRelay_2} title="Ijungti"></Button>
          <Button style={styles.button} onPress={this.turnOffRelay_2} title="Isjungti"></Button>
        </View>
        <View>
          <Text style={styles.temp} >Temperatura: {this.state.tempFRBase} C</Text>
          <Text style={styles.humid} >Dregme: {this.state.humidFRBase} %</Text>
        </View>
        <View >
        <Text style={styles.temp_over_txt}>Temperatura virsija nustatyta</Text>
            
          

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
    paddingVertical: 5,
    
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
    paddingVertical: 5,
    
  },
  switch2:{
    color: "#f0f8ff",
    fontSize: 22,
    textAlign:"center",
    paddingVertical: 5,
  },
  temp:{
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 20,
    color: "#f0f8ff",
  },
  humid:{
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 20,
    color: "#f0f8ff",
  },
  systemOn:{
    backgroundColor: "#029A0E",
    height: 20,

  },
  systemOff:{
    backgroundColor:"#B80404",
    height: 20,
  },
  temp_over:{
   textAlign: "center",
    paddingVertical: 5,
    fontSize: 20,
    color: "#f0f8ff",
  },
  temp_over_txt:{
    paddingVertical: 5,
    backgroundColor:"#B4B7BA",
    color: "#f0f8ff",
    fontSize: 22,
    textAlign:"center",
  }

});
