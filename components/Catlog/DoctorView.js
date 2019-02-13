import React from 'react'
import firebase from 'react-native-firebase';
import { StyleSheet, Text,Modal,ScrollView, TextInput,ActivityIndicator, View,Keyboard,Image,TouchableOpacity ,Alert,Dimensions} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { TextField } from 'react-native-material-textfield';
import Globals from "../Globals/Globals";
import Loader from "../Loader/Loader";
import FIcon from "react-native-vector-icons/FontAwesome";
import Ripple from 'react-native-material-ripple';  
import { Container, Header, Left, Body, Right, Title,Content,Button,Icon as NIcon,Card} from 'native-base';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default class BookingScreen extends React.Component {
    constructor(props) {
		super(props);
		this.state = { 
         
          
            email: "",
            name: "",
            age: "",
            loading: false,
            number: "",
            result: [],
            modalVisible:false,

        }
        
    }
   
  
     handleBook()
     {

        if(this.state.name==""||this.state.name==null)
        {
            Snackbar.show({
                title: "Please Enter your Name",
                 duration: Snackbar.LENGTH_SHORT,
               });
        }else if(this.state.age==""||this.state.age==null)
        {
            Snackbar.show({
                title: "Please Enter your Age",
                 duration: Snackbar.LENGTH_SHORT,
               });
        }
        else if(this.state.number==""||this.state.number==null)
        {
            Snackbar.show({
                title: "Please Enter your Mobile Number",
                 duration: Snackbar.LENGTH_SHORT,
               });
        }else{
       
            this.setState({loading:true});
            
           
           var abc={
             "hospitalname" : this.props.hospitaldata.name,
             "hospital_Address": this.props.hospitaldata.shortAddress,
             "doctor_name": this.props.data.name,
             "qualification": this.props.data.qualification, 
             "patient_name": this.state.name,
             "patient_age": this.state.age,
             "patient_phone": this.state.number
           
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
             
            firebase.database().ref('users/'+userid+"/booking/"+this.props.data.name).set(abc).then(()=>{
           
            this.setState({loading:false,modalVisible:false});
            Alert.alert(
                'Booking Success',
               'You can visit the hospital in 9.00AM to 4.00PM',
                [
                  
                  {text: 'My Booking', onPress: () => { this.props.propw.navigation.navigate("MyBooking")}},
                ],
                { cancelable: false }
              )

           
            }).catch((error)=>{
                //error callback"
               // Alert.alert("Your already registered for the "+this.props.data.hospitaldata2.name+" Register for another Events");
                this.setState({loading:false,fail: true});
                console.log('error ' , error)
            })
        }

     }
     handleBook1()
     {
       this.setState({modalVisible: true})
     }



  render() {
    
   
    return (
<View>
        <Card style={{padding: 10,borderRadius: 10}}>
        
        {/* <Image source={{uri:this.props.data.image}} style={{height: 60, width: 60,flex: 1}} resizeMode="contain"/> */}
        
                    <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15,fontSize: 18}}>Name: {this.props.data.name}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Qualification: {this.props.data.qualification}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Mobile Number: {this.props.data.phonenumber}</Text>
                   <Text style={{color: 'black',fontWeight: 'bold',marginLeft: 15}}>Field: {this.props.data.field}</Text>
                   <Ripple  onPress={()=>{this.handleBook1()}}>
                   <View style={{backgroundColor: Globals.COLORAPP.BLUE,padding: 8,alignSelf: 'flex-end'}}><Text style={{fontWeight: 'bold',color: 'white',marginHorizontal: 8}}>BOOK NOW</Text></View></Ripple>
                  
                    {/* <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Available doctors</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Name: {this.props.data.doctors[0].name}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Qualification: {this.props.data.doctors[0].qualification}</Text>
                    <Text style={{color: 'black',fontWeight: 'bold',marginTop: 5}}>Mobile Number: {this.props.data.doctors[0].phonenumber}</Text> */}
     
    </Card>
    <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible:false})
          }}>
          <View style={{alignItems: 'center',justifyContent: 'center',flex: 1, backgroundColor: '#00000040'}}>
            <Card style={{backgroundColor: 'white',padding: 15,flexDirection: 'column',borderRadius: 3,display: 'flex',width: SCREEN_WIDTH-SCREEN_WIDTH/5,overflow:'hidden'}}>
            
             <View style={{flexDirection: 'row',alignItems: 'center'}}>
             <Left>
               <Text style={{color: 'black',fontSize: 18}}>Add Patient Details</Text>
             </Left>
             <Right>
                  <Ripple
                    onPress={() => {
                      this.setState({modalVisible:false});
                    }}>
                    <FIcon name="close" size={25} color="black"/>
                  </Ripple>
              </Right>
              </View>
              <ScrollView>
              <TextField
                          
                          label='Name'
                          tintColor={Globals.COLORAPP.BLUE}
                          onChangeText={ (value) => this.setState({ name: value}) }
                        value={this.state.name}
                     />
                      <TextField
                          
                          label='Age'
                          tintColor={Globals.COLORAPP.BLUE}
                          onChangeText={ (value) => this.setState({ age: value}) }
                        value={this.state.age}
                        keyboardType="numeric"
                        maxLength={3}

                     />
                      <TextField
                          
                          label='Mobile Number'
                          tintColor={Globals.COLORAPP.BLUE}
                          onChangeText={ (value) => this.setState({ number: value}) }
                        value={this.state.number}
                        keyboardType="numeric"
                        maxLength={10}

                     /> 
                     <Ripple onPress={()=> this.handleBook()}>
                     <Card style={{alignItems: 'center',padding: 18,borderRadius: 5,backgroundColor: Globals.COLORAPP.BLUE}}>
                        <Text style={{fontWeight: 'bold',color: 'white'}}>
                             LETS GO
                        </Text>


                     </Card>
                     </Ripple>
                     </ScrollView>
                     </Card>
                     </View>
                     </Modal>
                     <Loader loading={this.state.loading}/>
         </View>
    )
  }
}
