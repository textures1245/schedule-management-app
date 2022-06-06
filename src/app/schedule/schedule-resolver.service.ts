import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Schedule } from './sehedule.model';
import * as fromGlobalReducer from './store/global.reducer';
import { Store } from '@ngrx/store';
import * as ScheduleAction from './store/schedule.action';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleResolverService implements Resolve<Schedule[]> {
  schedules: Schedule[];
  
  constructor(
    private store: Store<fromGlobalReducer.AppState>,
    private dataStorage: DataStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Schedule[] | Observable<Schedule[]> | Promise<Schedule[]> | any{
    this.store.select('scheduleState').subscribe((state) => {
      this.schedules = state.schedules;
    });

    if (this.schedules.length === 0) {
      return this.dataStorage.fetchSchedules();
    } else {
      return this.schedules;
    }
  }
}
