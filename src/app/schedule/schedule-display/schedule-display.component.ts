import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { Schedule } from '../sehedule.model';
import * as fromGlobalReducer from '../store/global.reducer';
import * as ScheduleAction from '../store/schedule.action';

@Component({
  selector: 'app-schedule-display',
  templateUrl: './schedule-display.component.html',
  styleUrls: ['./schedule-display.component.css'],
})
export class ScheduleDisplayComponent implements OnInit, OnDestroy {
  today = new Date();
  schedules: Observable<{ schedules: Schedule[] }>;
  sortSchedules: Schedule[] = [];
  showCollapsed = false;
  isSaveSchedule = false;
  clearSaveState$ = Subscription.EMPTY;
  timeline = [2, 4, 6, 8, 10, 12, 2, 4, 6, 8, 10, 12];
  squeezerStartTime: number;
  outdated = false;
  dayLeft = 0;

  constructor(
    private store: Store<fromGlobalReducer.AppState>,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.schedules = this.store.select('scheduleState');
    this.store.select('scheduleState').subscribe((state) => {
      this.sortSchedules = [...state.schedules]
      this.sortSchedules = this.sortSchedules.sort((a: Schedule, b: Schedule) => {
        return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
      });
    });

    this.clearSaveState$ = this.store
      .select('scheduleState')
      .subscribe((state) => {
        if (state.dataChanged === true) {
          this.isSaveSchedule = true;
        }
      });
  }

  onRemoveSchedule(index: number) {
    this.store.dispatch(new ScheduleAction.DeleteSchedule(index));
  }

  onEditSchedule(index: number) {
    this.store.dispatch(new ScheduleAction.StartEdit(index));
    this.router.navigate([index, 'edit'], { relativeTo: this.route });
  }

  onSaveSchedule() {
    this.dataStorageService.storeSchedules();
    this.isSaveSchedule = false;
    this.store.dispatch(new ScheduleAction.ChangedState());
  }

  onFetchSchedule() {
    this.dataStorageService.fetchSchedules();
  }

  ngOnDestroy(): void {
    this.clearSaveState$.unsubscribe();
  }

  calcSqueezerPosition(periodStartState: string, time: number): number {
    if (periodStartState == 'AM') {
      this.squeezerStartTime = time * 3.6;
      return this.squeezerStartTime;
    } else {
      this.squeezerStartTime = time * 3.6 + 48;
      return this.squeezerStartTime;
    }
  }

  calcSqueezerWidth(periodEndState: string, time: number): number {
    if (periodEndState == 'AM') {
      return time * 3.6 - this.squeezerStartTime;
    }
    return time * 3.6 + 48 - this.squeezerStartTime;
  }

  getCurrentTime(): number {
    return new Date().getTime() / 1000;
  }

  getDateTime(date: Date): number {
    return new Date(date).getTime() / 1000;
  }

  outdatedSchedule(date: Date): boolean {
    if (new Date(date).getTime() / 1000 <= this.getCurrentTime() - 86400) {
      this.outdated = true;
      return true;
    }
    this.dayLeft =  Math.ceil((new Date(date).getTime() / 1000 - this.getCurrentTime()) / 86400);
    this.outdated = false;
    return false;
  }

}
