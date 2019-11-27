import React,{Component} from 'react';
import { StyleSheet, Text, View, Button,TextInput, ScrollView } from 'react-native';
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
      valueTemp_over: "",
      newTempValue_over: "",
      time: "",
    }
    this.db_relay = firebase.database().ref().child('Reles_busena');
    this.db_relay_2 = firebase.database().ref().child('Reles_busena_2');
    this.db_temp = firebase.database().ref().child("Temperatura");
    this.db_dregme = firebase.database().ref().child("Dregme");
    this.db_temp_over = firebase.database().ref().child("Temp_virs_27");
  }
  componentDidMount(){
    //Temperatura is FB
    setInterval(()=>this.db_temp.on('value', snap=>{
      this.setState({
          tempFRBase: snap.val(),
      })
      if(this.state.tempFRBase >= this.state.valueTemp_over ){
          
          this.db_temp_over.set({
              laikas: "Laikas: " + this.state.time,
              busena: "Temperatura: " + this.state.tempFRBase + "C",
          })
      }
  }
  ), 5000)
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
 //Laikrodis
 clock(){
  this.setState({
      time: new Date().toLocaleString()
  })
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
//Nustatyti virsijama temp.


submitTemp_over(){
  this.setState({
    valueTemp_over: this.state.newTempValue_over,
    newTempValue_over: ""
  })
}
componentWillMount(){
  setInterval(()=>this.clock(), 5000)
  
}
  render(){

    return(
      <ScrollView style={styles.screen}>
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
          <View style={this.state.relay_status_2===1 ? styles.systemOn : styles.systemOff}></View>
          <Button style={styles.button} onPress={this.turnOnRelay_2} title="Ijungti"></Button>
          <Button style={styles.button} onPress={this.turnOffRelay_2} title="Isjungti"></Button>
        </View>
        <View>
          <Text style={styles.temp} >Temperatura: {this.state.tempFRBase} C</Text>
          <Text style={styles.humid} >Dregme: {this.state.humidFRBase} %</Text>
        </View>
        <View >
        <Text style={styles.temp_over_txt}>Nustatyti leistina temperatura</Text>
        <TextInput
        style={styles.input}
        onChangeText={(typeText)=>this.setState({newTempValue_over: typeText})}
        value={this.state.newTempValue_over}
        placeholder={"ivesti temp."}
        />
        <Button onPress={this.submitTemp_over.bind(this)}  title="Patvirtinti"></Button>
        <Text style={styles.tempOver_Screen}>Ivesta leistina temp. {this.state.valueTemp_over} C</Text>
        {Object.entries(this.state.temp_over).map((over,i)=><View key={i}><Text style={styles.tempOver_Screen}>{over}</Text></View>)}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  screen:{
    paddingTop: 20,
    backgroundColor: "#577284",
    width: "100%",
  },
  header:{
    textAlign:"center",
    backgroundColor: "#577284",
  },
  headerTitle:{
    fontSize: 30,
    color: "#f0f8ff",
    fontWeight:"600",
    textAlign:"center",
    paddingVertical: 3,
    
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
    fontSize: 20,
    textAlign:"center",
    paddingVertical: 3,
    
  },
  switch2:{
    color: "#f0f8ff",
    fontSize: 20,
    textAlign:"center",
    paddingVertical: 3,
  },
  temp:{
    textAlign: "center",
    paddingVertical: 2,
    fontSize: 18,
    color: "#f0f8ff",
  },
  humid:{
    textAlign: "center",
    paddingVertical: 2,
    fontSize: 18,
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
    fontSize: 20,
    textAlign:"center",
  },
  input:{
    height: 30, 
    width: 120,
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    
  },
  tempOver_Screen:{
    textAlign: "center",
    fontSize: 16,
    color: "#f0f8ff",
    margin: 5,
  },
});
