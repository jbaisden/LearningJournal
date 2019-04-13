import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoalComponent } from './goals/goal/goal.component';
import { GoalListComponent } from './goals/goal-list/goal-list.component';
import { LearningEntryComponent } from './learning-entries/learning-entry/learning-entry.component';

const routes: Routes = [
  { path: '', redirectTo: 'goals', pathMatch: 'full' },
  { path: 'goals/:goalId/learningentries/:learningEntryId', component: LearningEntryComponent },
  { path: 'goals/edit/:goalId', component: GoalComponent },
  { path: 'goals/add', component: GoalComponent },
  { path: 'goals', component: GoalListComponent },
  { path: 'learning-entry/add/:goalId', component: LearningEntryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
