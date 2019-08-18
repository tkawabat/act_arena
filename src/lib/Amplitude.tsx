import * as Amplitude from 'expo-analytics-amplitude';

import Secret from './Secret';

Amplitude.initialize(Secret.amplitude.apiKey);
Amplitude.logEvent("init");

export const Error = (event:string, error:any) => {
    if (__DEV__) {
        console.error('Error: '+event);
        console.error(error);    
    }
    Amplitude.logEventWithProperties('Error: '+event, {error: error});
}

export default Amplitude;