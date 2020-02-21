import moment from 'moment';
import * as amplitude from 'expo-analytics-amplitude';

import Secret from './Secret';


class Amplitude {
    private userId:string;

    constructor() {
        amplitude.initialize(Secret.amplitude.apiKey);
    }

    public setUserId = (userId:string) => {
        this.userId = userId;
        amplitude.setUserId(userId);
    }

    public info = (event: string, prop: Object) => {
        if (!prop) prop = {}
        if (__DEV__) {
            const time = moment().format('YYYY/MM/DD HH:mm:ss');
            const param = prop ? ' ' + prop.toString() : '';
            console.log(time + ' [Info] ' + event + ' ' + this.userId) + param;
        }
        amplitude.logEventWithProperties('[Info]' + event, prop);
    }

    public error = (event: string, error: Object) => {
        if (!error) error = {}
        if (__DEV__) {
            const time = moment().format('YYYY/MM/DD HH:mm:ss');
            const errorString = error ? ' ' + error.toString() : '';
            console.error(time + ' [Error] ' + event + ' ' + this.userId + errorString);
        }
        amplitude.logEventWithProperties('[Error]' + event, { 'error': error });
    }
}

export default new Amplitude();