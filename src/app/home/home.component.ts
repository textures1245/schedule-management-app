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
    '<BETA> Show table schedule timeline in real-time (supported more then 1200 pixel screen size only).'
  ]
  
  version = '1.1.1';

  constructor() { }

  ngOnInit(): void {
  }

}
