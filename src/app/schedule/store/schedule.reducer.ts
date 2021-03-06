import { Schedule } from '../sehedule.model';
import { Activity } from '../activity.model';
import * as ScheduleAction from './schedule.action';

export interface State {
  schedules: Schedule[];
  dataChanged: boolean;
  editedSchedule: Schedule;
  editedScheduleIndex: number;
}

const initialState: State = {
  schedules: [
    // new Schedule(new Date(2020, 0, 1, 8, 0, 0), [
    //   new Activity(6, 'AM', 8, 'AM', 'Some text'),
    // ]),
    // new Schedule(new Date(2022, 5, 1, 8, 0, 0), [
    //   new Activity(2, 'AM', 8, 'AM', 'Some text'),
    //   new Activity(2, 'AM', 8, 'AM', 'Some text'),
  ],
  // ]),
  dataChanged: false,
  editedSchedule: null,
  editedScheduleIndex: -1,
};

export function ScheduleReducer(
  state = initialState,
  action: ScheduleAction.ScheduleActions
): State {
  switch (action.type) {
    case ScheduleAction.ADD_SCHEDULE:
      const generateId =
        state.schedules.length === 0
          ? 0
          : Math.max(...state.schedules.map((s) => s.id)) + 1;
      console.log(generateId);
      return {
        ...state,
        dataChanged: true,
        schedules: [...state.schedules, { id: generateId, ...action.payload }],
      };
    case ScheduleAction.GET_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.filter((ig, index) => {
          return index === state.editedScheduleIndex;
        }),
      };
    case ScheduleAction.SET_SCHEDULE:
      let setNewSchedules = [...state.schedules];
      setNewSchedules = action.payload;
      return {
        ...state,
        schedules: setNewSchedules,
      };
    case ScheduleAction.UPDATE_SCHEDULE:
      const schedule = state.schedules[state.editedScheduleIndex];
      const updatedSchedule: Schedule = {
        ...schedule, //* old schedule
        ...action.payload, //* new schedule on payload
      };
      let updateSchedule: Schedule[] = [...state.schedules];
      updateSchedule[state.editedScheduleIndex] = updatedSchedule; //* new schedule that been updated
      return {
        ...state,
        dataChanged: true,
        schedules: updateSchedule,
      };
    case ScheduleAction.DELETE_SCHEDULE:
      return {
        ...state,
        dataChanged: true,
        schedules: state.schedules.filter((ig, index) => {
          return ig.id !== action.payload;
        }),
      };
    case ScheduleAction.START_EDIT:
      return {
        ...state,
        editedScheduleIndex: action.payload,
        editedSchedule: { ...state.schedules.find((s) => s.id == action.payload) }, //* copy the schedule edited
      };
    case ScheduleAction.STOP_EDIT:
      return {
        ...state,
        editedScheduleIndex: -1,
        editedSchedule: null,
      };
    case ScheduleAction.CHANGED_STATE:
      return {
        ...state,
        dataChanged: false,
      };
    default:
      return state;
  }
}
