import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text,FlatList,AsyncStorage, TextInput,ActivityIndicator, View,Keyboard,Image,TouchableOpacity ,Alert,TimePickerAndroid} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import Ripple from 'react-native-material-ripple';  
import { Container, Header, Left, Body, Right, Title,Content,Button,Icon as NIcon,Card} from 'native-base';

export default class BookingScreen extends React.Component {
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
                     this.setState({
                         result: snapshot.val()
                     });
                   }
                 
                 
                    });
             }
            
     }
     handleBook(doctor)
     {
       
            this.setState({loading:true});
            const data = this.props.navigation.getParam('data', 'nodata');
           
           var abc={
             "hospitalname" : data.name,
             "hospital_Address": data.shortAddress,
             "doctor_name": doctor.name,
             "qualification": doctor.qualification, 
            
              }
             // const userid = AsyncStorage.getItem('userid');
             let userid=""
              firebase.auth().onAuthStateChanged(user => {
                console.log(user);
                if(user)
                {
          userid=user._user.uid;
               }
              });
              console.log(userid);
            firebase.database().ref('users/'+userid+"/booking/"+doctor.name).set(abc).then((data)=>{
           
            this.setState({loading:false});
            Alert.alert(
                'Booking Success',
               '',
                [
                  
                  {text: 'My Booking', onPress: () => { this.props.navigation.navigate("MyBooking")}},
                ],
                { cancelable: false }
              )

           
            }).catch((error)=>{
                //error callback"
               // Alert.alert("Your already registered for the "+data2.name+" Register for another Events");
                this.setState({loading:false,fail: true});
                console.log('error ' , error)
            })
    

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
        
    <Card style={{padding: 10,borderRadius: 10}}>
        
        {/* <Image source={{uri:items.item.image}} style={{height: 60, width: 60,flex: 1}} resizeMode="contain"/> */}
        
                    <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15,fontSize: 18}}>Name: {items.item.name}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Qualification: {items.item.qualification}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Mobile Number: {items.item.phonenumber}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Field: {items.item.field}</Text>
                   <Ripple  onPress={()=>{this.handleBook(items.item)}}>
                   <View style={{backgroundColor: Globals.COLORAPP.BLUE,padding: 8,alignSelf: 'flex-end'}}><Text style={{fontWeight: 'bold',color: 'white',marginHorizontal: 8}}>BOOK NOW</Text></View></Ripple>
                  
                    {/* <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Available doctors</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Name: {items.item.doctors[0].name}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Qualification: {items.item.doctors[0].qualification}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Mobile Number: {items.item.doctors[0].phonenumber}</Text> */}
     
    </Card>
   
    );
}
  render() {
    const data = this.props.navigation.getParam('data', 'no-data');
   
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
                                    <Title>Booking</Title>
                                </Body>
                                <Right/>
                              
                        </Header>
      <Content>

      <View style={{padding: 18,flex:1}}>
      <Image source={{uri:data.image}} style={{height: 200, width: 200,alignSelf: 'center',borderRadius: 5,overflow: 'hidden'}} resizeMode="contain"/>
      <Text style={{fontWeight: 'bold', fontSize: 25, color: 'black',marginBottom: 5}}>{data.name}</Text>
      <Text >{data.fullAddress}</Text>
      <Text style={{ fontSize: 20, color: 'black',marginTop: 5}}>Available Doctors</Text>
      <FlatList
      data={data.doctors}
      renderItem={this.renderItem1}/>
                       
      </View>
       
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}
