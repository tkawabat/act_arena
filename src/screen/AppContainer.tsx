import { createStackNavigator, createAppContainer } from 'react-navigation';

import RegisterScreen from './RegisterScreen';
import LobbyScreen from './LobbyScreen';
import Modal from './Modal';
import ArenaScreen from './ArenaScreen';

import UserStore from '../store/UserStore';


const initailScreen = UserStore.name ? 'Lobby' : 'Register';
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