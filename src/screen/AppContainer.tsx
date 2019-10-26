import { createStackNavigator, createAppContainer } from 'react-navigation';

import RegisterScreen from './RegisterScreen';
import LobbyScreen from './LobbyScreen';
import SettingScreen from './SettingScreen';
import TermsScreen from './TermsScreen';
import PrivacyScreen from './PrivacyScreen';
import CopyrightScreen from './CopyrightScreen';
//import Modal from './Modal';
import ArenaScreen from './ArenaScreen';


const navigationOptions = {
    gesturesEnabled: false,
};

const MainNavigation = createStackNavigator(
    {
        Lobby: { screen: LobbyScreen, navigationOptions: navigationOptions },
        Register: { screen: RegisterScreen, navigationOptions: navigationOptions },
        Setting: { screen: SettingScreen, navigationOptions: navigationOptions },
        Terms: { screen: TermsScreen, navigationOptions: navigationOptions },
        Privacy: { screen: PrivacyScreen, navigationOptions: navigationOptions },
        Copyright: { screen: CopyrightScreen, navigationOptions: navigationOptions },
        Arena: { screen: ArenaScreen, navigationOptions: navigationOptions },
    },
    { mode: 'card', headerMode: 'none' }
)

const Navigation = createStackNavigator(
    {
        MainNavigation: { screen: MainNavigation },
        //Modal: { screen: Modal },
    },
    { initialRouteName: 'MainNavigation', mode: 'modal', headerMode: 'none' },
)

export default createAppContainer(Navigation);