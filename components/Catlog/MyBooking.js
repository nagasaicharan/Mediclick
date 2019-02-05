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
            result: {}

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
           
             loading: true
         }); 
         let userid=""
              firebase.auth().onAuthStateChanged(user => {
                console.log(user);
                if(user)
                {
          userid=user._user.uid;
               }
              });
              console.log(userid);
            firebase.database().ref('users/'+userid+"/booking/").on('value', (snapshot) => {
                        
                   console.log(snapshot.val());
                   this.setState({
                     loading:false,
                 
                 });
                   if(snapshot.val()===null)
                   {

                   }else
                   {
                     this.setState({
                         result: snapshot.val()
                     });
                    }
                 
                 
                 
          });
          
            
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
    var kkd=Object.keys(this.state.result);
    

        if(count!=0)
                  { 

                    Object.keys(this.state.result).forEach((key)=>{
                        var value = this.state.result[key];
                        data.push(<View style={{marginTop: 5}}>
   

               

                
                            <Card style={{padding: 5,borderRadius: 5}}>
                              
                        
                               
                                            <Text style={{color: 'black',marginLeft: 15,marginTop: 5}}>Hospital Name: {value.hospitalname}</Text>
                                           <Text style={{color: 'black',marginLeft: 15,marginTop: 8}}>Address: {value.hospital_Address}</Text>
                                           <Text style={{color: 'black',marginLeft: 15,marginTop: 8}}>Doctor Name: {value.doctor_name}</Text>
                                           <Text style={{color: 'black',marginLeft: 15,marginTop: 8,marginBottom: 5}}>Qualification: {value.qualification}</Text>
                                          

                             
                            </Card>
                                        
                                           
                                        </View>);
                        
                    });
                  
                  
                }else
                {
                    data.push(<Text style={{textAlign: 'center',color:Globals.COLORAPP.BLUE,fontWeight: 'bold'}}>No Bookings</Text>);
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
                                    <Title>My Bookings</Title>
                                </Body>
                                <Right/>
                              
                        </Header>
      <Content>

      {/* <View style={{padding: 18,flex:1}}>
                {count!=0 ? <FlatList 
                    data={this.state.result}
                    renderItem={this.renderItem1}/>:<ActivityIndicator/>}
                         
                      
      </View> */}
      <View style={{padding: 15}}>
                          
      {data}  
     </View>
    
       
        </Content>
        <Loader loading={this.state.loading}/>
     </Container>
    )
  }
}
