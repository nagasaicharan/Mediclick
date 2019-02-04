//  File Freshly Created by charan on 11 jan 2019
// Edited by charan to default login screen in react navigation

import {createStackNavigator,createAppContainer} from "react-navigation";
import MainScreen from "./MainScreen/MainScreen";
import Login from "./Loginandsignup/Login";
import SignUp from "./Loginandsignup/SignUp";
import Appointment from "./Catlog/Appointment";
const InitialNav = createStackNavigator(
{ 
  MainScreen: {screen: MainScreen},
  Login:{screen: Login},
  SignUp: {screen: SignUp},
  Appointment: {screen: Appointment},
},
  {
     headerMode: "none",
     initialRouteName: 'MainScreen',

  }
);


const InitialNav1 = createAppContainer(InitialNav);


export default InitialNav1;
