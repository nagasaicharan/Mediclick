import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text, TextInput, View, Button,Keyboard,Image,TouchableOpacity ,Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import Ripple from 'react-native-material-ripple';  
import { Container, Header, Left, Body, Right, Title,Content,ButtonBase} from 'native-base';
export default class Appointment extends React.Component {
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
            .then(()=> {
                this.props.navigation.navigate("MainScreen");
            })
        
            .catch((error) =>{
            console.log(error)
            });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
        this.subs.forEach((sub) => {
          sub.remove();
        });
      }

      handleBackButton = () => {
        Alert.alert("Confirm exit", "Do you want to quit the app?", [
          { text: "OK", onPress: () => BackHandler.exitApp() },
          { text: "CANCEL" }
        ]);
        return true;
      };

      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }


    
  render() {
    return (
      <Container>
      <Content>
      <View style={{padding: 18,flex:1}}>
      <Image source={require("../images/logocolor.png")} style={{alignSelf: 'center',width: 200,height: 90,marginTop: 20}} resizeMode="contain"/>
      <Text style={{fontSize: 28,color: Globals.COLORAPP.YELLOWBUTTON,fontWeight: 'bold',alignSelf: 'center'}}>Book Your Appointment</Text>
          <Ripple onPress={()=>{this.props.navigation.navigate("Emergancy")}}>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,borderColor:Globals.COLORAPP.BLUE,marginTop: 15,borderWidth: 1.5}}>
                            <Text style={{color: Globals.COLORAPP.BLUE,fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>Emergency</Text>
                        </View>
          </Ripple>
          <Ripple onPress={()=>{this.props.navigation.navigate("Emergancy")}}>
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
