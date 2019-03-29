export class Goal {

    goalId: string;
    parentGoalId: string;
    goalText: string;
    progress: string;

    constructor() { }

    public IsSubGoal(): boolean {
        return this.parentGoalId === null;
    }

}