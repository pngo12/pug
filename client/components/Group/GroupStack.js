import { createStackNavigator } from 'react-navigation'
import GroupScreen from './GroupScreen'
import ChatScreen from './ChatScreen'
import GameRooms from './GameRooms'

const GroupStack = createStackNavigator({
  GroupHome: GroupScreen,
  Chatroom: ChatScreen,
  Rooms: GameRooms
},
{
  initialRouteName: 'GroupHome'
});

export default GroupStack;