import { Component } from '@angular/core';
import { NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
