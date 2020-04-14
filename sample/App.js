import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Welcome from './src/Welcome'
import {TableScreen} from 'table-react-native-sdk'

const AuthStack = createStackNavigator(
    {
        Welcome: Welcome,

        // Ensure that the TableScreen is added to your navigator so that you can reference it later
        TableScreen: TableScreen
    },

    {
        initialRouteName: 'Welcome',
        defaultNavigationOptions: {},
    },
)

export default RouteContainer = createAppContainer(AuthStack)
