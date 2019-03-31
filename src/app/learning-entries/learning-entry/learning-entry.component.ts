import { Component, OnInit } from '@angular/core';
import { LearningEntryService } from 'src/app/services/learning-entry.service';
import { LearningEntry } from 'src/app/models/learning-entry.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-learning-entry',
  templateUrl: './learning-entry.component.html',
  styleUrls: ['./learning-entry.component.css']
})
export class LearningEntryComponent implements OnInit {

  editEntry: LearningEntry;
  editMode: boolean = false;
  types = ["Note", "Video", "Article", "Blog", "Book", "Course", "Walkthrough"];
  default = "Note";

  constructor(private learningEntryService: LearningEntryService) { }

  form = new FormGroup({
    text: new FormControl(''),
    type: new FormControl(''),
  });

  ngOnInit() {
    this.learningEntryService.entryForEditting.subscribe((editEntry: LearningEntry) => {
      console.warn("learning entry marked for editting: ");
      console.warn(editEntry);
      this.editEntry = editEntry;
      this.form.setValue({
        text: this.editEntry.text,
        type: this.editEntry.type
      });
      this.editMode = true;
    });

    this.form.patchValue({
      type:  this.default
    });

  }

  onSubmit() {

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

    this.editEntry = null;
    this.editMode = false;
    this.form.reset();
  }

}
