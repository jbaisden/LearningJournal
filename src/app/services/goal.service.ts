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
      .set(data);
  }

  deleteGoal(goalId: string) {
    return this.firestore
      .collection(this.serviceCollection)
      .doc(goalId)
      .delete();
  }

  getGoal(goalId: string): Goal {
    let goal: Goal;

    //guard against undefined 
    if (!goalId) { return new Goal(); }

    this
      .firestore
      .doc<Goal>("Goals/" + goalId)
      .get()
      .subscribe((doc) => {
        let data = doc.data();
        let goalId = doc.id;
        console.warn(data);
        console.warn(goalId);
        goal = { goalId, ...data } as Goal;
        return goal;
      });

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
    return goal;
  }

  getGoals(userId: string): Observable<any> | Observable<Goal[]> {
    return this.firestore.collection<Goal>(this.serviceCollection, ref => ref.orderBy('dateTimeOfEntry', 'asc'))
      .snapshotChanges()
      .pipe(
        map(docChangeActions => {
          return docChangeActions.map(coffeeOrderDoc => {
            let data = coffeeOrderDoc.payload.doc.data();
            let goalId = coffeeOrderDoc.payload.doc.id;
            // console.warn({ goalId, ...data } as Goal);
            return { goalId, ...data } as Goal;
          });
        })
      );
  }


}
