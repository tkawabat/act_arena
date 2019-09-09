import { NavigationActions } from 'react-navigation';

let navigator;

function setNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName, params) {
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