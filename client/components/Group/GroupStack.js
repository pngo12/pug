import { createStackNavigator } from 'react-navigation'
import GroupScreen from './GroupScreen'
import GameScreen from './GameScreen'
import GameRooms from './GameRooms'

const GroupStack = createStackNavigator({
  GroupHome: GroupScreen,
  Game: GameScreen,
  Rooms: GameRooms
},
{
  initialRouteName: 'GroupHome'
});

export default GroupStack;