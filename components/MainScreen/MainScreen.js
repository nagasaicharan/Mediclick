import React, { Component} from 'react';
import { AsyncStorage,View, Text,TouchableWithoutFeedback,Image} from 'react-native';
import { Container} from 'native-base';
import Swiper from 'react-native-swiper';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Globals from '../Globals/Globals';
import EIcon from 'react-native-vector-icons/Entypo';


export default class FundDescription extends Component 
{
      constructor(props) 
      {
            super(props);	 
            this.state = { currentUser: null }
      }
     componentDidMount(){
           // check if user already loggin or not by check value in async-storage
           firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if(user)
            {
            this.props.navigation.navigate('Appointment')}
          }
            )
          // this.checkLoggedOrNot();
     }


     
    
      

     async checkLoggedOrNot(){
       console.log("Asac")
           try {
          

              
          

           } 
           catch (error){
                 
           } 
     }
     render() 
      {
       
            return (
                  <Container>
                        <View style={{flex:1}}>
                            <Image source={require("../images/logocolor.png")} style={{alignSelf: 'center',width: 200,height: 90,marginTop: 20}} resizeMode="contain"/>
                              <Swiper   showsButtons={false}
                                          dotColor={'#bababa'}
                                          autoplay={true}
                                          activeDotColor={Globals.COLORAPP.BLUE}   >
                                    <View style={{flex: 1,
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      backgroundColor: '#fff',
                                                      paddingBottom:40}}>

                                         <Image source={{uri: "https://www.rd.com/wp-content/uploads/2017/09/02_doctor_Insider-Tips-to-Choosing-the-Best-Primary-Care-Doctor_519507367_Stokkete.jpg"}} style={{height: 250,width: 250}}/> 
                                          <Text style={{marginTop:12,fontSize:24}}>Welcome to MediClick</Text>
                                        
                                    </View>
                                    <View style={{flex: 1,
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      backgroundColor: '#fff',
                                                      paddingBottom:40}}>

                                        <Image source={{uri: "https://i2-prod.mirror.co.uk/interactives/article12645227.ece/ALTERNATES/s615/doctor.jpg"}} style={{height: 250,width: 250}}/> 
                                          <Text style={{marginTop:12,fontSize:24}}>Choose your Desired Doctor</Text>
                                         

                                    </View>

                                    <View style={{flex: 1,
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      backgroundColor: '#fff',
                                                      paddingBottom:40}}>
                                          <Image source={{uri: "https://www.parkhospital.in/wp-content/uploads/2017/07/kalyani-hos.jpg"}} style={{height: 250,width: 250}}/> 
                                          <Text style={{marginTop:12,fontSize:24}}>We are here at Emergency</Text>

                                    </View>
                              
                        </Swiper> 
                              <View style={{flexDirection: 'column',justifyContent: 'center',padding: 8}}>
                                    <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate("Login")}>
                                          <View style={{padding:5,backgroundColor: Globals.COLORAPP.BLUE,flexDirection:'row',alignSelf: 'center',alignItems:'center',width: 280,justifyContent: 'center'}}>
                                                <EIcon name="login" color="white" size={16} style={{marginLeft: 18}}/> 
                                                <Text style={{color:'white', fontSize: 16, marginLeft: 12,marginRight: 18,fontWeight: '600'}}>Login</Text>
                                          </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate("SignUp")}>
                                    <View style={{padding:5,backgroundColor: Globals.COLORAPP.BLUE,flexDirection:'row',alignSelf: 'center',alignItems:'center',marginTop: 9,width: 280,justifyContent: 'center'}}>
                                          <EIcon name="add-user" color="white" size={16} style={{marginLeft: 20}}/> 
                                          <Text style={{color:'white', fontSize: 16, marginLeft: 12,marginRight: 8,fontWeight: 'bold',alignSelf: 'center'}}>Sign Up</Text>
                                    </View>
                                    </TouchableWithoutFeedback>
                              </View>  
                         </View>
            </Container>
        
      );
    }
  }
