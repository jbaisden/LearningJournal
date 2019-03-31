export class Goal {

    goalId: string;
    parentGoalId: string;
    goalText: string;
    progress: string;
    dateTimeOfEntry: Date;

    constructor() {
        this.dateTimeOfEntry = new Date();
     }

    public IsSubGoal(): boolean {
        return this.parentGoalId === null;
    }

}