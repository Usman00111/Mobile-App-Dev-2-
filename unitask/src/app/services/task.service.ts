import { Injectable } from '@angular/core';

export interface Task {
  title: string;
  module: string;
  date: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {}
// Add a new task
  addTask(task: Task) {
    this.tasks.push(task);
  }
  // Get all tasks
  getTasks(): Task[] {
    return this.tasks;
  }

  //delete a task
  deleteTask(taskToDelete: Task) {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
  }
}