import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import {MaterialModule} from './material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
    
import { AppComponent } from './app/app.component';
import { GameComponent } from './main/game.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { FooterComponent } from './elements/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowScoreDialog } from './main/dialog/show-score-dialog.component';

    
@NgModule({ 
  imports: 
  [ NoopAnimationsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    MatDialogModule
 ], 
  declarations: [ 
    AppComponent,
    GameComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ShowScoreDialog
  ], 
  bootstrap:    [ AppComponent ] 
}) 
export class AppModule { }
