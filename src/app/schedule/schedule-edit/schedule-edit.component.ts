import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Schedule } from '../sehedule.model';
import * as fromGlobalReducer from '../store/global.reducer';
import * as ScheduleAction from '../store/schedule.action';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css'],
})
export class ScheduleEditComponent implements OnInit, OnDestroy {
  scheduleEditor: Schedule = null;
  formObject: FormGroup;
  dateChanging: Date = null;
  isEditMode: boolean = false;
  clearSub$ = Subscription.EMPTY;

  constructor(
    private store: Store<fromGlobalReducer.AppState>,
    private router: Router,
  ) // private route: ActivatedRoute
  {}

  ngOnInit(): void {
    this.clearSub$ = this.store.select('scheduleState').subscribe((state) => {
      if (state.editedScheduleIndex > -1) {
        this.isEditMode = true;
        this.scheduleEditor = state.editedSchedule;
        console.log(this.scheduleEditor)
        this.dateChanging = this.scheduleEditor.dateTime;
      } else {
        this.isEditMode = false;
        this.scheduleEditor = null;
        this.dateChanging = null;
      }
    });
    this.initialForm();
    !this.isEditMode ? this.onAddNewActivity() : null;
  }

  private initialForm() {
    let dateTime: Date | string = null;
    let activities = new FormArray([]);

    if (this.isEditMode) {
      if (this.scheduleEditor !== null) {
        dateTime = this.formatDate(this.scheduleEditor.dateTime);
        activities = new FormArray(
          this.scheduleEditor.activities.map((activity) => {
            return new FormGroup({
              startTime: new FormControl(activity.startTime, [
                Validators.required,
                Validators.min(0),
                Validators.max(12),
              ]),
              periodStartState: new FormControl(activity.periodStartState, [
                Validators.required,
              ]),
              endTime: new FormControl(activity.endTime, [
                Validators.required,
                Validators.min(0),
                Validators.max(12),
              ]),
              periodEndState: new FormControl(activity.periodEndState, [
                Validators.required,
              ]),
              activity: new FormControl(activity.activity, [
                Validators.required,
              ]),
            });
          })
        );
      }
    }
    this.formObject = new FormGroup({
      dateTime: new FormControl(dateTime, Validators.required),
      activities: activities,
    });
  }

  onSubmit() {
    console.log(this.formObject.value);
    if (this.isEditMode) {
      this.store.dispatch(
        new ScheduleAction.UpdateSchedule(this.formObject.value)
      );
    } else {
      this.store.dispatch(
        new ScheduleAction.AddSchedule(this.formObject.value)
      );
    }
    this.resetForm();
    setTimeout(() => {
      this.router.navigate(['/schedules']);
    }, 1000)
  }

  get controls() {
    return (<FormArray>this.formObject.get('activities')).controls;
  }

  onAddNewActivity() {
    (<FormArray>this.formObject.get('activities')).push(
      new FormGroup({
        startTime: new FormControl(null, [
          Validators.required,
          Validators.min(0),
          Validators.max(12),
        ]),
        periodStartState: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [
          Validators.required,
          Validators.min(0),
          Validators.max(12),
        ]),
        periodEndState: new FormControl(null, [Validators.required]),
        activity: new FormControl(null, [Validators.required]),
      })
    );
  }

  resetForm() {
    this.formObject.reset();
  }

  onRemoveActivity(index: number) {
    (<FormArray>this.formObject.get('activities')).removeAt(index);
  }

  private formatDate(date: Date) {
    let newDate = new Date(date);
    return newDate.toJSON().split('T')[0];
  }

  ngOnDestroy(): void {
    this.clearSub$.unsubscribe();
    this.store.dispatch(new ScheduleAction.StopEdit());
  }
}
