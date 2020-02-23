import { observable, computed, action } from 'mobx';
import Sound from 'react-native-sound';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';
import Scheduler from '../lib/Scheduler';


class SoundStore {
    private player:Sound;
    private musicVolume: number;
    private musicList:Array<Sound>;
    private seList:Array<Sound>;
    @observable state:C.MusicState = C.MusicState.STOP;
    @observable name:string;
    @observable site:string;

    constructor() {
        this.musicList = [];
        this.seList = [];

        Sound.setCategory('Playback');

        this.loadMusic();
        this.loadSe();
    }

    public loadMusic = () => {
        this.musicList = C.MusicList.map((obj, key) => {
            return new Sound(obj.file, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log(error)
                    Amplitude.error('loadMusic', { 'file': obj.file});
                    return;
                }
            });
        });
    }

    public loadSe = () => {
        Object.entries(C.SeList).forEach(([key, value]) => {
            const file = value.file;
            const sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log(error)
                    Amplitude.error('loadMusic', { 'file': file});
                    return;
                }
            });
            this.seList[key] = sound;
        });
    }

    @action
    public playRondom = (volume:number, restart:boolean) => {
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
        this.player.setNumberOfLoops(-1);

        this.player.play();
        this.state = C.MusicState.PLAY;
    }

    @action
    public stop = async () => {
        this.state = C.MusicState.STOP;
        if (!this.player) return;

        const ret = this.player.stop();
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
        this.player.setVolume(volume);
    }

    public se = (key:C.SeKey) => {
        if (!this.seList[key]) return;
        this.seList[key].play();
    }
}

export default new SoundStore();