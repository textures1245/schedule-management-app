import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appDetail = [
    'Created schedules.',
    'Edited schedules.',
    'Deleted schedules.',
    'Display schedules timestamp in real-time.',
    'Responsive design.',
  ]
  patches = [
    '<BETA> Show table schedule timeline in real-time (supported more then 1200 pixel screen size only).',
    'Fixed bug when created new schedule but it has overwrite on other schedule and wrong detect id schedule.',
  ]
  
  version = '1.1.2';

  constructor() { }

  ngOnInit(): void {
  }

}
