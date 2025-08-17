import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TaskService,Task } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit() {
  // for now, showing all tasks
    this.tasks = this.taskService.getTasks();
  }

  //navigate to timetable page
  goToTimetable(){
    this.router.navigateByUrl('/timetable');
  }

  //navigate to tasks page
  goToTasks(){
    this.router.navigateByUrl('/tasks');
  }


}
