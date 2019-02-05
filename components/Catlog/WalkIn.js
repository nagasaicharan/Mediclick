import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text, TextInput, View, Button,Keyboard,Image,TouchableOpacity ,Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import Ripple from 'react-native-material-ripple';  
import { Container, Header, Left, Body, Right, Title,Content,ButtonBase} from 'native-base';
export default class Emergency extends React.Component {
    constructor(props) {
		super(props);
		this.state = { 
         
          
            email: "",
            name: "",
            password: "",
            loading: false,

        }
        
    }
    handleLogOut()
    {
        firebase.auth().signOut()
  .then(function() {
    this.props.navigation.navigate("MainScreen");
  })
  .catch(function(error) {
   console.log(error)
  });
    }
    handleSignUp = () => {
    const { email, password,name } = this.state
    if(this.state.email=="")
    {
     Snackbar.show({
       title: "Email cannot be empty",
        duration: Snackbar.LENGTH_SHORT,
   })
    }else if(this.state.password=="")
    {
     Snackbar.show({
       title: "Password Cannot be empty",
        duration: Snackbar.LENGTH_SHORT,
   })
    }else if(this.state.name=="")
    {
     Snackbar.show({
       title: "Name cannot be empty",
        duration: Snackbar.LENGTH_SHORT,
   })
    }else{
        this.setState({loading: true});
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
     .then((authData) => {this.setState({loading: false})
     firebase.database().ref(authData.uid).set({
        provider: authData.provider,
        name: name
      });


      this.props.navigation.navigate('Appointment')}
      ).catch(error =>{
   
      this.setState({ loading: false });
      Alert.alert(error.message)}

      )
    }
  
  }
  render() {
    return (
      <Container>
      <Content>
      <View style={{padding: 18,flex:1}}>
      <Image source={require("../images/logocolor.png")} style={{alignSelf: 'center',width: 200,height: 90,marginTop: 20}} resizeMode="contain"/>
      <Text style={{fontSize: 28,color: Globals.COLORAPP.YELLOWBUTTON,fontWeight: 'bold',alignSelf: 'center'}}>Book Your Appointment</Text>
          <Ripple>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,borderColor:Globals.COLORAPP.BLUE,marginTop: 15,borderWidth: 1.5}}>
                            <Text style={{color: Globals.COLORAPP.BLUE,fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>Emergency</Text>
                        </View>
          </Ripple>
          <Ripple>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,borderColor:Globals.COLORAPP.BLUE,marginTop: 15,borderWidth: 1.5}}>
                            <Text style={{color: Globals.COLORAPP.BLUE,fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>Walk-in</Text>
                        </View>
          </Ripple>
        

          <Ripple>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,borderColor:Globals.COLORAPP.BLUE,marginTop: 15,borderWidth: 1.5}}>
                            <Text style={{color: Globals.COLORAPP.BLUE,fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>Normal</Text>
                        </View>
          </Ripple>
         
          <Ripple>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,borderColor:Globals.COLORAPP.BLUE,marginTop: 45,borderWidth: 1.5}}>
                            <Text style={{color: Globals.COLORAPP.BLUE,fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>My Bookings</Text>
                        </View>
          </Ripple>
          <Ripple onPress={()=>this.handleLogOut()}>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,backgroundColor:Globals.COLORAPP.YELLOWBUTTON,marginTop: 15}}>
                            <Text style={{color: "white",fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>LOG OUT</Text>
                        </View>
          </Ripple>
        
        </View>
       
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}
