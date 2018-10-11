import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';

import GroupStack from './Group/GroupStack'
import ProfileStack from './Profile/ProfileStack'
import SettingsStack from './Settings/SettingsStack'

import { connectChatKit, subscribeToRoom } from './Redux/Actions'
import { CHATKIT_USER_NAME } from '../config/info'



const TabNavigator = createBottomTabNavigator(
  {
    Home: GroupStack,
    Profile: ProfileStack,
    Settings: SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-cog${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);


class Root extends Component {

  componentDidMount() {
    this.props.connectChatKit(CHATKIT_USER_NAME)
  }

  render() {
    return <TabNavigator />;
  }
}

const mapDispatchToProps = dispatch => ({
  connectChatKit: userId => dispatch(connectChatKit(userId)),
  subscribeToRoom: roomId => dispatch(subscribeToRoom(roomId))
})

export default connect(null, mapDispatchToProps)(Root);