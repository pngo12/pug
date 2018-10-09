import React, { Component } from 'react';
import { Text, View } from 'react-native'

import { List, ListItem } from 'react-native-elements'

const list = [
  {
    title: "PUBG",
    img_url: "https://pngimg.com/uploads/pubg/pubg_PNG33.png"
  },
  {
    title: "Fortnite",
    img_url: "https://res.cloudinary.com/teepublic/image/private/s--8LWtGSfC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1522032181/production/designs/2529444_0.jpg"
  },
  {
    title: "League of Legends",
    img_url: "https://i.kym-cdn.com/photos/images/newsfeed/000/691/679/f7b.jpg"
  },
  {
    title: "DOTA 2",
    img_url: "https://vignette.wikia.nocookie.net/defenseoftheancients/images/6/64/Dota_2_Logo_only.png/revision/latest?cb=20110914005751"
  },
];

class GroupScreen extends Component {
  state = {}

  selectGroup = (gameTitle, img_url) => () => {
    this.props.navigation.navigate('Game', { title: gameTitle, img_url });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            list.map((l) => (
              <ListItem
                onPress={this.selectGroup(l.title, l.img_url)}
                roundAvatar
                avatar={{ uri: l.img_url }}
                key={l.title}
                title={l.title}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

export default GroupScreen;