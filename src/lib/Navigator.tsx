import { NavigationActions, NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Amplitude from './Amplitude';
import Scheduler from './Scheduler';

import RegisterScreen from '../component/screen/RegisterScreen';
import LobbyScreen from '../component/screen/LobbyScreen';
import SettingScreen from '../component/screen/SettingScreen';
import TermsScreen from '../component/screen/TermsScreen';
import PrivacyScreen from '../component/screen/PrivacyScreen';
import CopyrightScreen from '../component/screen/CopyrightScreen';
import ArenaScreen from '../component/screen/ArenaScreen';


class Navigator {
    private _navigator;
    private backing: boolean = false;

    public init = (initialScreenName: string) :NavigationContainer => {
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
    
    public set = (navigator) => {
        this._navigator = navigator
    }

    public navigate = (routeName: string, params: any) => {
        Amplitude.info('Navigate' + routeName, null);
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }

    public back = () => {
        if (this.backing) return;
        this.backing = true;
        Scheduler.setTimeout('', () => this.backing = false, 1000);
        this._navigator.dispatch(
            NavigationActions.back()
        );
    }

}

export default new Navigator();