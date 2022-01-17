import React, { useState, Component} from 'react';
import axios from 'axios';
import { Alert,Text, View ,Button,StyleSheet,TextInput,AppRegistry,TouchableOpacity, FlatList} from 'react-native';
// import Card from 'react-native-card-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './login.js'
import Allsongs from './allsongs.js'
import Editrating from './Editrating.js'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          modal: this.props.modal,
          ratingsList: [],
          activeItem: {
            username: "",
            song: "",
            rating: "",
            artist: ""
          },
        };
      }
      componentDidMount() {
        this.refreshList();
      }
    
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/ratings/")
          .then(res => this.setState({ ratingsList: res.data }))
          .catch(err => console.log(err));
      };
    
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/ratings/${item.id}`)
          .then(res => this.refreshList());
      };

    render() {
        if(this.state.modal===1){
            return(<Login />)
        }
        else if (this.state.modal===2) {
            return (  
                <View style = {styles.container}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style = {{fontSize: 35,marginBottom:0,marginTop:125,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center',textTransform: "uppercase"}}>Hi, {this.state.user} {"  "}</Text>
                    <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({modal:1})}
                         style={styles.logoutappButtonContainer}>
                        <Icon name="sign-out" size={20} color="white" />
                    </TouchableOpacity>
                    </View>
                    <View style={{ width: 320, height: 585, flexDirection: 'column', backgroundColor:"#4c4c4c",justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 20,elevation: 8}}>
                    <Text style = {{fontSize: 30,marginBottom:0,marginTop:-10,fontWeight: "bold",color:"white",fontStyle:'italic',alignItems:'center'}}>Your ratings</Text>

      <View style={{ width: 305, height: 505, flexDirection: 'column', backgroundColor:'white',justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 10,elevation: 8}}>
                    <FlatList
                        data={this.state.ratingsList.filter(item => item.username === this.state.user)}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                        <Text style = {{marginLeft: 20, marginRight: 25,fontSize: 20,marginBottom:25,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center'}}>{item.song} {"\n"}by {item.artist} {"\n"}{item.rating}<Icon name="star" size={20} color="goldenrod" />{'  '}
                        <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({activeItem:item, modal:4})}
                         style={styles.appButtonContainer}>
                        <Icon name="edit" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.handleDelete(item)}
                         style={styles.appButtonContainer}>
                        <Icon name="trash" size={16} color="white" />
                        </TouchableOpacity>
                        </Text>
                        )}
                     />
                     </View>
                     <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({modal:3})}
                         style = {styles.addratingappButtonContainer}>
                        <Icon name="plus" size={20} color="black"/>
                    </TouchableOpacity>
                     </View>

                    <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={() => this.setState({modal:3})}
                         style={styles.addsongappButtonContainer}>
                    <Text style={styles.appButtonText}>All songs</Text>
                    </TouchableOpacity>
                    
                    
                </View>
             )
            
        }
        else if (this.state.modal===3) {
            return ( <Allsongs user={this.state.user} modal={this.state.modal} ratingsList={this.state.ratingsList.filter(item => item.username === this.state.user)}/>)
        }
        else if (this.state.modal===4) {
            return ( <Editrating user={this.state.user} modal={this.state.modal} activeItem={this.state.activeItem}/>)
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
