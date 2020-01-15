import BackgroundTimer from 'react-native-background-timer';
import { Platform, } from 'react-native';

class Scheduler {
    private intervalList = {};
    private timeoutList = {};

    public setInterval = (key:string, f:() => void, ms:number) => {
        if (Platform.OS === 'ios') {
            this.intervalList[key] = setInterval(f, ms);
        } else {
            this.intervalList[key] = BackgroundTimer.setInterval(f, ms);
        }
    }

    public clearInterval = (key:string) => {
        if (Platform.OS === 'ios') {
            clearInterval(this.intervalList[key]);
        } else {
            BackgroundTimer.clearInterval(this.intervalList[key]);
        }
    }

    public setTimeout = (key:string, f, ms:number) => {
        if (Platform.OS === 'ios') {
            this.timeoutList[key] = setTimeout(f, ms);
        } else {
            this.timeoutList[key] = BackgroundTimer.setTimeout(f, ms);
        }
    }

    public cleartimeout = (key:string) => {
        if (Platform.OS === 'ios') {
            clearTimeout(this.timeoutList[key]);
        } else {
            BackgroundTimer.clearTimeout(this.timeoutList[key]);
        }
    }
}

export default new Scheduler();
