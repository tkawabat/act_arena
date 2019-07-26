// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import {
//     createSwitchNavigator,
//     createBottomTabNavigator,
//     createStackNavigator,
//     createAppContainer,
// } from 'react-navigation';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { Component } from 'react';
import Navigator from './src/index';

export default class App extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}