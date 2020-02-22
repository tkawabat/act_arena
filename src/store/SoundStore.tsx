import Moment from 'moment';
import { observable, computed, action } from 'mobx';
import { Audio } from 'expo-av';
import { PlaybackStatus } from 'expo-av/build/AV';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';
import Scheduler from '../lib/Scheduler';


interface Player {
    sound: Audio.Sound,
    status: PlaybackStatus,
}

class SoundStore {
    private player:Player;
    private musicVolume: number;
    private musicList:Array<Player>;
    private seList:Array<Player>;
    @observable state:C.MusicState = C.MusicState.STOP;
    @observable name:string;
    @observable site:string;

    constructor() {
        this.musicList = [];
        this.seList = [];

        Audio.setIsEnabledAsync(true);
        const mode: Audio.AudioMode = {
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
        };
        Audio.setAudioModeAsync(mode);

        this.loadMusic();
        this.loadSe();
    }

    public loadMusic = async () : Promise<any[]> => {
        const initialStatus = {
            volume: 0.5,
            shouldPlay: false,
            isLooping: true,
            isMuted: false,
        }

        const ret = C.MusicList.map((obj, key) => {
            return Audio.Sound.createAsync(obj.asset, initialStatus)
                .then((v) => {
                    this.musicList.push(v as Player);
                })
                .catch(() => {
                    Amplitude.error('Sound Load Music', { 'key': key })
                })
                ;
        });

        return Promise.all(ret);
    }    

    public loadSe = async () : Promise<any[]> => {
        const initialStatus = {
            volume: 0.5,
            shouldPlay: false,
            isLooping: false,
            isMuted: false,
        }

        const ret = Object.entries(C.SeList).map((obj) => {
            const SeKey = parseInt(obj[0]) as C.SeKey;
            return Audio.Sound.createAsync(obj[1].asset, initialStatus)
                .then((v) => {
                    this.seList[SeKey] = v as Player;
                })
                .catch(() => {
                    Amplitude.error('Sound Load Se', { 'key': SeKey })
                })
                ;
        });

        return Promise.all(ret);
    }

    @action
    public playRondom = async (volume:number, restart:boolean) => {
        // リスタートなし & プレイ中なら、ボリュームだけ変更
        if (!restart && this.state === C.MusicState.PLAY) {
            this.setVolume(volume);
            return;
        }

        if (this.player) {
            this.stop();
        }

        const n = this.musicList.length;
        if (n < 1) return;
        this.player = this.musicList[Math.floor(Math.random() * n)];
        this.setVolume(volume);

        this.state = C.MusicState.PLAY;
        return this.player.sound.replayAsync({
            shouldPlay: true,
        });
    }

    @action
    public stop = async () => {
        this.state = C.MusicState.STOP;
        if (!this.player) return;

        const ret = this.player.sound.stopAsync();
        this.player = null;
        return ret;
    }

    public fadeIn = async (volume) => {
        if (!this.player) return;

        // TODO play開始
        const step = volume * 100 / C.SoundFadeDuration;
        const fadeFunction = () => {
            if (this.musicVolume >= volume) {
                return;
            }
            this.incrementVolume(step);
            Scheduler.setTimeout('', fadeFunction, C.SoundFadeDuration / 100);
        }
        fadeFunction();  
    }

    public fadeOut = () => {
        if (!this.player) return;
        
        const step = this.musicVolume * 100 / C.SoundFadeDuration;
        const fadeFunction = () => {
            if (this.musicVolume <= 0) {
                this.stop();
                return;
            }
            this.decrementVolume(step);
            Scheduler.setTimeout('', fadeFunction, C.SoundFadeDuration / 100);
        }
        fadeFunction();
    }

    public incrementVolume = (n:number) => {
        if (!this.player) return;
        const newVolume = Math.min(1.0, this.musicVolume + n);
        this.setVolume(newVolume);
    }

    public decrementVolume = (n:number) => {
        if (!this.player) return;
        const newVolume = Math.max(0, this.musicVolume - n);
        this.setVolume(newVolume);
    }

    @action
    public setVolume = (volume:number) => {
        if (!this.player) return;
        this.musicVolume = volume;
        this.player.sound.setVolumeAsync(volume);
    }

    public se = (key:C.SeKey) => {
        if (!this.seList[key]) return;
        this.seList[key].sound.replayAsync({
            shouldPlay: true,
        });
    }
}

export default new SoundStore();