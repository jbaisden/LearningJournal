import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private firestore: AngularFirestore) { }
  serviceCollection: string = "Goals";
  goalForEditting: EventEmitter<Goal> = new EventEmitter();

  createGoal(data: Goal) {
    console.warn("creating: ");
    console.warn(data);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.serviceCollection)
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateGoal(data: Goal) {

    console.warn("updating: ");
    console.warn(data);

    return this.firestore
      .collection(this.serviceCollection)
      .doc(data.goalId)
      .set(Object.assign({}, data));
  }

  deleteGoal(goalId: string) {
    return this.firestore
      .collection(this.serviceCollection)
      .doc(goalId)
      .delete();
  }

  getGoal(goalId: string): Observable<Goal> {

    let docRef = this.firestore.collection(this.serviceCollection).doc(goalId);

    return docRef.get().pipe(
      map((doc) => {
        let data = doc.data();
        let id = doc.id;
        let g = new Goal();
        g.goalText = data.goalText;
        g.goalId = goalId;
        g.dateTimeOfEntry = data.dateTimeOfEntry;
        console.warn(g);
        return g;
      })
    );

    // docRef
    //   .get()
    //   .pipe(
    //     map((doc) => {
    //       console.warn("Inside .pipe(map...)");
    //       if (doc.exists) {
    //         console.warn("Inside doc.exists");
    //         let data = doc.data();
    //         let id = doc.id;
    //         goal = { id, ...data } as unknown as Goal;
    //         console.warn(goal);
    //         return goal;
    //       }
    //     })
    //   );

    // console.warn(docRef);
    // this
    //   .firestore
    //   .doc<Goal>("Goals/" + goalId)
    //   .ref
    //   .get()

    //   .subscribe((doc) => {
    //     let data = doc.data();
    //     let goalId = doc.id;
    //     console.warn(data);
    //     console.warn(goalId);
    //     goal = { goalId, ...data } as Goal;
    //     return goal;
    //   });

    // console.warn("getting goal with goalid of : " + goalId);
    // this.firestore
    //   .collection(this.serviceCollection)
    //   .doc<Goal>(goalId)
    //   .get()
    //   .pipe(
    //     map(doc => {
    //       console.warn("Goal found in collection. Inside map.");
    //       let data = doc.data();
    //       let goalId = doc.id
    //       goal = { goalId, ...data } as Goal;
    //       console.warn(goal);
    //     })
    //   );
    // console.warn("Goal being returned: ");
    // console.warn(goal);
  }

  getGoals(userId: string): Observable<any> | Observable<Goal[]> {
    return this.firestore.collection<Goal>(this.serviceCollection, ref => ref.orderBy('dateTimeOfEntry', 'asc'))
      .snapshotChanges()
      .pipe(
        map(docChangeActions => {
          return docChangeActions.map(goalDoc => {
            let data = goalDoc.payload.doc.data();
            let goalId = goalDoc.payload.doc.id;
            // console.warn({ goalId, ...data } as Goal);
            return { goalId, ...data } as Goal;
          });
        })
      );
  }


}
