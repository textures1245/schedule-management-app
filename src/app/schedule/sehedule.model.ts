import { Activity } from "./activity.model";

export class Schedule {
    constructor(
        public id: number,
        public dateTime: Date,
        public activities: Activity[]
    ) {}
}