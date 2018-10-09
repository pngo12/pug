import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchValidGames } from '../Redux/Actions';

import { Text, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'


class GroupScreen extends Component {
  state = {}

  componentDidMount() {
    this.props.fetchValidGames();
  }

  selectGroup = serverName => () => {
    this.props.navigation.navigate('Rooms', { serverName });
  }

  render() {
    const { games } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            games.map((game) => (
              <ListItem
                onPress={this.selectGroup(game.server)}
                roundAvatar
                avatar={{ uri: game.img_url }}
                key={game.title}
                title={game.title}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  games: gameReducer.validGames
})

const mapDispatchToProps = dispatch => ({
  fetchValidGames: () => dispatch(fetchValidGames())
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupScreen);