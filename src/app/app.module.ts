import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoalService } from './services/goal.service';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
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
import { IsAuthorizedGuard } from './services/is-authorized.guard';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import * as firebase from 'firebase';

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
    HeaderComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // firebase.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [GoalService, LearningEntryService, IsAuthorizedGuard, AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
