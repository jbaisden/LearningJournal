import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { Goal } from 'src/app/models/goal.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  constructor(private goalService: GoalService) { }
  goals: Observable<Goal[]>;

  ngOnInit() {
    this.goals = this.goalService.getGoals('Not Implemented Yet');
    // this.goals = this.goalService.getGoalsOrdered('Not Implemented Yet');
  }


}
