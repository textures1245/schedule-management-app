export class Activity {
    
    constructor(
        public startTime: number,
        public periodStartState: string,
        public endTime: number,
        public periodEndState: string,
        public activity: string
    ) {}
}