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
   var count=Object.keys(this.state.result).length;
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
