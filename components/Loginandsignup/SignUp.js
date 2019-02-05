import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text, TextInput, View, Button,Keyboard,Image,TouchableOpacity ,Alert,AsyncStorage} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import { Container, Header, Left, Body, Right, Title,Content,ButtonBase} from 'native-base';
export default class Login extends React.Component {
    constructor(props) {
		super(props);
		this.state = { 
         
          
            email: "",
            name: "",
            password: "",
            loading: false,

        }
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
     firebase.database().ref("users/"+authData.user._user.uid).set({
       
        name: name
      });
      AsyncStorage.setItem('userid',authData.user._user.uid);
      console.log(authData.user._user.uid);

      this.props.navigation.navigate('Appoinment')}
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
      <Text style={{fontSize: 28,color: Globals.COLORAPP.BLUE,fontWeight: 'bold',alignSelf: 'center'}}>Sign up</Text>
          
      <TextField
                          
                          label='Name'
                          tintColor={Globals.COLORAPP.BLUE}
                          onChangeText={ (value) => this.setState({ name: value}) }
                        value={this.state.name}
                     />
          <TextField
                          
                          label='Email'
                          tintColor={Globals.COLORAPP.BLUE}
                          onChangeText={ (value) => this.setState({ email: value}) }
                        value={this.state.email}
                     />
                    
       <TextField
                     tintColor={Globals.COLORAPP.BLUE}
                          label='Password'
                          onSubmitEditing={Keyboard.dismiss} 
                          onChangeText={ (value) => this.setState({ password: value}) }
                        value={this.state.password}
                        secureTextEntry={true}
                     />

                      <TouchableOpacity onPress={this.handleSignUp}>
                        <View style={{alignSelf: 'center',padding: 12,borderRadius: 5,backgroundColor:Globals.COLORAPP.BLUE,marginTop: 8}}>
                            <Text style={{color: 'white',fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>SIGNUP</Text>
                        </View>
                    </TouchableOpacity>
        

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <View style={{alignSelf: 'center',padding: 12,borderRadius: 5,backgroundColor:Globals.COLORAPP.BLUE,marginTop: 8}}>
                            <Text style={{color: 'white',fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>Already have an account? Login</Text>
                        </View>
                    </TouchableOpacity>
      
        </View>
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}
