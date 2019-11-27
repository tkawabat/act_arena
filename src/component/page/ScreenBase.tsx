import { Component } from 'react';
import { BackHandler} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface props {
    navigation: NavigationScreenProp<any, any>
};

export default class ScreenBase extends Component<props> {
    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }
}