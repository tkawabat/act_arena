import { observable, computed, action } from 'mobx';
import Sound from 'react-native-sound';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';


class SoundStore {
    private player:Sound;
    private seList:Array<Sound>;
    @observable state:C.MusicState = C.MusicState.STOP;
    @observable name:string;
    @observable site:string;

    constructor() {
        Sound.setCategory('Playback');
        this.loadSe();
    }

    private loadSe = () => {
        this.seList = new Array<Sound>();
        for (const key in C.SeList) {
            console.log('load '+key);
            console.log('load '+C.SeList[key].file);
            this.seList[key] = new Sound(C.SeList[key].file, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    Amplitude.error('SoundStore loadSe', error)
                    return;
                }
                this.setVolume(0.5);
            });
        }
    }

    @action playRondom = async (volume:number, restart:boolean) => {
        if (!restart && this.state === C.MusicState.PLAY) {
            this.setVolume(volume);
            return;
        }

        const n = C.MusicList.length;
        const music = C.MusicList[Math.floor(Math.random() * n)];
        if (this.player) {
            this.stop();
            this.player.release();
        }
        this.player = new Sound(music.file, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                Amplitude.error('SoundStore setRondomMusic', error)
                return;
            }
            this.state = C.MusicState.PLAY;
            this.setVolume(volume);
            this.player.setNumberOfLoops(-1);
            this.player.play();
        });
    }

    @action stop = () => {
        this.state = C.MusicState.STOP;
        if (!this.player) return;
        this.player.pause();
    }

    @action fadeIn = (n) => {
        if (!this.player) return;

        // TODO play開始
        const step = n * 100 / C.SoundFadeDuration;
        const fadeFunction = () => {
            if (this.player.getVolume() >= n) {
                return;
            }
            this.incrementVolume(step);
            setTimeout(fadeFunction, C.SoundFadeDuration / 100);
        }
        fadeFunction();  
    }

    @action fadeOut = () => {
        if (!this.player) return;
        
        const step = this.player.getVolume() * 100 / C.SoundFadeDuration;
        const fadeFunction = () => {
            if (this.player.getVolume() <= 0) {
                this.stop();
                return;
            }
            this.decrementVolume(step);
            setTimeout(fadeFunction, C.SoundFadeDuration / 100);
        }
        fadeFunction();
    }

    public setVolume = (n:number) => {
        if (!this.player) return;
        this.player.setVolume(n);
    }

    public incrementVolume = (n:number) => {
        if (!this.player) return;
        const newVolume = Math.min(1.0, this.player.getVolume() + n);
        this.player.setVolume(newVolume);
    }

    public decrementVolume = (n:number) => {
        if (!this.player) return;
        const newVolume = Math.max(0, this.player.getVolume() - n);
        this.player.setVolume(newVolume);
    }

    public se = (key:string) => {
        if (!this.seList[key]) return;
        this.seList[key].play();
    }
}

export default new SoundStore();