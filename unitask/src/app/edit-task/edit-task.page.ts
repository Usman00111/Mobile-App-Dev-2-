import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

// Angular component decorator that defines metadata for this page
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
  standalone: false
})
export class EditTaskPage {

  // Task object to hold the task being edited
  task!: Task;

  // Inject Router (for navigation) and TaskService (for data handling)
  constructor(private router: Router, private taskService: TaskService) {
    //get the task from navigation state 
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { task: Task };
    this.task = state.task;

  }

  // Save updated task details and navigate back to tasks list
  async saveChanges() {
    await this.taskService.updateTask(this.task);
    this.router.navigateByUrl('/tasks');
  }

}
