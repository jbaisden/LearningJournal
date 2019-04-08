import { Component, OnInit, Input } from '@angular/core';
import { LearningEntry } from 'src/app/models/learning-entry.model';
import { LearningEntryService } from 'src/app/services/learning-entry.service';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-learning-entry-item',
  templateUrl: './learning-entry-item.component.html',
  styleUrls: ['./learning-entry-item.component.css']
})
export class LearningEntryItemComponent implements OnInit {

  @Input() learningEntry: LearningEntry;
  @Input() goal: Goal;
  constructor(private learningEntryService: LearningEntryService) { }

  ngOnInit() {
  }

  // deleteLearningEntry(goalId: string) {
  //   this.learningEntryService.deleteLearningEntry(goalId);
  // }

  // editLearningEntry(learningEntry: LearningEntry) {
  //   this.learningEntryService.entryForEditting.next(learningEntry);
  // }

}
