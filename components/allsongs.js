import React, { useState, Component} from 'react';
import axios from 'axios';
import { Alert,Text, View ,Button,StyleSheet,TextInput,AppRegistry,TouchableOpacity, FlatList} from 'react-native';
// import Card from 'react-native-card-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from "./home.js"
import Editsong from './Editsong.js'
import Addsong from './Addsong.js'
import Addrating from './Addrating.js'
export default class Allsongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          modal: this.props.modal,
          ratingsList: this.props.ratingsList,
          songsList: [],
          activeItem: {
            song: "",
            artist: ""
          },
        };
      }
      componentDidMount() {
        this.refreshList();
      }
    
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/artists/")
          .then(res => this.setState({ songsList: res.data }))
          .catch(err => console.log(err));
      };
    
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/artists/${item.song}`)
          .then(res => this.refreshList());
      };


    render() {
        if(this.state.modal===1){
            return(<Login />)
        }
        else if (this.state.modal===2){
            return (<Home user={this.state.user} modal={this.state.modal}/>)
        }
        else if (this.state.modal===5){
            return (<Editsong user={this.state.user} modal={this.state.modal} activeItem={this.state.activeItem}/>)
        }
        else if (this.state.modal===6){
            return (<Addsong user={this.state.user} modal={this.state.modal}/>)
        }
        else if (this.state.modal===7){
            return (<Addrating user={this.state.user} modal={this.state.modal} activeItem={this.state.activeItem} ratingsList={this.state.ratingsList}/>)
        }
        else if (this.state.modal===3){
            return (  
                <View style = {styles.container}>
                    <View style={{ marginTop:197,width: 320, height: 585, flexDirection: 'column', backgroundColor:"#4c4c4c",justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 20,elevation: 8}}>
                    <Text style = {{fontSize: 30,marginBottom:0,marginTop:-10,fontWeight: "bold",color:"white",fontStyle:'italic',alignItems:'center'}}>All songs</Text>

      <View style={{ width: 305, height: 505, flexDirection: 'column', backgroundColor:'white',justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 10,elevation: 8}}>
                    <FlatList
                        data={this.state.songsList}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                        <Text style = {{marginLeft: 20, marginRight: 25,fontSize: 20,marginBottom:25,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center'}}>{item.song}  {"\n"}by {item.artist} {"\n"}
                        <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({activeItem:item,modal:5})}
                         style={styles.appButtonContainer}>
                        <Icon name="edit" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.handleDelete(item)}
                         style={styles.appButtonContainer}>
                        <Icon name="trash" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({activeItem:item,modal:7})}
                         style={styles.appButtonContainer}>
                        <Text style={ {fontSize: 13,
                                        color: "#fff",
                                         fontWeight: "bold",
                                    alignSelf: "center",
                                     textTransform: "uppercase"}}>Rate this</Text>
                        </TouchableOpacity>
                        </Text>
                        )}
                     />
                     </View>
                     <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({modal:6})}
                         style = {styles.addratingappButtonContainer}>
                        <Icon name="plus" size={20} color="black"/>
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
            marginBottom:30,
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
