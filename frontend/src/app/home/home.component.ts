import { Component, OnInit } from '@angular/core';

import {v4 as uuidv4} from 'uuid';

import {
  faPlayCircle,
  faStopCircle,
  faPauseCircle,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons'

import { browserRefresh } from '../app.component';

import { IDoList, IIntervalToBeCleared } from './dtos/interface';

import updateLocalStorage from  './utils/updateLocalStorage';
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
  timeCircle = faTimesCircle;

  logo = '../../assets/logo.svg';

  isModalOff = true;

  form = {
    userInput: '',
  }

  timerRecord = [];


  public doList: IDoList[];
  constructor() {
    this.doList = []

    if (browserRefresh === true) {
      this.timerRecord = [];

      const localStorageStringList = localStorage.getItem('@Record:list');

      if (localStorageStringList) {
        this.doList = JSON.parse(localStorageStringList);
      }

      if(Object.entries(this.doList).length > 0) {

        this.doList = this.doList.map(list => Object.assign(list, {
          isClockRunning: false,
        }));

        localStorage.setItem('@Record:list', JSON.stringify(this.doList));

      }
    }

  }

  ngOnInit(): void {
    setInterval(() => updateLocalStorage(this.doList), 60000);
  }

  handleModal(): void {
    this.isModalOff = !this.isModalOff;
  }

  handleReset(): void {
    localStorage.removeItem('@Record:list');

    this.doList = [];

    this.handleModal();
  }

  handleDelete(id: string): void {
    this.doList = this.doList.filter(item => item.id !== id);

    localStorage.setItem('@Record:list', JSON.stringify(this.doList));
  }

  handleSubmit(): void {
    if (this.form.userInput !== '') {
      this.doList = [
        {
          id: uuidv4(),
          userInput: this.form.userInput,
          clock: '00:00:00',
          time: {
            seconds: 0,
            minutes: 0,
            hours: 0,
          },
          isClockRunning: false,
        },
        ...this.doList,
      ];

      localStorage.setItem('@Record:list', JSON.stringify(this.doList));
    }

    this.form.userInput = '';
  }

  handleChronomether(id: string, command: string) {
    const [ selectedItemFromDoList ] = this.doList
      .filter(item => item.id === id);

    if (command === 'pause' || command === 'stop') {
      selectedItemFromDoList.isClockRunning = false;

      if (command === 'stop') {
        Object.assign(selectedItemFromDoList.time, {
          seconds: 0,
          minutes: 0,
          hours: 0,
        });

        Object.assign(selectedItemFromDoList, {
          clock: '00:00:00',
        });
      }

      let intervalToBeCleared: IIntervalToBeCleared = {};

      this.timerRecord
        .map((record, i) => {
          id === record.id ? Object.assign(intervalToBeCleared, {
            record,
            i,
          }) : null
        });

      if (Object.entries(intervalToBeCleared).length > 0) {
        clearInterval(intervalToBeCleared.record.startTimer);

        this.timerRecord.splice(intervalToBeCleared.i, 1);
      }

      localStorage.setItem('@Record:list', JSON.stringify(this.doList));

      this.doList = this.doList.map(item => item.id === id ?
        selectedItemFromDoList :
        item
      );

      return true;
    }

    function updateTimer(doList: IDoList[]) {
      selectedItemFromDoList.isClockRunning = true;

      const {seconds, minutes, hours} = selectedItemFromDoList.time;

      const {
        seconds: countedSeconds,
        minutes: countedMinutes,
        hours: countedHours} = countSeconds(seconds, minutes, hours);

      Object.assign(selectedItemFromDoList.time, {
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

      selectedItemFromDoList.clock = `${timerObject.hours}:${timerObject.minutes}:${timerObject.seconds}`;

      doList = doList.map(item => item.id === id ? selectedItemFromDoList : item);
    }

    if (!selectedItemFromDoList.isClockRunning) {
      const startTimer = setInterval(() => updateTimer(this.doList), 1000);

      this.timerRecord = [
        ...this.timerRecord,
        {
          startTimer,
          id,
        }
      ]
    } else {
      console.log('Já está cronometrando.');
    }

  }

}
