import { createStackNavigator } from 'react-navigation'
import GroupScreen from './GroupScreen'
import GameScreen from './GameScreen'

const GroupStack = createStackNavigator({
  GroupHome: GroupScreen,
  Game: GameScreen
},
{
  initialRouteName: 'GroupHome'
});

export default GroupStack;