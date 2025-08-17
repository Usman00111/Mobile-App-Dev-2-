import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit() {
    //get tasks from the service
    this.tasks = this.taskService.getTasks();
  }

  //navigate to the add task page
  goToAddTask(){
    this.router.navigateByUrl('/add-task')
  }



}
