import { createStackNavigator, createAppContainer } from 'react-navigation';

import RegisterScreen from './RegisterScreen';
import TextScreen from './TextScreen';
import LobbyScreen from './LobbyScreen';
import Modal from './Modal';
import ArenaScreen from './ArenaScreen';


const MainNavigation = createStackNavigator(
    {
        Register: { screen: RegisterScreen },
        Text: { screen: TextScreen },
        Lobby: { screen: LobbyScreen },
        Arena: { screen: ArenaScreen },
    },
    { mode: 'card', headerMode: 'none' }
)

const Navigation = createStackNavigator(
    {
        MainNavigation: { screen: MainNavigation },
        Modal: { screen: Modal },
    },
    { initialRouteName: 'MainNavigation', mode: 'modal', headerMode: 'none' },
)

export default createAppContainer(Navigation);