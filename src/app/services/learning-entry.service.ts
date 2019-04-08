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

  constructor(
    private firestore: AngularFirestore,
    private goalService: GoalService) { }

  serviceCollection: string = "/LearningEntries/";
  entryForEditting: EventEmitter<LearningEntry> = new EventEmitter();

  private getCollectionString(goalId:string,learningEntryId:string = null ) {
    if(learningEntryId) {
      return "Goals/" + goalId + this.serviceCollection + learningEntryId;
    } else {
      return "Goals/" + goalId + this.serviceCollection;
    }
  }

  createLearningEntry(data: LearningEntry) {
    console.warn("creating: ");
    console.warn(data);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.getCollectionString(data.goalId))
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateLearningEntry(data: LearningEntry) {
    console.warn("updating: ");
    console.warn(data);

    return this.firestore
      .collection(this.getCollectionString(data.goalId, data.learningEntryId))
      .doc(data.learningEntryId)
      .set(Object.assign({}, data));
  }

  deleteLearningEntry(goalId:string, learningEntryId: string) {
    return this.firestore
      .collection(this.getCollectionString(goalId))
      .doc(learningEntryId)
      .delete();
  }

  getLearningEntry(goalId: string, learningEntryId:string): Observable<LearningEntry> {

    let docRef = this.firestore.collection("goals/" + goalId + "/LearningEntries/").doc(learningEntryId);

    console.warn(docRef);

    return docRef.get().pipe(
      map((doc) => {
        let data = doc.data();
        let le = new LearningEntry();
        le.dateTimeOfEntry =  data.dateTimeOfEntry;
        le.goalId = goalId;
        le.text = data.text;
        le.type = data.type;
        console.warn(le);
        return le;
      })
    );

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
            // if (learningEntry.goalId) {
            //   console.warn("Getting goal for learning entry.");
            //   learningEntry.goal = this.goalService.getGoal(learningEntry.goalId);
            // }
            // console.warn({ goalId, ...data } as Goal);
            return learningEntry;
          })
        })
      );

  }

}
