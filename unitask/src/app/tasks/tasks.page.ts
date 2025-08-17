import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TaskService, Task } from '../services/task.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService, private alertController: AlertController) { }

  ngOnInit() {
    //get tasks from the service
    this.tasks = this.taskService.getTasks();
  }

  //navigate to the add task page
  goToAddTask(){
    this.router.navigateByUrl('/add-task')
  }

  // Show sorting alert
  async openSortOptions() {
    const alert = await this.alertController.create({
      header: 'Sort Tasks',
      buttons: [
        {
          text: 'Earliest Due Date',
          handler: () => this.sortByDate()
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  // Sort by date
  sortByDate() {
    this.tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  editTask(task: Task) {
    // todo open edit page
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
    //refresh local array
    this.tasks = this.taskService.getTasks();
  }



}
