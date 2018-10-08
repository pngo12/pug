// import { Text, View, Image } from 'react-native'

import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import Chatkit from "@pusher/chatkit";
import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR,
  CHATKIT_ROOM_ID,
  CHATKIT_USER_NAME
} from '../../config/info';

import { View, Text } from 'react-native';
import { bubbleBackgroundColors } from '../../constants';

const extractData = (data) => {
  const { id, senderId, text, createdAt } = data;
  const incomingMessage = {
    _id: id,
    text: text,
    createdAt: new Date(createdAt),
    user: {
      _id: senderId,
      name: senderId,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
    }
  };
  return incomingMessage;
}


export default class GameScreen extends React.Component {
  state = {
    messages: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'A Nested Details Screen'),
    };
  };


  async componentDidMount() {
    // This will create a `tokenProvider` object. This object will be later used to make a Chatkit Manager instance.
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    // This will instantiate a `chatManager` object. This object can be used to subscribe to any number of rooms and users and corresponding messages.
    // For the purpose of this example we will use single room-user pair.
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider
    });

    // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
    let currentUser = await chatManager.connect()
    this.currentUser = currentUser;

    // Fill the Messages
    let messages = await this.currentUser.fetchMessages({
      roomId: CHATKIT_ROOM_ID,
      direction: 'older',
      limit: 100,
    })

    messages = messages.map(extractData).reverse();

    this.setState({ messages }, () => {
      this.currentUser.subscribeToRoom({
        roomId: CHATKIT_ROOM_ID,
        hooks: {
          onNewMessage: this.onReceive
        },
        messageLimit: 0
      });
    })
  }

  count = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1
    }))
  }

  onSend([message]) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: CHATKIT_ROOM_ID
    });
  }

  onReceive = (data) => {
    let incomingMessage = extractData(data)

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  renderBubble = (props) => {
    let username = props.currentMessage.user.name
    let color = this.getColor(username)
    if (props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage)) {
      return (
        <Bubble
          {...props}
          textStyle={{
          right: {
            color: 'white'
          },
          left: {
            color: 'white'
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: color
          }
        }}
        />
      );
    }
    return ( 
      <View>
        <Text style={{ fontSize: 10 }}>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
          textStyle={{
          right: {
            color: 'white'
          },
          left: {
            color: 'white'
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: color
          }
        }}
        />
      </View>
    );
  }

  getColor(username){
    let currentUsersInRoom = this.currentUser.users.map(user => user.id)
    let usernameIndex = currentUsersInRoom.findIndex(user => user === username)
    return bubbleBackgroundColors[usernameIndex];
  }

  render() {
    return (
      <View style={{ backgroundColor: "#F0F8FF", flex:1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: CHATKIT_USER_NAME
          }}
          renderBubble={this.renderBubble}
        />
      </View>
    )
  }
}