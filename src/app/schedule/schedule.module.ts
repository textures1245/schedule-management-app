import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ScheduleRoutingModule } from "../app-routing/schedule-routing.module";
import { ScheduleDetailComponent } from "./schedule-detail/schedule-detail.component";
import { ScheduleDisplayComponent } from "./schedule-display/schedule-display.component";
import { ScheduleEditComponent } from "./schedule-edit/schedule-edit.component";
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [
        ScheduleDisplayComponent,
        ScheduleEditComponent,
        ScheduleDetailComponent
    ],

    imports: [
        CommonModule,
        RouterModule,
        ScheduleRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ]
})

export class ScheduleModule {}