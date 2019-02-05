import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text,FlatList, TextInput,ActivityIndicator, View,Keyboard,Image,TouchableOpacity ,Alert,TimePickerAndroid} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import Ripple from 'react-native-material-ripple';  
import { Container, Header, Left, Body, Right, Title,Content,Button,Icon as NIcon,Card} from 'native-base';

export default class Normal extends React.Component {
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
    componentDidMount(){
        this.handleEmergancy();
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
        <Ripple onPress={()=>this.props.navigation.navigate("Booking",{data: items.item})}>
    <Card style={{padding: 10,borderRadius: 10}}>
        <View style={{flexDirection: 'row'}}>
        <Image source={{uri:items.item.image}} style={{height: 60, width: 60,flex: 1}} resizeMode="contain"/>
        <View style={{flexDirection: 'column',flex:2}}>
                    <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15,fontSize: 18}}>{items.item.name}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>{items.item.shortAddress}</Text>
                   </View>
                    </View>
                    {/* <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Available doctors</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Name: {items.item.doctors[0].name}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Qualification: {items.item.doctors[0].qualification}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Mobile Number: {items.item.doctors[0].phonenumber}</Text> */}
     
    </Card>
    </Ripple>
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
                                    <Title>Normal Booking</Title>
                                </Body>
                                <Right/>
                              
                        </Header>
      <Content>

      <View style={{padding: 18,flex:1}}>
                {count!=0 ? <FlatList 
                    data={this.state.result}
                    renderItem={this.renderItem1}/>:<ActivityIndicator/>}
                           <View>
                          
                    {/* {this.state.noresultmessage? <Text style={{marginTop: 12,fontSize: 12}}>No Hospitals found in your Area</Text>:
                               <View>{data}</View>} */}
                           </View>
                      
      </View>
       
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}
