export class Goal {

    goalId: string;
    parentGoalId: string;
    goalText: string;
    progress: string;
    archived: boolean;
    isComplete: boolean;
    dateTimeOfEntry: Date;

    constructor() {
        this.dateTimeOfEntry = new Date();
    }

}