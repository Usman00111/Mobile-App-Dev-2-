import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: false
})
export class AddTaskPage {

  taskTitle = '';
  taskModule = '';
  taskDate = '';
  taskLocation = '';


  constructor(private router: Router, private taskService: TaskService) { }

  //temporar: just log the data and navifgate back 
  saveTask() {
    //save to service
    this.taskService.addTask({
      title: this.taskTitle,
      module: this.taskModule,
      date: this.taskDate,
      location: this.taskLocation
    });
    //route back to tasks page
    this.router.navigate(['/tasks']);
  }
}
