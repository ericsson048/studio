import {getApps, initializeApp, type FirebaseApp} from 'firebase/app';
import {getAuth, type Auth} from 'firebase/auth';
import {getFirestore, type Firestore} from 'firebase/firestore';

import {firebaseConfig} from './config';

export * from './auth/use-user';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './provider';

/**
 * Initializes Firebase and returns a frozen object containing the Firebase App,
 * Firestore, and Auth instances.
 *
 * This function ensures that Firebase is initialized only once.
 */
export function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
} {
  const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  return Object.freeze({firebaseApp, firestore, auth});
}
