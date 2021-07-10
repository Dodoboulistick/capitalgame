import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import {MaterialModule} from './material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
    
import { AppComponent } from './app/app.component';
import { TimerComponent } from './timer/timer.component';
import { GameComponent } from './main/game.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { FooterComponent } from './elements/footer/footer.component';

    
@NgModule({ 
  imports: 
  [ NoopAnimationsModule,
    FormsModule,
    MaterialModule,
 ], 
  declarations: [ 
    AppComponent,
    TimerComponent,
    GameComponent,
    NavbarComponent,
    FooterComponent
  ], 
  bootstrap:    [ AppComponent ] 
}) 
export class AppModule { }
