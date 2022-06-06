import { State, ScheduleReducer } from './schedule.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
    scheduleState: State;
}
  
export const reducers: ActionReducerMap<AppState, any> = {
    scheduleState: ScheduleReducer
};