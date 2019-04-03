import { Goal } from "./goal.model";

export class LearningEntry {

    learningEntryId: string;
    goalId: string;
    text: string;
    type: string;
    dateTimeOfEntry: Date;
    goal: Goal;

    constructor() {
        this.dateTimeOfEntry = new Date();
    }
}