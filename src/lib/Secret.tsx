import secretDevelop from '../../secret-dev.json';
import secretProduction from '../../secret.json';

let secret = secretDevelop;
if (!__DEV__) {
    secret = secretProduction;
}

export default secret;

