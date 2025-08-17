import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TaskService,Task } from '../services/task.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService, private alertController: AlertController) { }

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

  // show sorting alert
async openSortOptions() {
  const alert = await this.alertController.create({
    header: 'Sort Tasks',
    buttons: [
      {
        text: 'Earliest Due Date',
        handler: () => this.sortByDate()   // <-- call it (with parentheses)
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });

  await alert.present();
}

// Sort tasks array (using the correct field name: date)
sortByDate() {
  this.tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}}
