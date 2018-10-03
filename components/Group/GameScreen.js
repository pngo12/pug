import React, { Component } from 'react';
import { Text, View, Image } from 'react-native'

class GameScreen extends Component {
  state = {}


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Game Screen: {this.props.navigation.getParam('title', 'default')}</Text>
        <Image
          source={{ uri: this.props.navigation.getParam('img_url', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png') }}
          style={{ height: 300, width: 300 }}
        />
      </View>
    );
  }
}

export default GameScreen;