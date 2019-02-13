import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text,FlatList, TextInput, View,Keyboard,Image,TouchableOpacity ,Alert,TimePickerAndroid} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import Ripple from 'react-native-material-ripple';  
import { Container, Header, Left, Body, Right, Title,Content,Button,Icon as NIcon,Card} from 'native-base';

export default class Emergency extends React.Component {
    constructor(props) {
		super(props);
		this.state = { 
         
          
            email: "",
            name: "",
            password: "",
            loading: false,
            time: "",
            result: []

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
    handleEmergancy()
    {
        
             if(this.state.pincode=="")
             {
                     Snackbar.show({
                     title: "Please enter valid pincode",
                         duration: Snackbar.LENGTH_SHORT,
              })
             }else if(this.state.time==""){
                
                    Snackbar.show({
                    title: "Please select time",
                        duration: Snackbar.LENGTH_SHORT,
                   });
             }else{
                this.setState({
           
                    loading: true
                }); 
                
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
                     this.setState({
                         result: snapshot.val()
                     });
                   }
                 
                 
                    });
             }
            
     }
  async timePicker(){

    try {
        const {action, hour, minute} = await TimePickerAndroid.open({
            hour: 14,
            minute: 0,
            is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
            // Selected hour (0-23), minute (0-59)
            //Applying extra 0 before the hour/minute for better visibility
            // 9 minutes => 09 minutes
            var m=(minute<10)?"0"+minute:minute;
            var h=(hour<10)?"0"+hour:hour;
            this.setState({ time:h+":"+m})
        }
    } catch ({code, message}) {
        alert('Cannot open time picker'+message);
    }
}
renderItem1=(items)=>
{
    console.log(items.item);
    return(
    <Card style={{padding: 5}}>
        <View style={{flexDirection: 'row'}}>
        <Image source={{uri:items.item.image}} style={{height: 60, width: 60}} resizeMode="contain"/>
        <View style={{flexDirection: 'column'}}>
                    <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Hospital Name: {items.item.name}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Address: {items.item.fullAddress}</Text>
                   </View>
                    </View>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Available doctors</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Name: {items.item.doctors[0].name}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Qualification: {items.item.doctors[0].qualification}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Mobile Number: {items.item.doctors[0].phonenumber}</Text>
     
    </Card>
    );
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
   

                  {/* <FlatList
                  data={item}
                  renderItem={this.renderItem1}
                  /> */}

                
    <Card style={{padding: 5}}>
        <View style={{flexDirection: 'row'}}>
        <Image source={{uri:item.image}} style={{height: 60, width: 60}} resizeMode="contain"/>
        <View style={{flexDirection: 'column'}}>
                    <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Hospital Name: {item.name}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Address: {item.fullAddress}</Text>
                   </View>
                    </View>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Available doctors</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Name: {item.doctors[0].name}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Qualification: {item.doctors[0].qualification}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Mobile Number: {item.doctors[0].phonenumber}</Text>
     
    </Card>
                
                   {/* <View style={{flexDirection: 'column'}}>
                    <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Hospital Name: {items.item.name}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Address: {items.item.fullAddress}</Text>
                   </View>
                    </View>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Available doctors</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Name: {items.item.doctors[0].name}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Qualification: {items.item.doctors[0].qualification}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Mobile Number: {items.item.doctors[0].phonenumber}</Text> */}
                </View>);
                   
                  }});}
                  if(Object.keys(data).length==0)
                  {
                    data.push(<Text style={{marginTop: 12,fontSize: 12}}>No Hospitals found in your Area</Text>);
                
                  }
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
                                    <Title>WalkIn Booking</Title>
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
                     <Ripple onPress={()=>this.timePicker()}>
                     {this.state.time==""?<Text style={{color: 'black',fontSize: 20,textAlign: 'center'}}>SELECT TIME</Text>:<Text style={{color: 'black',fontSize: 20,textAlign: 'center'}}>Time : {this.state.time}</Text>}
                     </Ripple>
                     <Ripple onPress={()=>this.handleEmergancy()}>
                  <View style={{alignSelf: 'center',paddingHorizontal: 20,paddingVertical:15,borderRadius: 5,backgroundColor:Globals.COLORAPP.YELLOWBUTTON,marginTop: 15}}>
                            <Text style={{color: "white",fontWeight: 'bold',marginLeft: 8,marginRight: 8}}>SEARCH NOW</Text>
                        </View>
                        
                    </Ripple>

        
                           <View>
                          
                  
                               <View>{data}</View>
                           </View>
                      
      </View>
       
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}
