import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleDisplayComponent } from '../schedule/schedule-display/schedule-display.component';
import { ScheduleEditComponent } from '../schedule/schedule-edit/schedule-edit.component';
import { ScheduleResolverService } from '../schedule/schedule-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ScheduleDisplayComponent,
    resolve: [ScheduleResolverService],
  },
  { path: 'new-schedule', component: ScheduleEditComponent },
  { path: ':id/edit', component: ScheduleEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
