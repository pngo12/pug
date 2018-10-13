import React, { Component } from 'react'
import { connect } from 'react-redux'

import { connectChatKit, subscribeToRoom } from '../Redux/Actions'
import { CHATKIT_USER_NAME } from '../../config/info'

import { SplashScreen } from 'expo';

import MainStack from './MainStack';

class Root extends Component {
  componentDidMount() {
    SplashScreen.preventAutoHide();
    this.props.connectChatKit(CHATKIT_USER_NAME)
  }

  render() {
    if (!this.props.doneInitialSubscriptions) {
      return null;
    } else {
      SplashScreen.hide()
      return <MainStack />;
    }
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  doneInitialSubscriptions: chatReducer.doneInitialSubscriptions
})

const mapDispatchToProps = dispatch => ({
  connectChatKit: userId => dispatch(connectChatKit(userId)),
  subscribeToRoom: roomId => dispatch(subscribeToRoom(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Root);