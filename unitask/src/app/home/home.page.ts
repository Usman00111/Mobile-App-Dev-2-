import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  //navigate to timetable page
  goToTimetable(){
    this.router.navigateByUrl('/timetable');
  }

  //navigate to tasks page
  goToTasks(){
    this.router.navigateByUrl('/tasks');
  }

  ngOnInit() {
  }

}
