import { Component, OnInit } from '@angular/core';

import { faPlayCircle, faStopCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'

import { IDoList, IIntervalToBeCleared } from './dtos/interface';

import countSeconds from './utils/countSeconds';

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
          isClockRunning: false,
        }
      ]
    }

    this.form.userInput = '';
  }

  handleChronomether(index: number, command: string) {
    if (command === 'pause' || command === 'stop') {
      this.doList[index].isClockRunning = false;

      if (command === 'stop') {
        Object.assign(this.doList[index].time, {
          seconds: 0,
          minutes: 0,
          hours: 0,
        });

        Object.assign(this.doList[index], {
          clock: '00:00:00',
        });
      }

      let intervalToBeCleared: IIntervalToBeCleared = {};

      this.timerRecord
        .map((record, i) => {
          index === record.index ? Object.assign(intervalToBeCleared, {
            record,
            i,
          }) : null
        });

      if (Object.entries(intervalToBeCleared).length > 0) {
        clearInterval(intervalToBeCleared.record.startTimer);

        this.timerRecord.splice(intervalToBeCleared.i, 1);
      }

      return true;
    }

    function updateTimer(doList: IDoList[]) {
      doList[index].isClockRunning = true;

      const {seconds, minutes, hours} = doList[index].time;

      const {
        seconds: countedSeconds,
        minutes: countedMinutes,
        hours: countedHours} = countSeconds(seconds, minutes, hours);

      Object.assign(doList[index].time, {
        seconds: countedSeconds,
        minutes: countedMinutes,
        hours: countedHours,
      })

      const timerObject = {
        seconds: countedSeconds < 10 ?
        `0${countedSeconds.toString()}` :
        `${countedSeconds.toString()}`,
        minutes: countedMinutes < 10 ?
        `0${countedMinutes.toString()}` :
        `${countedMinutes.toString()}`,
        hours: countedHours < 10 ?
        `0${countedHours.toString()}` :
        `${countedHours.toString()}`,
      }

      doList[index].clock = `${timerObject.hours}:${timerObject.minutes}:${timerObject.seconds}`;
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
