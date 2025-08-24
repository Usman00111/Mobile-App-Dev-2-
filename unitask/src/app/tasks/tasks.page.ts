import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { TaskService, Task } from '../services/task.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false
})
export class TasksPage implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private sub?: Subscription;

  constructor(private router: Router, private taskService: TaskService, private alertController: AlertController) { }

  ngOnInit() {
    // subscribe to Firestore tasks and keep completed at the bottom
    this.sub = this.taskService.tasks$().subscribe(items => {
      this.tasks = items.slice().sort((a, b) => {
        if (!!a.completed === !!b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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
    this.tasks = this.tasks.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  editTask(task: Task) {
    this.router.navigateByUrl('/edit-task', {state: { task } });
  }

  deleteTask(task: Task) {
    // Firestore delete; list auto-refreshes via tasks$ subscription
    this.taskService.deleteTask(task);
  }

  markComplete(task: Task) {
    // Persist completion to Firestore; UI updates via tasks$ subscription
    this.taskService.updateTask({ ...task, completed: true });
  }

}
