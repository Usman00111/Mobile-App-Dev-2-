import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { collection, onSnapshot, query, orderBy, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';


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
  addTask(task: Task): Promise<string> {
  return addDoc(collection(this.fb.db, 'tasks'), {
    title: task.title,
    module: task.module,
    date: task.date,          
    location: task.location,
    completed: !!task.completed
  }).then(async ref => {
    await this.scheduleReminder(task);  // <-- schedule local notification
    return ref.id;
  });
}

updateTask(task: Task): Promise<void> {
  if (!task.id) return Promise.reject(new Error('Task id missing'));
  return updateDoc(doc(this.fb.db, 'tasks', task.id), {
    title: task.title,
    module: task.module,
    date: task.date,
    location: task.location,
    completed: !!task.completed
  });
}

deleteTask(task: Task): Promise<void> {
  if (!task.id) return Promise.reject(new Error('Task id missing'));
  return deleteDoc(doc(this.fb.db, 'tasks', task.id));
}
// Schedule a local notification for the task's due date/time
private async scheduleReminder(task: Task) {
  try {
    const when = new Date(task.date); // expects ISO string from ion-datetime
    if (isNaN(when.getTime()) || when.getTime() <= Date.now()) {
      // Skip invalid or past times
      return;
    }

    const id = Math.floor(Date.now() % 2147483647); // 32-bit safe id

    const opts: ScheduleOptions = {
      notifications: [{
        id,
        title: 'Task due',
        body: `${task.title} (${task.module}) at ${when.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        schedule: { at: when }
      }]
    };

    await LocalNotifications.schedule(opts);
  } catch (e) {
    // Avoid crashing if notifications fail on web/emulator
    console.warn('Local notification schedule failed:', e);
  }
}



}