import { createStackNavigator, createAppContainer } from 'react-navigation';

import RegisterScreen from './screen/RegisterScreen';
import LobbyScreen from './screen/LobbyScreen';
import Modal from './screen/Modal';
import ArenaScreen from './screen/ArenaScreen';

import UserStore from './store/UserStore';


const initailScreen = UserStore.name ? 'Lobby' : 'Register';
//const initailScreen = 'Lobby';
export const MainNavigation = createStackNavigator(
    {
        Register: { screen: RegisterScreen },
        Lobby: { screen: LobbyScreen },
        Arena: { screen: ArenaScreen },
    },
    { initialRouteName: initailScreen, mode: 'card', headerMode: 'none' }
)

const Navigation = createStackNavigator(
    {
        MainNavigation: { screen: MainNavigation },
        Modal: { screen: Modal },
    },
    { initialRouteName: 'MainNavigation', mode: 'modal', headerMode: 'none' },
)


export default createAppContainer(Navigation);