import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchJoinableRooms,
  fetchJoinedRooms,
  changeChatRoom
} from '../Redux/Actions';

import { Text, View, Button, TextInput, Modal } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'

import { CHATKIT_USER_NAME } from '../../config/info';
import {dropdownSelection} from '../../constants/index';

class GameRooms extends Component {
  state = {
    name: '',
    occupancy: 0,
    isVisible: false,
    modalVisible: false,
  }

  componentDidMount() {
    const { fetchJoinableRooms, fetchJoinedRooms, navigation } = this.props;
    const game = navigation.getParam('serverName', "BAD SERVER GAME PARAM");

    fetchJoinableRooms(game, CHATKIT_USER_NAME);
    fetchJoinedRooms(game, CHATKIT_USER_NAME);
  }

  selectRoom = room => () => {
    const { navigation, changeChatRoom } = this.props;
    changeChatRoom(room.id);
    navigation.navigate('Chatroom', { title: room.name });
  }

  toggleModal = () => this.setState({ modalVisible: !this.state.modalVisible })

  handleNewRoom = () => {
    const game = navigation.getParam('serverName', "BAD SERVER GAME PARAM");
    const { name, occupancy } = this.state;
    this.props.createNewRoom(name, CHATKIT_USER_NAME, game, occupancy);
  }

  render() {
    /**
     * ISSUE:
     * 
     * Should render a loading gif whenever in process of fetching new JoinableRooms / JoinedRooms
     * Currently showing preloaded rooms before changing to new ones
     * 
     */

    const { joinableRooms, joinedRooms } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            joinedRooms.map((room) => (
              <ListItem
                onPress={this.selectRoom(room)}
                key={room.id}
                title={room.name}
              />
            ))
          }
        </List>
        {
          /* 
          Need to implement joining a room that I am currently not in; 
          otherwise if I click the room it will yell that I am not authorized
          */
        }
        <List containerStyle={{ marginBottom: 20 }}>
          {
            joinableRooms.map((room) => (
              <ListItem
                onPress={this.selectRoom(room)}
                key={room.id}
                title={room.name}
              />
            ))
          }
        </List>
        <Button
          onPress={this.toggleModal}
          title='Create new room'
          style={{ flex: 1 }}
        />
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text>Give your room a name</Text>
              <TextInput
                style={{ height: 40, width: 240, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => this.setState({ roomName: text })}
              />
              <View style={{width: 240}}>
                <Dropdown
                data={dropdownSelection}
                onChangeText={text => this.setState({occupancy:text})}
                label="Max number of Occupants?"
                />
              </View>
              <Button
                onPress={this.handleNewRoom}
                title='Create room'
                style={{ flex: 1 }} />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ roomReducer }) => ({
  joinableRooms: roomReducer.joinableRooms,
  joinedRooms: roomReducer.joinedRooms
})

const mapDispatchToProps = dispatch => ({
  changeChatRoom: roomId => dispatch(changeChatRoom(roomId)),
  fetchJoinableRooms: (game, userId) => dispatch(fetchJoinableRooms(game, userId)),
  fetchJoinedRooms: (game, userId) => dispatch(fetchJoinedRooms(game, userId)),
  createNewRoom: (name, creatorId, game, occupancy) => dispatch(createNewRoom(name, creatorId, game, occupancy))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRooms);