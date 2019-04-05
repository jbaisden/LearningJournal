import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningEntry } from 'src/app/models/learning-entry.model';
import { LearningEntryService } from 'src/app/services/learning-entry.service';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-learning-entry-list',
  templateUrl: './learning-entry-list.component.html',
  styleUrls: ['./learning-entry-list.component.css']
})
export class LearningEntryListComponent implements OnInit {

  constructor(private learningEntryService: LearningEntryService) { }
  learningEntries: Observable<LearningEntry[]>;
  @Input() goal: Goal;

  ngOnInit() {
    this.learningEntries = this.learningEntryService
      .getLearningEntries('Not Implemented Yet');
  }

}
