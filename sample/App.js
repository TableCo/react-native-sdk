import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Welcome from './src/Welcome';
import {Dashboard, Setting, Video} from 'ta-table-sdk-react-native';

const AuthStack = createStackNavigator(
  {
    Welcome: Welcome,
    Dashboard: Dashboard,
    Setting: Setting,
    Video: Video,
  },

  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      // header: null,
    },
  },
);

export default RouteContainer = createAppContainer(AuthStack);
