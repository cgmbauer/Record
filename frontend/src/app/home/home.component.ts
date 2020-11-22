import { Component, OnInit } from '@angular/core';

import { faPlayCircle, faStopCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'

import { IDoList } from './interface';

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

  private form = {
    userInput: '',
  }

  private doList: IDoList[] = []

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (this.form.userInput !== '') {
      this.doList = [
        ...this.doList,
        {
          userInput: this.form.userInput,
          clock: '0:0:0',
        }
      ]
    }

    this.form.userInput = '';
  }

}
