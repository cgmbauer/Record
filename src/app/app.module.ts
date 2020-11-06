import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XablauComponent } from './xablau/xablau.component';
import { CustomPlaceholderDirective } from './xablau/custom-placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    XablauComponent,
    CustomPlaceholderDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
