import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoalComponent } from './goals/goal/goal.component';
import { GoalListComponent } from './goals/goal-list/goal-list.component';
import { LearningEntryComponent } from './learning-entries/learning-entry/learning-entry.component';
import { IsAuthorizedGuard } from './services/is-authorized.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivateChild: [IsAuthorizedGuard],
    children: [
      { path: 'goals/:goalId/learningentries/:learningEntryId', component: LearningEntryComponent },
      { path: 'goals/edit/:goalId', component: GoalComponent },
      { path: 'goals/add', component: GoalComponent },
      { path: 'goals', component: GoalListComponent },
      { path: 'learning-entry/add/:goalId', component: LearningEntryComponent }
    ]
  },
  {
    path: 'auth', component: AuthComponent,
    children: [
      { path: '', component: AuthComponent, pathMatch: 'full', },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
