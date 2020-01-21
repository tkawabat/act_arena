import { createSwitchNavigator, createAppContainer } from 'react-navigation';
//import { createStackNavigator, } from 'react-navigation-stack';

import RegisterScreen from './RegisterScreen';
import LobbyScreen from './LobbyScreen';
import SettingScreen from './SettingScreen';
import TermsScreen from './TermsScreen';
import PrivacyScreen from './PrivacyScreen';
import CopyrightScreen from './CopyrightScreen';
//import Modal from './Modal';
import ArenaScreen from './ArenaScreen';



const MainNavigation = createSwitchNavigator(
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
        //mode: 'card',
        //headerMode: 'none',
        defaultNavigationOptions: {
            gestureEnabled: true,
        }
    }
)

// const Navigation = createStackNavigator(
//     {
//         MainNavigation: { screen: MainNavigation },
//         //Modal: { screen: Modal },
//     },
//     { initialRouteName: 'MainNavigation', mode: 'modal', headerMode: 'none' },
// )

export default createAppContainer(MainNavigation);