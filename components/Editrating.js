import React, { useState, Component} from 'react';
import axios from 'axios';
import { Alert,Text, View ,Button,StyleSheet,TextInput,AppRegistry,TouchableOpacity, FlatList} from 'react-native';
// import Card from 'react-native-card-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from "./home.js"
import Login from './login.js'
export default class Editrating extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          modal: this.props.modal,
          activeItem: this.props.activeItem,
        };
      }
      editItem = item => {
        if (item.rating>5 | item.rating<0){
          alert("Please rating from 0 to 5")}
        else{
        axios
          .put(`http://localhost:8000/api/ratings/${item.id}/`, item);
       alert('Updated succeefully!')
      };}
      inputChangedRating = (value) =>{
        this.setState(prevState => ({
            activeItem : {...prevState.activeItem, rating:value}}));
      }

    render() {
        if(this.state.modal===1){
            return(<Login />)
        }
        else if (this.state.modal===2){
            return (<Home user={this.state.user} modal={this.state.modal}/>)
        }
        else if (this.state.modal===4){
            return (  
                <View style = {styles.container}>
                    <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({modal:2})}
                         style={styles.logoutappButtonContainer}>
                        <Text style={styles.appButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop:32,width: 320, height: 585, flexDirection: 'column', backgroundColor:"#4c4c4c",justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 20,elevation: 8}}>
                    <Text style = {{fontSize: 30,marginBottom:0,marginTop:-10,fontWeight: "bold",color:"white",fontStyle:'italic',alignItems:'center'}}>Edit rating</Text>

      <View style={{ width: 305, height: 505, flexDirection: 'column', backgroundColor:'white',justifyContent:'center', borderColor: '#fff',
  borderRadius: 10,elevation: 8}}>
      <Text style = {{marginLeft: 30, marginRight: 25,fontSize: 30,marginBottom:25,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center'}}>{this.state.activeItem.song} </Text>
      <Text style = {{marginLeft: 95, marginRight: 25,fontSize: 20,marginBottom:55,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center'}}>-- {this.state.activeItem.artist}{"\n "}{"\n "}</Text>
      <Text style = {{marginLeft: 60, marginRight: 20,fontSize: 25,marginBottom:15,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center'}}>Enter new rating </Text>
      <View style={{ marginLeft: 123, width: 60, height: 60, flexDirection: 'column', backgroundColor:"#4c4c4c",justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 20,elevation: 8}}>
      <TextInput
              style ={{
                justifyContent:'center',
                alignItems:'center',
                fontSize: 25,
                fontWeight: "bold",
                borderRadius: 10,
                backgroundColor:"white",
                color: "#4c4c4c",
                width: 45,
                paddingTop: 5,
                height:45,
                paddingBottom: 5,
                paddingRight: 10,
                textAlign:"center"   
              }}
              maxLength={1}
              keyboardType='numeric'
              onChangeText={this.inputChangedRating}
              />
              </View>
                     </View>
                     <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.editItem(this.state.activeItem)}
                         style = {styles.addratingappButtonContainer}>
                        <Icon name="check" size={20} color="black"/>
                    </TouchableOpacity>
                     </View>

                    <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({modal:2})}
                         style={styles.addsongappButtonContainer}>
                    <Text style={styles.appButtonText}>Back to my ratings</Text>
                    </TouchableOpacity>
                    
                    
                </View>
             )
            
        }
    }

}
    

    const styles = StyleSheet.create({
        container:{
          flex: 1,
          justifyContent:'center',
          alignItems: 'center',
          backgroundColor: 'linen'
        },
        logoutappButtonContainer: {
            justifyContent:'center',
            alignItems: 'center',
            marginTop: 130,
            elevation: 8,
            backgroundColor: '#ff6347',
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 10
          },
        addsongappButtonContainer: {
            marginTop: 50,
            marginBottom:150,
            elevation: 8,
            backgroundColor: "#4c4c4c",
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 12
          },
        backappButtonContainer: {
            flex: 0.8,
            marginTop: 50,
            marginBottom:150,
            elevation: 8,
            backgroundColor: "#4c4c4c",
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 12
          },
        addratingappButtonContainer: {
            marginTop: 5,
            elevation: 8,
            backgroundColor: "white",
            borderRadius: 100,
            paddingVertical: 6,
            paddingHorizontal: 20
          },
        appButtonContainer: {
            marginTop: 0,
            elevation: 4,
            backgroundColor: "#4c4c4c",
            borderRadius: 10,
            paddingVertical: 4,
            paddingHorizontal: 9
          },
        appButtonText: {
            fontSize: 16,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
          },
    })
