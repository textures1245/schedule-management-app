import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { ScheduleModule } from './schedule/schedule.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HrCenterDirective } from './directives/hr-center.directive';
import { StoreModule } from '@ngrx/store';
import { reducers } from './schedule/store/global.reducer';
import { HttpClientModule } from '@angular/common/http';
import { DropdownHeaderComponent } from './shared/dropdown-header/dropdown-header.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HrCenterDirective,
    DropdownHeaderComponent,
  ],
  imports: [
    BrowserModule,
    ScheduleModule,
    StoreModule.forRoot(reducers),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
