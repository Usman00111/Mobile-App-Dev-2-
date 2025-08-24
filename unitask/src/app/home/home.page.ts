import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { TaskService,Task } from '../services/task.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})

export class HomePage implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private sub?: Subscription;

  constructor(private router: Router,private taskService: TaskService,private alertController: AlertController) {}

  ngOnInit() {
    // Subscribe to Firestore tasks observable; keep completed at bottom
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

  // Navigate to pages
  goToTimetable() { this.router.navigateByUrl('/timetable'); }
  goToTasks() { this.router.navigateByUrl('/tasks'); }

  // Mark complete- persist to Firestore (UI updates via observable)
  markComplete(task: Task) {
    this.taskService.updateTask({ ...task, completed: true });
  }

  // Sort UI list locally
  async openSortOptions() {
    const alert = await this.alertController.create({
      header: 'Sort Tasks',
      buttons: [
        { text: 'Earliest Due Date', handler: () => this.sortByDate() },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await alert.present();
  }

  // Sort by due date (ascending) in the current view
  sortByDate() {
    this.tasks = this.tasks.slice().sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}