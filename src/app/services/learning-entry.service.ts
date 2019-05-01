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
    private goalService: GoalService) {
    console.log("LearningEntryService constructed");
  }

  serviceCollection: string = "/LearningEntries/";
  entryForEditting: EventEmitter<LearningEntry> = new EventEmitter();

  private getCollectionPath(goalId: string, learningEntryId: string = null) {
    // if (learningEntryId) {      
    //   return "Goals/" + goalId + this.serviceCollection + learningEntryId;
    // } else {
    //   return "Goals/" + goalId + this.serviceCollection;
    // }
    return "LearningEntries";
  }

  createLearningEntry(data: LearningEntry) {
    // console.warn("creating: ");
    // console.warn(data);
    data.goalId = "deprecated";
    return new Promise<any>((resolve, reject) => {
      this.firestore
        // .collection(this.getCollectionPath(data.goalId))
        .collection("LearningEntries")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateLearningEntry(data: LearningEntry) {
    // console.warn("updating: ");
    // console.warn(data);
    return this.firestore
      .collection(this.getCollectionPath(data.goalId))
      .doc(data.learningEntryId)
      .set(Object.assign({}, data));
  }

  deleteLearningEntry(goalId: string, learningEntryId: string) {
    return this.firestore
      .collection(this.getCollectionPath(goalId))
      .doc(learningEntryId)
      .delete();
  }

  getLearningEntry(goalId: string, learningEntryId: string): Observable<LearningEntry> {

    // let docRef = this.firestore.collection("Goals/" + goalId + "/LearningEntries/").doc(learningEntryId);
    let docRef = this.firestore.collection(this.serviceCollection).doc(learningEntryId);
    // console.warn(docRef);
    return docRef.get().pipe(
      map((doc) => {
        let data = doc.data();
        let le = new LearningEntry();
        let ts = <firebase.firestore.Timestamp>data.dateTimeOfEntry;
        le.dateTimeOfEntry = ts.toDate();
        le.goalId = goalId;
        le.text = data.text;
        le.type = data.type;
        le.learningEntryId = doc.id;
        return le;
        //  return { doc.id, ...Object.assign({}, doc.data()) };
      })
    );

  }

  getLearningEntries(goalId: string, userId: string):
    Observable<any> |
    Observable<LearningEntry[]> {
    return this.firestore
      .collection<LearningEntry>(this.getCollectionPath(this.serviceCollection))
      .snapshotChanges()
      .pipe(
        map(docChangeActions => {
          return docChangeActions.map(learningEntryDoc => {
            let data = learningEntryDoc.payload.doc.data();
            let learningEntryId = learningEntryDoc.payload.doc.id;
            let learningEntry = { learningEntryId, ...data } as LearningEntry;
            return learningEntry;
          })
        })
      );
  }

}
