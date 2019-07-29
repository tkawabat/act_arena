import { createStackNavigator, NavigationScreenProp, createAppContainer } from 'react-navigation'

//画面
import Main from './screen/Main'
import Push from './screen/Push'
import Modal from './screen/Modal'

export interface HomeScreenProps {
    navigation: NavigationScreenProp<any, any>
};

export const MainNavigation = createStackNavigator(
    {
        Main: { screen: Main },
        Push: { screen: Push },
    },
    { initialRouteName: 'Main', mode: 'card', headerMode: 'none' }
)

const Navigation = createStackNavigator(
    {
        MainNavigation: { screen: MainNavigation },
        Modal: { screen: Modal },
    },
    { initialRouteName: 'MainNavigation', mode: 'modal', headerMode: 'none' },
)

const App = createAppContainer(Navigation);

export default App;