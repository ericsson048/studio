'use client';

import {createContext, useContext, type ReactNode} from 'react';
import type {FirebaseApp} from 'firebase/app';
import type {Auth} from 'firebase/auth';
import type {Firestore} from 'firebase/firestore';

export interface FirebaseProviderProps {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  children: ReactNode;
}

const FirebaseContext = createContext<Omit<
  FirebaseProviderProps,
  'children'
> | null>(null);

/**
 * The FirebaseProvider component is a React Context Provider that allows you
 * to pass a Firebase app instance to all of your child components.
 * This is useful for avoiding the need to pass the app instance down through
 * multiple levels of components.
 */
export function FirebaseProvider({
  firebaseApp,
  firestore,
  auth,
  children,
}: FirebaseProviderProps) {
  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        firestore,
        auth,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

/**
 * Custom hook for accessing the Firebase context.
 *
 * It returns an object containing the Firebase app, Firestore, and Auth instances.
 * If the hook is used outside of a FirebaseProvider, it will throw an error.
 *
 * @returns An object with the following properties:
 *   - firebaseApp: The Firebase app instance.
 *   - firestore: The Firestore instance.
 *   - auth: The Auth instance.
 */
export function useFirebase() {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }

  return context;
}

/**
 * A hook that returns the Firebase App instance.
 */
export function useFirebaseApp() {
  return useFirebase().firebaseApp;
}

/**
 * A hook that returns the Firebase Firestore instance.
 */
export function useFirestore() {
  return useFirebase().firestore;
}

/**
 * A hook that returns the Firebase Auth instance.
 */
export function useAuth() {
  return useFirebase().auth;
}
