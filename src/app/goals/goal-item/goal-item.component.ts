import { Component, OnInit, Input } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.css']
})
export class GoalItemComponent implements OnInit {

  @Input() goal: Goal;
  constructor(private goalService: GoalService) { }

  ngOnInit() {
  }

  deleteGoal(goalId: string) {
    this.goalService.deleteGoal(goalId);
  }

  editGoal(goal: Goal) {
    this.goalService.goalForEditting.next(goal);
  }

}
