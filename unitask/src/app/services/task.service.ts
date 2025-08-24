import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';


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

// Live tasks from Firestore (ordered by date asc)
  tasks$(): Observable<Task[]> {
    return new Observable<Task[]>(sub => {
      const q = query(collection(this.fb.db, 'tasks'), orderBy('date', 'asc'));
      const unsub = onSnapshot(q, snap => {
        const items: Task[] = snap.docs.map(d => {
          const data = d.data() as any;
          return {
            id: d.id,
            title: data.title,
            module: data.module,
            date: data.date,
            location: data.location,
            completed: !!data.completed,
          };
        });
        sub.next(items);
      }, err => sub.error(err));
      return () => unsub();
    });
  }
  
  addTask(_task: Task): Promise<string> { return Promise.resolve(''); }
  updateTask(_task: Task): Promise<void> { return Promise.resolve(); }
  deleteTask(_task: Task): Promise<void> { return Promise.resolve(); }
}