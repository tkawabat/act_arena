import { NavigationActions, NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Amplitude from './Amplitude';
import Scheduler from './Scheduler';
import AppContainer from './AppContainer';


class Navigator {
    private _navigator;
    private backing: boolean = false;
    
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