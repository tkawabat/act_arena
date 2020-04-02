import { Alert, Platform, } from 'react-native';
import * as Permissions from 'react-native-permissions';

class Permission {

    private asyncCheckTellIos = async () => {
        const p = Permissions.PERMISSIONS.IOS.MICROPHONE;
        switch (await Permissions.check(p)) {
            case Permissions.RESULTS.UNAVAILABLE:
                Alert.alert('このデバイスではマイクをご利用できないため、通話機能が利用できません。');
                return false;
            case Permissions.RESULTS.BLOCKED:
                Alert.alert('', '通話機能を利用するためにはマイクの利用許可が必要です。', [
                    { text: '設定へ', onPress: Permissions.openSettings}
                    , { text: 'Cancel'}
                ]);
                return false;
            case Permissions.RESULTS.DENIED:
                Permissions.request(p);
                return false;
            case Permissions.RESULTS.GRANTED:
                return true;
        }
    }

    private asyncCheckTellAndroid = async () => {
        const microphone = await Permissions.request(Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO);
        if (microphone === Permissions.RESULTS.UNAVAILABLE) {
            alert('このデバイスではマイクをご利用できないため、通話機能を利用できません。');
            return false;
        }

        if (microphone === Permissions.RESULTS.GRANTED) {
            return true;
        }
        
        Alert.alert('', '通話機能を利用するためにはマイクの利用許可が必要です。', [
            { text: '設定へ', onPress: Permissions.openSettings }
            , { text: 'Cancel' }
        ]);

        return false;
    }

    public asyncCheckTell = async () => {
        let ret:boolean = false;
        if (Platform.OS === 'ios') {
            ret = await this.asyncCheckTellIos();
        } else {
            ret = await this.asyncCheckTellAndroid();
        }
        return ret;
    }
}


export default new Permission();