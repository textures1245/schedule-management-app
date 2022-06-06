import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromGlobalReducer from '../schedule/store/global.reducer';
import * as ScheduleAction from '../schedule/store/schedule.action';
import { Schedule } from './sehedule.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  schedules: Schedule[];

  constructor(
    private http: HttpClient,
    private store: Store<fromGlobalReducer.AppState>
  ) {}

  storeSchedules() {
    this.store.select('scheduleState').subscribe((scheduleState) => {
        this.schedules = scheduleState.schedules;
    })
    this.http
      .put<Schedule[]>(environment.databaseAPI, this.schedules)
      .subscribe((states) => {
        alert('Successfully, saved to database');
        console.log('States from PUT: ', states);
      });
  }

  fetchSchedules() {
    this.http
      .get<Schedule[]>(environment.databaseAPI)
      .pipe(
        tap((schedules) => {
          this.store.dispatch(new ScheduleAction.SetSchedule(schedules));
        })
      ).subscribe((states) => {
        console.log('States from GET: ', states);
      });
  }
}
