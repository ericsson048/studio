'use client';

import {useEffect, useState} from 'react';
import { firebaseConfig } from './config';

import {FirebaseProvider, type FirebaseProviderProps} from './provider';
import { LoaderCircle } from 'lucide-react';

/**
 * A client-side component that initializes Firebase and provides it to its children.
 *
 * It ensures that Firebase is initialized only once on the client.
 */
export function FirebaseClientProvider({children}: React.PropsWithChildren) {
  const [firebase, setFirebase] = useState<FirebaseProviderProps | null>(null);

  useEffect(() => {
    const isFirebaseConfigured = 
      firebaseConfig.apiKey &&
      !firebaseConfig.apiKey.startsWith('YOUR_') &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId;

    if (isFirebaseConfigured) {
      import('.').then(({initializeFirebase}) => {
        setFirebase(initializeFirebase());
      });
    } else {
      console.warn("Firebase configuration is missing or contains placeholder values. Please update your .env file with your project's credentials. Firebase will not be initialized.");
      setFirebase({} as FirebaseProviderProps); 
    }
  }, []);
  
  // While firebase is initializing, show a loading indicator
  if (!firebase) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <FirebaseProvider 
      firebaseApp={firebase?.firebaseApp}
      firestore={firebase?.firestore}
      auth={firebase?.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
