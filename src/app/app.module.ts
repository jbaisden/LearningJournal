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
import { LearningEntryComponent } from './learning-entries/learning-entry/learning-entry.component';
import { LearningEntryListComponent } from './learning-entries/learning-entry-list/learning-entry-list.component';
import { LearningEntryItemComponent } from './learning-entries/learning-entry-item/learning-entry-item.component';
import { LearningEntryService } from './services/learning-entry.service';
import { DebugComponent } from './debug/debug.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoalComponent,
    GoalListComponent,
    GoalItemComponent,
    LearningEntryComponent,
    LearningEntryListComponent,
    LearningEntryItemComponent,
    DebugComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [GoalService, LearningEntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
