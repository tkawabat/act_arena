import { NavigationActions, NavigationContainerComponent, } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Amplitude from './Amplitude';
import Scheduler from './Scheduler';


class Navigator {
    private _navigator:NavigationContainerComponent;
    private backing: boolean = false;

    get routes():any[] { return this._navigator.state.nav.routes; }
    get isInit():boolean {
        return this.routes.length <= 1;
    }

    get currentScreen():string {
        return this.routes[this.routes.length-1].routeName;
    }

    public set = (navigator:NavigationContainerComponent) => {
        this._navigator = navigator
    }

    public navigate = (screen: string, params: any) => {
        Amplitude.info('Navigate' + screen, null);
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName: screen,
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

    public backTo = (screen:string) => {
        if (this.backing) return;
        this.backing = true;
        Scheduler.setTimeout('', () => {
            this.backing = false;
        }, 1000);

        const index = this.routes.findIndex((v) => v.routeName === screen);
        if (index === -1) return;
        const n = this.routes.length - index + 1;

        for (let i = 0; i < n; i++) {
            this._navigator.dispatch(
                NavigationActions.back()
            );
        }
    }

}

export default new Navigator();