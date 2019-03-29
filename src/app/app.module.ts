import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoalService } from './services/goal.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { GoalComponent } from './goals/goal/goal.component';
import { GoalListComponent } from './goals/goal-list/goal-list.component';
import { GoalItemComponent } from './goals/goal-item/goal-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoalComponent,
    GoalListComponent,
    GoalItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [GoalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
