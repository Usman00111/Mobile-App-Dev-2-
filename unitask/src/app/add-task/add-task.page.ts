import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

// Angular component decorator that define metadata for this page
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: false
})
export class AddTaskPage {

  // Properties bound to form inputs
  taskTitle = '';
  taskModule = '';
  taskDate = '';
  taskLocation = '';


  constructor(private router: Router, private taskService: TaskService) { }

  // Method to save a new task
  async saveTask() {
    await this.taskService.addTask({
      title: this.taskTitle,
      module: this.taskModule,
      date: this.taskDate,
      location: this.taskLocation,
      completed: false
    });
    //route back to tasks page
    this.router.navigate(['/tasks']);
  }
}
