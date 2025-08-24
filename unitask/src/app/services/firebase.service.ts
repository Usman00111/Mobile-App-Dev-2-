import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  app: FirebaseApp;
  db: Firestore;

  constructor() {
    // Initializes Firebase app with the web config
    this.app = initializeApp(environment.firebase);

    // Initialize Firestore for the app
    this.db = getFirestore(this.app);
  }
}
