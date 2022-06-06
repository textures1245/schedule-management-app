import { Action } from '@ngrx/store';
import { Schedule } from '../sehedule.model';

//* action types
export const ADD_SCHEDULE = 'ADD_SCHEDULE';
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
export const GET_SCHEDULE = 'GET_SCHEDULE';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const SET_SCHEDULE = 'SET_SCHEDULE';
export const CHANGED_STATE = 'CHANGED_STATE';

export class AddSchedule implements Action {
  readonly type = ADD_SCHEDULE;

  constructor(public payload: Schedule) {}
}

export class UpdateSchedule implements Action {
  readonly type = UPDATE_SCHEDULE;
  constructor(public payload: Schedule) {}
}

export class GetSchedule implements Action {
  readonly type = GET_SCHEDULE;
}

export class DeleteSchedule implements Action {
  readonly type = DELETE_SCHEDULE;
  constructor(public payload: number) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class SetSchedule implements Action {
  readonly type = SET_SCHEDULE;

  constructor(public payload: Schedule[]) {}
}

export class ChangedState implements Action {
  readonly type = CHANGED_STATE;
}

export type ScheduleActions =
  | AddSchedule
  | UpdateSchedule
  | GetSchedule
  | DeleteSchedule
  | StartEdit
  | StopEdit
  | SetSchedule
  | ChangedState;
