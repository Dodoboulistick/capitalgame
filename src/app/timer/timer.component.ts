import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-timer',
    templateUrl: 'view/timer.component.html',
    styleUrls: ['../app/app.component.css']
})

export class TimerComponent implements OnInit {
    title = 'capitales';

    public constructor() { }

    //timer
    displayTimer: string;
    isRunning: boolean = false;
    startText = 'Start';
    time: number;

    ngOnInit(): void {
        this.time = 0;
        this.stopwatch();
    }

    stopwatch() {
        timer(0, 1000).subscribe(ellapsedCycles => {
            this.time++;
            this.getDisplayTimer(this.time);
        });
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