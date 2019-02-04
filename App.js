
// Applied redux store at highest root component
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
import React, {Component} from 'react';
import { AsyncStorage,AppRegistry,NetInfo,Alert } from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import InitialNav1 from './components/Route';

export default class App extends Component {
 
 
  

async componentDidMount() {
 // SplashScreen.hide();
 

}
// componentWillUnmount() {
//   this.notificationListener();
//   this.notificationOpenedListener();
// }

// async createNotificationListeners() {
//   /*
//   * Triggered when a particular notification has been received in foreground
//   * */
//   this.notificationListener = firebase.notifications().onNotification((notification) => {
//       const { title, body } = notification;
//       this.showAlert(title, body);
//   });

//   /*
//   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//   * */
//   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       const { title, body } = notificationOpen.notification;
//       this.showAlert(title, body);
//   });

//   /*
//   * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//   * */
//   const notificationOpen = await firebase.notifications().getInitialNotification();
//   if (notificationOpen) {
//       const { title, body } = notificationOpen.notification;
//       this.showAlert(title, body);
//   }
//   /*
//   * Triggered for data only payload in foreground
//   * */
//   this.messageListener = firebase.messaging().onMessage((message) => {
//     //process data message
//     console.log(JSON.stringify(message));
//   });
// }

// showAlert(title, body) {
//   Alert.alert(
//     title, body,
//     [
//         { text: 'OK', onPress: () => console.log('OK Pressed') },
//     ],
//     { cancelable: false },
//   );
// }


//   //1
// async checkPermission() {
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//     Alert.alert("entered");
//       this.getToken();
//   } else {
//     Alert.alert("entered2");
//       this.requestPermission();
//   }
// }

//   //3
// async getToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmToken', value);
//   if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//           // user has a device token
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//   }
// }

//   //2
// async requestPermission() {
//   try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//   } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//   }
// }
//   //1


  render() {
    return (
  
    <InitialNav1/>
    );
  }
}

  AppRegistry.registerComponent('tam', () =>App);

