import {Amplitude} from 'expo';

import Secret from './Secret';

Amplitude.initialize(Secret.amplitude.apiKey);
Amplitude.logEvent("init");

export default Amplitude;