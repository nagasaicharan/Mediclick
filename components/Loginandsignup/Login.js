import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text, TextInput, View, Button,Keyboard,Image,TouchableOpacity ,Alert} from 'react-native';
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
          
            password: "",
            loading: false,

        }
    }
  handleLogin = () => {
    const { email, password } = this.state
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
    } else{
        this.setState({loading: true});
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {this.setState({loading: false})
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
      <Text style={{fontSize: 28,color: Globals.COLORAPP.BLUE,fontWeight: 'bold',alignSelf: 'center'}}>Login</Text>
        
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

                      <TouchableOpacity onPress={this.handleLogin}>
                        <View style={{alignSelf: 'center',padding: 12,borderRadius: 5,backgroundColor:Globals.COLORAPP.BLUE,marginTop: 8}}>
                            <Text style={{color: 'white',fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
        

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                        <View style={{alignSelf: 'center',padding: 12,borderRadius: 5,backgroundColor:Globals.COLORAPP.BLUE,marginTop: 8}}>
                            <Text style={{color: 'white',fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>Don't have an account? Sign Up</Text>
                        </View>
                    </TouchableOpacity>
      
        </View>
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}