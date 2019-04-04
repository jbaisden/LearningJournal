import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { LearningEntryService } from '../services/learning-entry.service';
import { LearningEntry } from '../models/learning-entry.model';
import { Goal } from '../models/goal.model';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  learningEntry: LearningEntry;
  goal: Goal;
  serviceCollection: string = "Goals";

  constructor(private goalService: GoalService,
    private learningEntryService: LearningEntryService,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.debugGetGoal("5duPY2YhcSpmxDfHDysY");
  }

  debugGetGoal(goalId: string) {

    let goalFireDoc = this
      .firestore
      .doc<Goal>("Goals/" + goalId)
      .get()
      .subscribe((doc) => {
        let data = doc.data();
        let goalId = doc.id;
        console.warn(data);
        console.warn(goalId);
        this.goal = { goalId, ...data } as Goal;
      });

    console.warn(this.goal);

    // this.firestore
    //   .collection(this.serviceCollection)
    //   .doc(goalId)
    //   .get()
    //   .pipe(
    //     map(doc => {
    //       console.warn("Goal found in collection. Inside map.");
    //       let data = doc.data();
    //       let goalId = doc.id
    //       this.goal = { goalId, ...data } as Goal;
    //       console.warn(this.goal);
    //     })
    //   );
  }

}
