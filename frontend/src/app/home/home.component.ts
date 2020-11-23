import { Component, OnInit } from '@angular/core';

import { faPlayCircle, faStopCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'

import { intervalToDuration } from 'date-fns';

import { IDoList } from './dtos/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playCircle = faPlayCircle;
  pauseCircle = faPauseCircle;
  stopCircle = faStopCircle;

  logo = '../../assets/logo.svg';

  form = {
    userInput: '',
  }

  timerRecord = [];

  public doList: IDoList[];
  constructor() {
    this.doList = []
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (this.form.userInput !== '') {
      this.doList = [
        ...this.doList,
        {
          userInput: this.form.userInput,
          clock: '00:00:00',
          time: {
            seconds: 0,
            minutes: 0,
            hours: 0,
          },
          accumulatedTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
          },
          isClockRunning: false,
        }
      ]
    }

    this.form.userInput = '';
  }

  handleStartClick(index: number, command: string) {
    if (command === 'pause') {
      console.log('entrou');
      this.doList[index].isClockRunning = false;

      let intervalIndex: number;

      const intervalToBeCleared = this.timerRecord
        .filter((record, i) => {
          intervalIndex = i;
          return index === record.index
        });

        clearInterval(intervalToBeCleared[0].startTimer);

        this.timerRecord.splice(intervalIndex, 1);

        const sumOldTimeWithNewTime = {
          seconds: this.doList[index].accumulatedTime.seconds +
          this.doList[index].time.seconds,
          minutes: this.doList[index].accumulatedTime.minutes +
          this.doList[index].time.minutes,
          hours: this.doList[index].accumulatedTime.hours +
          this.doList[index].time.hours,
        }

        if (sumOldTimeWithNewTime.seconds > 59) {
          sumOldTimeWithNewTime.seconds = 0;
          sumOldTimeWithNewTime.minutes += 1;
        }
        if (sumOldTimeWithNewTime.minutes > 60) {
          sumOldTimeWithNewTime.minutes = 0;
          sumOldTimeWithNewTime.hours += 1;
        }

      return true;
    }

    const startDate = new Date();

    function updateTimer(doList: IDoList[]) {
      doList[index].isClockRunning = true;


      let interval: Duration;

      interval = intervalToDuration({
        start: startDate,
        end: new Date()
      });

      const timerObject = {
        seconds: interval.seconds < 10 ?
        `0${interval.seconds.toString()}` :
        `${interval.seconds.toString()}`,
        minutes: interval.minutes < 10 ?
        `0${interval.minutes.toString()}` :
        `${interval.minutes.toString()}`,
        hours: interval.hours < 10 ?
        `0${interval.hours.toString()}` :
        `${interval.hours.toString()}`,
      }

      Object.assign(doList[index], {
        time: {
          seconds: interval.seconds,
          minutes: interval.minutes,
          hours: interval.hours,
        }
      });

      doList[index].clock = `${timerObject.hours}:${timerObject.minutes}:${timerObject.seconds}`
    }

    if (!this.doList[index].isClockRunning) {
      const startTimer = setInterval(() => updateTimer(this.doList), 1000);

      this.timerRecord = [
        ...this.timerRecord,
        {
          startTimer,
          index,
        }
      ]
    } else {
      console.log('Já está cronometrando.');
    }

  }

}
