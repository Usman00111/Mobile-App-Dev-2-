import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
  standalone: false
})
export class EditTaskPage {

  task!: Task;

  constructor(private router: Router, private taskService: TaskService) {
    //get the task from navigation state 
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { task: Task };
    this.task = state.task;

  }

  saveChanges() {
    //remove old version of task
    this.taskService.deleteTask(this.task);

    //re-add the modified task
    this.taskService.addTask(this.task);

    //go back to the task page
    this.router.navigateByUrl('/tasks');
  }

}
