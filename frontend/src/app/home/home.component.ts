import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { faPlayCircle, faStopCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playCircle = faPlayCircle;
  pauseCircle = faPauseCircle;
  stopCircle = faStopCircle;

  constructor(private myService: AuthService) { }

  ngOnInit(): void {
    this.myService.getUserDetails();
  }

}
