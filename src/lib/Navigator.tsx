import { NavigationActions } from 'react-navigation';
import Amplitude from './Amplitude';

let navigator;

function setNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName:string, params) {
    Amplitude.info('Navigate'+routeName, null);
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function back() {
    navigator.dispatch(
        NavigationActions.back()
    );
}


export default {
    setNavigator
    , navigate
    , back
};