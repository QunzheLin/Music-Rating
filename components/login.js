import React, { useState, Component } from 'react';
import { Alert,Text, View ,Button,StyleSheet,TextInput,AppRegistry,TouchableOpacity} from 'react-native';
// import Card from 'react-native-card-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './home.js'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: 1,
      credentials :{
        username : '',
        password : ''},       
    };
  }


  login = event =>{
    fetch('http://localhost:8000/auth/',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(this.state.credentials)
    }) 
    .then(data => {
        data.json()
        if (data.status === 200) {
            this.setState({modal:2},);
        } else {
            this.setState({modal:1})
            alert('Invalid username or password')
            }
    })     

    .catch(error => console.error(error))

  }
  register = event =>{
     
    fetch('http://localhost:8000/api/user/',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(this.state.credentials)
    }) 
    .then(this.state.user=this.state.credentials.username)
    .then(data=> {data.json()
        if (data.status === 201) {
            this.setState({modal:2});
            alert('Reisgered successfully')
        } 
        else if (this.state.credentials.username === '' | this.state.credentials.password === ''){
            this.setState({modal:1})
            alert('Please enter username and password')
        }
        else {
            this.setState({modal:1})
            alert('Username already exists')
            }})
    .catch(error => console.error(error))

  }
  inputChangedUsername = (value) =>{
    this.setState(prevState => ({
        credentials : {...prevState.credentials, username:value}}));
  }
  inputChangedPassword = (value) =>{
    this.setState(prevState => ({
        credentials : {...prevState.credentials, password:value}}));
  }



  render() {
    if(this.state.modal===1){
    return (
     <View style = {styles.container}>
     <Text style = {{fontSize: 40,marginTop:-100, marginBottom:105,fontWeight: "bold",color:"#4c4c4c",fontStyle:'italic',alignItems:'center'}}>Music Ratings</Text>
     <View style={{ width: 320, height: 240, flexDirection: 'column', backgroundColor:"#4c4c4c",justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 20,elevation: 10}}>
     <View style={{ width: 305, height: 225, flexDirection: 'column', backgroundColor:'white',justifyContent:'center',alignItems:'center', borderColor: '#fff',
  borderRadius: 15,elevation: 10}}>
     <View>
     <Text style={{color:'#4c4c4c',fontSize:22}}>Login/SignUp</Text>
     </View>
     <View style={styles.loginContainer}>
            <View style ={styles.inputbar}>
          <View style={{height:30,width: 30,marginTop:4,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderRightColor:'#ebebeb'}}> 
          <Icon name="user" size={16} color="#4c4c4c" />
            </View>
          <TextInput 
                  style ={{
                    backgroundColor:'#fff',
                    color: '#000',
                    width: 200,
                    paddingTop: 5,
                    paddingLeft: 10,
                    height:30,
                    paddingBottom: 5,
                    paddingRight: 10,
                    margin: 10,
                    marginTop: 1                   
                  }}
                   autoCapitalize="none"
                   placeholder='Your username'
                   value={this.state.credentials.username}
                   onChangeText={this.inputChangedUsername}/>
            </View>
            <View style={styles.seperator}></View>
            <View style ={styles.inputbar}>
            <View style={{height:30,width: 30,marginTop:4,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderRightColor:'#ebebeb'}}> 
            <Icon name="lock" size={16} color="#4c4c4c"/>
            </View>
              <TextInput
              style ={{
                backgroundColor:'#fff',
                color: '#000',
                width: 200,
                paddingTop: 5,
                height:40,
                paddingBottom: 5,
                paddingRight: 10,         
              }}
              placeholder='Your password'
              autoCapitalize="none"
              value={this.state.credentials.password}
              onChangeText={this.inputChangedPassword}/>
              </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={styles.buttonContainerLogin}>
              <Button 
              onPress ={this.login}
              title= "Login"
              color = "#4c4c4c"
              ></Button>
           </View>
           <View style={styles.buttonContainerRegister}>
              <Button 
              onPress ={this.register}
              title = "Register"
              color = "#4c4c4c"
              
              ></Button>
           </View>
           </View>
            
          </View>
          </View>
       </View>
    );
  }
  else{
    return(<Home user={this.state.credentials.username} modal={this.state.modal}/> )}
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'linen'
  },
  loginContainer:{
    padding: 5,
    height:90.8,
    marginTop:15,
    backgroundColor: 'white',
    marginBottom:10

  },
  seperator:{
    borderWidth:0.8,
    borderBottomColor:'#ebebeb',
    marginBottom: 5,
    marginTop: 5
  },
  buttonContainerLogin:{    
    padding:5,
    fontSize: 16,
    width:115,
    alignItems:'center',
    textAlign:'center',
    marginRight:10,
    height:50,
    color: '#fff'
  },
  buttonContainerRegister:{
    
    padding:5,
    fontSize: 16,
    width:115,
    alignItems:'center',
    textAlign:'center',
    marginRight:10,
    height:50,
    color: "#4c4c4c"
  },

inputbar: {
  flex: 1,
  justifyContent:'space-between',
  flexDirection: 'row'
}}
);
