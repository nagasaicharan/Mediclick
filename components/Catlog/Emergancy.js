import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text, TextInput, View,ScrollView,Image,TouchableOpacity ,Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import Ripple from 'react-native-material-ripple';  

import { Container, Header, Left, Body, Right, Title,Content,Button,Icon as NIcon} from 'native-base';
export default class Emergency extends React.Component {
    constructor(props) {
		super(props);
		this.state = { 
         
          
            email: "",
            name: "",
            password: "",
            loading: false,
            pincode: "",
            result: {},
            noresultmessage: false
        

        }
        
    }
  
    
    handleEmergancy()
   {
        this.setState({
            noresultmessage:true,
            loading: true
        }); 
            if(this.state.pincode=="")
            {
                    Snackbar.show({
                    title: "Please enter valid pincode",
                        duration: Snackbar.LENGTH_SHORT,
             })
            }else{
                console.log("entered");
          firebase.database().ref("hospitals/").on('value', (snapshot) => {
         
                  console.log(snapshot.val());
                  this.setState({
                    loading:false,
                
                });
                  if(snapshot.val()===null)
                  {
                    this.setState({
                        noresultmessage:true,
                    
                    }); 
                  }else{
                    var key2 = Object.keys(snapshot.val())[0];  
                      
                    this.setState({
                        result: snapshot.val()
                    });
                  }
                
                
                   });
            }
           
    }
    
  
 
  render() {
    let data=[];
    var count = Object.keys(this.state.result).length;
        if(count!=0)
                  { 
                 

                    this.state.result.map((item, index) => {
                        if(item.pincode==this.state.pincode)
                        {
                            data.push(<View style={{marginTop: 5}}>
                                <View style={{flexDirection: 'row'}}>
                                   <Image source={{uri: item.image}} style={{height: 60, width: 60}} resizeMode="contain"/>
                                   <View style={{flexDirection: 'column'}}>
                                    <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Hospital Name: {item.name}</Text>
                                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Address: {item.fullAddress}</Text>
                                   </View>
                                    </View>
                                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Available doctors</Text>
                                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Name: {item.doctors[0].name}</Text>
                                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Qualification: {item.doctors[0].qualification}</Text>
                                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Mobile Number: {item.doctors[0].phonenumber}</Text>
                                </View>);
                        }
                      })
               
                   
                  }else{

                  }
   // data.push(<Text style={{marginTop: 12,fontSize: 12}}>No Hospitals found in your Area</Text>);
    return (
      <Container>
        <Header style={{backgroundColor: Globals.COLORAPP.BLUE}}>
                                <Left>
                                    <Button transparent
                                    onPress={() => this.props.navigation.goBack()}>
                                    <NIcon name='arrow-back'/>
                                    </Button>
                                </Left>
                                <Body>
                                    <Title>Emergency Booking</Title>
                                </Body>
                                <Right/>
                              
                        </Header>
      <Content>
      <View style={{padding: 18,flex:1}}>
      <TextField
                          
                          label='Enter PinCode'
                          tintColor={Globals.COLORAPP.BLUE}
                          onChangeText={ (value) => this.setState({ pincode: value}) }
                        value={this.state.pincode}
                        keyboardType="numeric"
                        maxLength={6}
                     />
                     <Ripple onPress={()=>this.handleEmergancy()}>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,backgroundColor:Globals.COLORAPP.YELLOWBUTTON,marginTop: 15}}>
                            <Text style={{color: "white",fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>SEARCH NOW</Text>
                        </View>
                        
                    </Ripple>
        
                           <View>
                          
                    {this.state.noresultmessage? <Text style={{marginTop: 12,fontSize: 12}}>No Hospitals found in your Area</Text>:
                               <View>{data}</View>}
                           </View>
                      
      </View>
       
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}
