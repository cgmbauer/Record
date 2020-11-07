import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wendy';
  isFavorite = true;
  ataque = 0;


  handleStarClick(): void {
    this.isFavorite = !this.isFavorite;
  }

  handleAtk(): void {
   this.ataque = Math.floor(20 * Math.random() + 1);
  }
}
