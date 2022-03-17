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

    public scoreDate(date: string) {
        let res = new Date(date);
        let day = this.fullDate(res.getDate().toString());
        let month = this.fullDate(res.getMonth().toString());
        let year = this.fullDate(res.getFullYear().toString());
        return `${day}/${month}/${year}`;
    }

    public fullDate(str: string){
        return (str.length == 1 ? "0" + str : str);
      }
}