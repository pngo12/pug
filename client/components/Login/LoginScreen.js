import React, { Component } from 'react';

import { Text, View, ImageBackground, TextInput, TouchableHighlight, Image } from 'react-native';
import Background from '../../assets/Background1.jpg';
import Logo from '../../assets/puglogohead.png';
import { Ionicons } from '@expo/vector-icons';

import LoginStyle from '../Styles/Login';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  LoginCheck = () => {
    this.props.navigation.navigate('Home')
  }

  render() {

    const {
      container,
      inputContainer,
      inputIcon,
      inputs,
      buttonContainer,
      loginButton,
      loginText
    } = LoginStyle;

    return (
      <ImageBackground source={Background} style={{ width: '100%', height: '100%' }}>
        <View style={container}>
          <Image source={Logo} style={{ flex: 0.45, marginBottom: 30 }} resizeMode="contain" />
          <View style={inputContainer}>
            <Ionicons style={inputIcon} name="md-mail"></Ionicons>
            <TextInput style={inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
          </View>

          <View style={inputContainer}>
            <Ionicons style={inputIcon} name="md-key"></Ionicons>
            <TextInput style={inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>

          <TouchableHighlight style={[buttonContainer, loginButton]} onPress={this.LoginCheck}>
            <Text style={loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[buttonContainer, { height: 20, width: 150 }]} onPress={() => { this.props.navigation.navigate('Forgot') }}>
            <Text>Forgot your password?</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[buttonContainer, { height: 20, width: 150 }]} onPress={() => { this.props.navigation.navigate('SignUp') }}>
            <Text>Register</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}


export default Login;