import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './Dashboard';

const SimpleApp = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
});


const RouteContainer = createAppContainer(SimpleApp);

export default RouteContainer