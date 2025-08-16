import { Component} from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private router: Router) { }

  //temporar: just log the data and navifgate back 
  saveTask() {
    console.log({
      title: this.taskTitle,
      module: this.taskModule,
      date: this.taskDate
    });
    this.router.navigate(['/home']);
  }
}
