import { observable, computed, action } from 'mobx';
import Sound from 'react-native-sound';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';


class SoundStore {
    private player:Sound;
    @observable state:C.MusicState = C.MusicState.STOP;
    @observable name:string;
    @observable site:string;

    constructor() {
        Sound.setCategory('Playback');
    }

    @action playRondom = async (volume) => {
        const n = C.MusicList.length;
        const music = C.MusicList[Math.floor(Math.random() * n)];
        if (this.player) this.player.release();
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
        this.player.stop();
    }

    @action fadeIn = (n) => {
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
        this.player.setVolume(n);
    }

    public incrementVolume = (n:number) => {
        const newVolume = Math.min(1.0, this.player.getVolume() + n);
        this.player.setVolume(newVolume);
    }

    public decrementVolume = (n:number) => {
        const newVolume = Math.max(0, this.player.getVolume() - n);
        this.player.setVolume(newVolume);
    }
}

export default new SoundStore();