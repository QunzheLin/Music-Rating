import React, {  useEffect, useState, Component } from 'react';
import { Alert,Text, View ,Button,StyleSheet,TextInput,AppRegistry,TouchableOpacity} from 'react-native';
// import Card from 'react-native-card-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from "./components/login.js";

export default function App() {
  return(
    <View style={{height:1000}}>
      <Login/>
    </View>
  )

}
