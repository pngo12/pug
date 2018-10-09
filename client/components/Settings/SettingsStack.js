import { createStackNavigator } from 'react-navigation'
import SettingsScreen from './SettingsScreen'

const SettingsStack = createStackNavigator({
  SettingsHome: SettingsScreen
},
{
  initialRouteName: 'SettingsHome'
});

export default SettingsStack;