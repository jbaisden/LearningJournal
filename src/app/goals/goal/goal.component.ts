import { Component, OnInit, Input } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {


  editGoal: Goal;
  editMode: boolean = false;
  @Input() visible: boolean = false;

  form = new FormGroup({
    goalText: new FormControl('', Validators.required)
  });

  constructor(
    private goalService: GoalService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  cancelEdit() {
    this.editGoal = null;
    this.editMode = false;
    this.form.setValue({ goalText: null });
    this.visible = false;
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params) => {
        if (params['goalId']) {
          this.goalService.getGoal(params['goalId']).subscribe((goal) => {
            this.editGoal = goal;
            if (this.editGoal) {
              this.editMode = true;
              this.form.setValue({
                goalText: this.editGoal.goalText
              });
            }
          });
        }
      }
    );

  }

  onSubmit() {

    if (this.editMode) {
      this.editGoal.goalText = this.form.get('goalText').value;
      this.goalService.updateGoal(this.editGoal);
    } else {
      let goal = new Goal();
      goal = this.form.value;
      // goal.goalText = this.form.get('goalText').value;
      goal.dateTimeOfEntry = new Date();
      this.goalService.createGoal(goal);
    }

    this.router.navigate(['/goals']);

    this.editGoal = null;
    this.editMode = false;
    this.form.reset();
    this.visible = false;
  }

}
