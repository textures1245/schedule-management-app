import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class CrossComponentService {
    constructor() {}

    routeActivated$ = new Subject<boolean>();
}