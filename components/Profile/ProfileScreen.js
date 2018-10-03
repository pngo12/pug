import React, { Component } from 'react';
import { Text, View } from 'react-native'

class ProfileScreen extends Component {
  state = {}
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Profile Screen!</Text>
      </View>
    );
  }
}

export default ProfileScreen;