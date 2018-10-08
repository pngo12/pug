import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';

// Imports to setup Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './components/Redux/Reducers';

import GroupStack from './components/Group/GroupStack'
import ProfileStack from './components/Profile/ProfileStack'
import SettingsStack from './components/Settings/SettingsStack'

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

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default App = () => (
  <Provider store={store}>
    <TabNavigator />
  </Provider>
);