import React, { useState, Component} from 'react';
import axios from 'axios';
import { Alert,Text, View ,Button,StyleSheet,TextInput,AppRegistry,TouchableOpacity, FlatList} from 'react-native';
// import Card from 'react-native-card-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Allsongs from './allsongs.js'

export default class Editsong extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          modal: this.props.modal,
          activeItem: this.props.activeItem,
        };
      }
    
      editItem = item => {
        axios
          .put(`http://localhost:8000/api/artists/${item.song}/`, item);
       alert('Updated succeefully!')
      };
      inputChangedArtist = (value) =>{
        this.setState(prevState => ({
            activeItem : {...prevState.activeItem, artist:value}}));
      }

    render() {
        if(this.state.modal===3){
            return (<Allsongs user={this.state.user} modal={this.state.modal}/>)
        }
        else if (this.state.modal===5){
            return (  
                <View style = {styles.container}>
                    <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({modal:3})}
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
              <Text style = {{marginLeft: 53, marginTop: 30,marginRight: 20,fontSize: 25,marginBottom:15,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center'}}>Update the artist</Text>
              <View style={{ marginLeft: 52, width: 205, height: 40, flexDirection: 'column', backgroundColor:"#4c4c4c",justifyContent:'center',alignItems:'center', borderColor: '#fff',
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
                width: 195,
                paddingTop: 5,
                height:35,
                paddingBottom: 5,
                paddingRight: 10,
                textAlign:"center"   
              }}
              autoCapitalize="none"
              onChangeText={this.inputChangedArtist}
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
                         onPress={() => this.setState({modal:3})}
                         style={styles.addsongappButtonContainer}>
                    <Text style={styles.appButtonText}>Back to allsongs</Text>
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
