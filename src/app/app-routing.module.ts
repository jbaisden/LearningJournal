import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoalComponent } from './goals/goal/goal.component';
import { GoalListComponent } from './goals/goal-list/goal-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'goals', pathMatch: 'full' },
  { path: 'goals/edit/:goalId', component: GoalComponent },
  { path: 'goals', component: GoalListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
