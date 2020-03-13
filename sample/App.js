import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Welcome from './src/Welcome';
// import {Dashboard, Setting, Video} from 'table-react-native-sdk';
import {TableScreen} from 'table-react-native-sdk';

const AuthStack = createStackNavigator(
  {
    Welcome: Welcome,
    TableScreen: TableScreen
  },

  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {},
  },
);

export default RouteContainer = createAppContainer(AuthStack);
