import { createStackNavigator, createAppContainer } from 'react-navigation';

import RegisterScreen from './RegisterScreen';
import TextScreen from './TextScreen';
import LobbyScreen from './LobbyScreen';
import SettingScreen from './SettingScreen';
import TermsScreen from './TermsScreen';
import PrivacyScreen from './PrivacyScreen';
import CopyrightScreen from './CopyrightScreen';
import Modal from './Modal';
import ArenaScreen from './ArenaScreen';


const MainNavigation = createStackNavigator(
    {
        Lobby: { screen: LobbyScreen },
        Register: { screen: RegisterScreen },
        Text: { screen: TextScreen },
        Setting: { screen: SettingScreen },
        Terms: { screen: TermsScreen },
        Privacy: { screen: PrivacyScreen },
        Copyright: { screen: CopyrightScreen },
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