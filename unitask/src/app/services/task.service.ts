import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';

export interface Task {
   id?: string;
  title: string;
  module: string;
  date: string;
  location: string;
  completed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private fb: FirebaseService) {}

  // Stub methods for now
  tasks$(): Observable<Task[]> {
    return new Observable<Task[]>(sub => { sub.next([]); sub.complete(); });
  }
  addTask(_task: Task): Promise<string> { return Promise.resolve(''); }
  updateTask(_task: Task): Promise<void> { return Promise.resolve(); }
  deleteTask(_task: Task): Promise<void> { return Promise.resolve(); }
}