import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  initializeFirestore,
  Firestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  app: FirebaseApp;
  db: Firestore;

  constructor() {
    // Initialises Firebase app with your web config
    this.app = initializeApp(environment.firebase);

    // offline persistence:
    // - persistentLocalCache:  stores data in IndexedDB
    // - persistentMultipleTabManager:   safe multi-tab usage
    this.db = initializeFirestore(this.app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
  }
}
