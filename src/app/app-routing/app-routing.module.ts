import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'schedules',
    loadChildren: () =>
      import('../schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  // {
  //   path: 'new-schedule',
  //   loadChildren: () =>
  //     import('../schedule/schedule.module').then((m) => m.ScheduleModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
