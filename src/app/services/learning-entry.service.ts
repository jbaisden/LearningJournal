import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LearningEntry } from '../models/learning-entry.model';
import { GoalService } from './goal.service';

@Injectable({
  providedIn: 'root'
})
export class LearningEntryService {

  constructor(private firestore: AngularFirestore,
    private goalService: GoalService) { }

  serviceCollection: string = "LearningEntries";
  entryForEditting: EventEmitter<LearningEntry> = new EventEmitter();

  createLearningEntry(data: LearningEntry) {
    console.warn("creating: ");
    console.warn(data);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.serviceCollection)
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateLearningEntry(data: LearningEntry) {
    console.warn("updating: ");
    console.warn(data);

    return this.firestore
      .collection(this.serviceCollection)
      .doc(data.learningEntryId)
      .set(data);
  }

  deleteLearningEntry(learningEntryId: string) {
    return this.firestore
      .collection(this.serviceCollection)
      .doc(learningEntryId)
      .delete();
  }

  getLearningEntries(userId: string): Observable<any> | Observable<LearningEntry[]> {
    return this.firestore.collection<LearningEntry>(this.serviceCollection)
      .snapshotChanges()
      .pipe(
        map(docChangeActions => {
          return docChangeActions.map(learningEntryDoc => {
            let data = learningEntryDoc.payload.doc.data();
            let learningEntryId = learningEntryDoc.payload.doc.id;
            let learningEntry = { learningEntryId, ...data } as LearningEntry;
            if (learningEntry.goalId) {
              console.warn("Getting goal for learning entry.");
              learningEntry.goal = this.goalService.getGoal(learningEntry.goalId);
            }
            // console.warn({ goalId, ...data } as Goal);
            return learningEntry;
          })
        })
      );

  }

}
