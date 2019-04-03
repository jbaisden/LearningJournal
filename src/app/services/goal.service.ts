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
    let b = this
      .firestore
      .collection<Goal>(this.serviceCollection)
      .doc(goalId)
      .ref()
      .get();

    return b;
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
