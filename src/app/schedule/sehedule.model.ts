import { Activity } from "./activity.model";

export class Schedule {
    constructor(
        public dateTime: Date,
        public activities: Activity[]
    ) {}
}