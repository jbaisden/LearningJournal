import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  constructor(private goalService: GoalService) { }

  editGoal: Goal;
  editMode: boolean = false;

  form = new FormGroup({
    goalText: new FormControl('')
  });

  ngOnInit() {
    this.goalService.goalForEditting.subscribe((editGoal: Goal) => {
      console.warn("goal marked for editting: ");
      console.warn(editGoal);
      this.editGoal = editGoal;
      this.form.setValue({
        goalText: this.editGoal.goalText
      });
      this.editMode = true;
    })
  }

  onSubmit() {

    if (this.editMode) {
      this.editGoal.goalText = this.form.get('goalText').value;
      this.goalService.updateGoal(this.editGoal);
    } else {
      let goal = new Goal();
      goal = this.form.value;
      this.goalService.createGoal(goal);
    }

    this.editGoal = null;
    this.editMode = false;
    this.form.reset();
  }

}
