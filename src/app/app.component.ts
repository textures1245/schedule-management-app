import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CrossComponentService } from './shared/cross-component.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'schedule-management-app';
  smContainer = false;
  openRoute = false;
  clearState$ = Subscription.EMPTY;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1150px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.smContainer = true;
        } else {
          this.smContainer = false;
          this.openRoute = false;
        }
      });
    this.clearState$ =  this.crossComponentService.routeActivated$.subscribe((state) => {
      this.openRoute = state;
    });
  }

  onOpenRoute() {
    this.openRoute = !this.openRoute;
  }

  ngOnDestroy(): void {
    this.clearState$.unsubscribe();
  }
}
