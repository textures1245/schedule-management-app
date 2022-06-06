import { Component, OnInit } from '@angular/core';
import { CrossComponentService } from '../cross-component.service';

@Component({
  selector: 'app-dropdown-header',
  templateUrl: './dropdown-header.component.html',
  styleUrls: ['./dropdown-header.component.css']
})
export class DropdownHeaderComponent implements OnInit {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
  }

  onActivateRoute() {
    this.crossComponentService.routeActivated$.next(false);
  }
}
