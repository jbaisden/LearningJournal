import { Component, OnInit, Input } from '@angular/core';
import { LearningEntryService } from 'src/app/services/learning-entry.service';
import { LearningEntry } from 'src/app/models/learning-entry.model';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { GoalService } from 'src/app/services/goal.service';
import { Goal } from 'src/app/models/goal.model';
import { Observable } from 'rxjs';
import { getLocaleId } from '@angular/common';

@Component({
  selector: 'app-learning-entry',
  templateUrl: './learning-entry.component.html',
  styleUrls: ['./learning-entry.component.css']
})
export class LearningEntryComponent implements OnInit {

  @Input() goal: Goal;
  editEntry: LearningEntry;
  editMode: boolean = false;
  types = ["Note", "Video", "Article", "Blog", "Book", "Course", "Walkthrough"];
  default = "Note";

  constructor(private learningEntryService: LearningEntryService,
    private goalService: GoalService) { }

  form = new FormGroup({
    text: new FormControl('', Validators.required),
    // goalId: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  // goals: Observable<Goal[]>;

  ngOnInit() {
    this.learningEntryService.entryForEditting.subscribe((editEntry: LearningEntry) => {
      console.warn("learning entry marked for editting: ");
      console.warn(editEntry);
      this.editEntry = editEntry;
      this.editMode = true;

      //Using PatchValue because goalId could be null
      this.form.patchValue({
        text: this.editEntry.text,
        type: this.editEntry.type,
        goalId: this.editEntry.goalId
      });

    });

    // this.goals = this.goalService.getGoals('');
    this.form.patchValue({
      type: this.default
    });

  }

  onSubmit() {

    if (this.editMode) {
      this.editEntry.text = this.form.get('text').value;
      this.editEntry.type = this.form.get('type').value;
      this.editEntry.goalId = this.form.get('goalId').value;
      this.learningEntryService.updateLearningEntry(this.editEntry);
    } else {
      let entry = new LearningEntry();
      entry = this.form.value;
      entry.dateTimeOfEntry = new Date();
      this.learningEntryService.createLearningEntry(entry);
    }

    this.editEntry = null;
    this.editMode = false;
    this.form.reset();
    this.form.patchValue({
      type: this.default
    });
  }

}
