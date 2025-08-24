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
    //schedule after we have the Firestore doc id (deterministic notif id)
      const t: Task = { ...task, id: ref.id };
      await this.scheduleReminder(t);
      return ref.id;
    });
  }

updateTask(task: Task): Promise<void> {
  if (!task.id) return Promise.reject(new Error('Task id missing'));
 // cancel existing reminder first, then update, then (re)schedule
    const pCancel = this.cancelReminder(task).catch(() => {});
    const pUpdate = updateDoc(doc(this.fb.db, 'tasks', task.id), {
      title: task.title,
      module: task.module,
      date: task.date,
      location: task.location,
      completed: !!task.completed
    });
    return Promise.all([pCancel, pUpdate]).then(() => this.scheduleReminder(task));
  }

deleteTask(task: Task): Promise<void> {
  if (!task.id) return Promise.reject(new Error('Task id missing'));
 // cancel any scheduled notification for this task
    this.cancelReminder(task).catch(() => {});
    return deleteDoc(doc(this.fb.db, 'tasks', task.id));
  }

  // deterministic notification id derived from Firestore doc id
  private notifIdFromTask(task: Task): number {
    const s = task.id || '';
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h % 2147483647);
  }

  // cancel a previously scheduled reminder
  private async cancelReminder(task: Task) {
    try {
      if (!task.id) return;
      const id = this.notifIdFromTask(task);
      await LocalNotifications.cancel({ notifications: [{ id }] });
    } catch (e) {
      console.warn('Local notification cancel failed:', e);
    }
  }

// Schedule a local notification for the task's due date/time
private async scheduleReminder(task: Task) {
  try {
    const when = new Date(task.date); // expects ISO string from ion-datetime
    if (isNaN(when.getTime()) || when.getTime() <= Date.now()) {
      // Skip invalid or past times
      return;
    }
    // use deterministic id & Android channel
    if (!task.id) return;
    const id = this.notifIdFromTask(task);

    const opts: ScheduleOptions = {
      notifications: [{
        id,
        title: 'Task due',
        body: `${task.title} (${task.module}) at ${when.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        schedule: { at: when },
        channelId: 'task-reminders'
      }]
    };

    await LocalNotifications.schedule(opts);
  } catch (e) {
    // Avoid crashing if notifications fail on web/emulator
    console.warn('Local notification schedule failed:', e);
  }
}

}
