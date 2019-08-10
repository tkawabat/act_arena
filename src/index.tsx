import { createStackNavigator, createAppContainer } from 'react-navigation'

//画面
import LobbyScreen from './screen/LobbyScreen';
import Modal from './screen/Modal';
import ArenaScreen from './screen/ArenaScreen';


export const MainNavigation = createStackNavigator(
    {
        Main: { screen: LobbyScreen },
        Push: { screen: ArenaScreen },
    },
    { initialRouteName: 'Main', mode: 'card', headerMode: 'none' }
)

const Navigation = createStackNavigator(
    {
        MainNavigation: { screen: MainNavigation },
        Modal: { screen: Modal },
    },
    { initialRouteName: 'MainNavigation', mode: 'modal', headerMode: 'none' },
)

const App = createAppContainer(Navigation);

export default App;