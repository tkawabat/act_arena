import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RegisterScreen from './RegisterScreen';
import LobbyScreen from './LobbyScreen';
import SettingScreen from './SettingScreen';
import TermsScreen from './TermsScreen';
import PrivacyScreen from './PrivacyScreen';
import CopyrightScreen from './CopyrightScreen';
//import Modal from './Modal';
import ArenaScreen from './ArenaScreen';


const Navigation = createStackNavigator(
    {
        Lobby: { screen: LobbyScreen},
        Register: { screen: RegisterScreen},
        Setting: { screen: SettingScreen},
        Terms: { screen: TermsScreen},
        Privacy: { screen: PrivacyScreen},
        Copyright: { screen: CopyrightScreen},
        Arena: { screen: ArenaScreen},
    },
    {
        initialRouteName: 'Lobby',
        mode: 'card',
        headerMode: 'none',
        defaultNavigationOptions: {
            gestureEnabled: false,
        }
    }
)


export default createAppContainer(Navigation);