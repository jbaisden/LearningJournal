import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningEntry } from 'src/app/models/learning-entry.model';
import { LearningEntryService } from 'src/app/services/learning-entry.service';
import { Goal } from 'src/app/models/goal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-learning-entry-list',
  templateUrl: './learning-entry-list.component.html',
  styleUrls: ['./learning-entry-list.component.css']
})
export class LearningEntryListComponent implements OnInit {

  constructor(
    private learningEntryService: LearningEntryService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) { }

  learningEntries: Observable<LearningEntry[]>;

  ngOnInit() {
    this.learningEntries = this.learningEntryService
      .getLearningEntries("", 'Not Implemented Yet');
  }

  editLearningEntry(learningEntry: LearningEntry) {
    this.route.navigate([this.getLearningEntryUrl(learningEntry)]);
  }

  getLearningEntryUrl(learningEntry: LearningEntry): string {
    // let url = "/goals/" + this.goal.goalId + "/learningentries/" +    
    //   learningEntry.learningEntryId;
    let url = "/learningentries/" + learningEntry.learningEntryId;
    return url;
  }

}
