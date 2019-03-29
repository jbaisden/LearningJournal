import { Component, OnInit, Input } from '@angular/core';
import { LearningEntry } from 'src/app/models/learning-entry.model';

@Component({
  selector: 'app-learning-entry-item',
  templateUrl: './learning-entry-item.component.html',
  styleUrls: ['./learning-entry-item.component.css']
})
export class LearningEntryItemComponent implements OnInit {

  @Input() learningEntry: LearningEntry;
  constructor() { }

  ngOnInit() {
  }

}
