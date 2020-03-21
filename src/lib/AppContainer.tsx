import { NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RegisterScreen from '../component/screen/RegisterScreen';
import LobbyScreen from '../component/screen/LobbyScreen';
import SettingScreen from '../component/screen/SettingScreen';
import TermsScreen from '../component/screen/TermsScreen';
import PrivacyScreen from '../component/screen/PrivacyScreen';
import CopyrightScreen from '../component/screen/CopyrightScreen';
import ArenaScreen from '../component/screen/ArenaScreen';
import TheaterScreen from '../component/screen/TheaterScreen';


export const createContainer = (initialScreenName: string) :NavigationContainer => {
    const Navigation = createStackNavigator(
        {
            Lobby: { screen: LobbyScreen },
            Register: { screen: RegisterScreen },
            Setting: { screen: SettingScreen },
            Terms: { screen: TermsScreen },
            Privacy: { screen: PrivacyScreen },
            Copyright: { screen: CopyrightScreen },
            Arena: { screen: ArenaScreen },
            Theater: { screen: TheaterScreen },
        },
        {
            initialRouteName: initialScreenName,
            mode: 'card',
            headerMode: 'none',
            defaultNavigationOptions: {
                gestureEnabled: false,
            }
        }
    )
    return createAppContainer(Navigation);
}