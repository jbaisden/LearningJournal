import { Component, OnInit, Input } from '@angular/core';
import { LearningEntryService } from 'src/app/services/learning-entry.service';
import { LearningEntry } from 'src/app/models/learning-entry.model';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { GoalService } from 'src/app/services/goal.service';
import { Goal } from 'src/app/models/goal.model';
import { Observable } from 'rxjs';
import { getLocaleId } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
// import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-learning-entry',
  templateUrl: './learning-entry.component.html',
  styleUrls: ['./learning-entry.component.css']
})
export class LearningEntryComponent implements OnInit {
  public Editor = ClassicEditor;
  editEntry: LearningEntry;
  editMode: boolean = false;
  types = ["Note", "Video", "Article", "Blog", "Book", "Course", "Walkthrough"];
  default = "Note";

  constructor(
    private goalService: GoalService,
    private learningEntryService: LearningEntryService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  learningEntryId: string;
  goalId: string;
  $goal: Observable<Goal>;

  form = new FormGroup({
    text: new FormControl('', Validators.required),
    // goalId: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  ngOnInit() {

    this.route.params.subscribe(
      (params) => {
        this.learningEntryId = params['learningEntryId'];
        let eid = this.learningEntryId;

        if (eid) {
          this.learningEntryService.getLearningEntry("", eid).subscribe((learningEntry) => {
            this.editEntry = learningEntry;
            if (this.editEntry) {
              this.editMode = true;
              this.form.setValue({
                text: this.editEntry.text,
                type: this.editEntry.type,
              });
            }
          });
        }

        // console.warn("goal id: ");
        // console.warn(gid);
        // console.warn("learning entry id: ");
        // console.warn(eid);
        // console.warn("learning entry object: ");
        // console.warn(this.editEntry);

      }
    );

    this.form.patchValue({
      type: this.default
    });

  }

  onSubmit() {

    // console.warn(this.editEntry);

    if (this.editMode) {
      this.editEntry.text = this.form.get('text').value;
      this.editEntry.type = this.form.get('type').value;
      this.learningEntryService.updateLearningEntry(this.editEntry);
    } else {
      let entry = new LearningEntry();
      entry = this.form.value;
      entry.dateTimeOfEntry = new Date();
      this.learningEntryService.createLearningEntry(entry);
    }

    this.router.navigate(['/goals']);

  }

}
