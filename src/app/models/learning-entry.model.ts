export class LearningEntry {

    learningEntryId: string;
    goalId: string;
    text: string;
    type: string;
    dateTimeOfEntry: Date;

    constructor() {
        this.dateTimeOfEntry = new Date();
    }
}