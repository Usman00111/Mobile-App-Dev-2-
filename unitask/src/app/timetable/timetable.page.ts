import { Component, OnInit } from '@angular/core';

// Angular component decorator that defines metadata for this page
@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
  standalone: false
})
export class TimetablePage implements OnInit {

  // Constructor whisch is currently empty (no dependenciess injjected)
  constructor() { }

// Lifecycle hook whisch  runs when the component is initializsed
  ngOnInit() {
  }

}
