import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TimerService {
    public constructor() { }
    time: number = 0;
    displayTimer: string;
    interval: any = null;

    public start() {
        if (this.interval)
            return;
        this.interval = setInterval(() => {
            this.time++;
            this.getDisplayTimer(this.time)
        }, 1000)
    }

    public stop() {
        clearInterval(this.interval);
        this.time = 0;
        this.getDisplayTimer(this.time)
        this.interval = null;
    }

    getDisplayTimer(time: number) {
        var minutes = '' + Math.floor(time % 3600 / 60);
        var seconds = '' + Math.floor(time % 3600 % 60);

        if (Number(minutes) < 10) {
            minutes = '0' + minutes;
        } else {
            minutes = '' + minutes;
        }
        if (Number(seconds) < 10) {
            seconds = '0' + seconds;
        } else {
            seconds = '' + seconds;
        }

        this.displayTimer = minutes + ':' + seconds;
    }
}