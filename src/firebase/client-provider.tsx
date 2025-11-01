
'use client';

import {useEffect, useState} from 'react';
import { firebaseConfig } from './config';

import {FirebaseProvider, type FirebaseProviderProps} from './provider';

/**
 * A client-side component that initializes Firebase and provides it to its children.
 *
 * It ensures that Firebase is initialized only once on the client.
 */
export function FirebaseClientProvider({children}: React.PropsWithChildren) {
  const [firebase, setFirebase] = useState<FirebaseProviderProps | null>(null);

  useEffect(() => {
    // Check if all necessary Firebase config keys are present and not placeholders
    const isFirebaseConfigured = 
      firebaseConfig.apiKey &&
      !firebaseConfig.apiKey.startsWith('YOUR_') &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId;

    if (isFirebaseConfigured) {
      // Dynamically import initializeFirebase to ensure it's only run on the client.
      import('.').then(({initializeFirebase}) => {
        setFirebase(initializeFirebase());
      });
    } else {
      console.warn("Firebase configuration is missing or contains placeholder values. Please update your .env file with your project's credentials. Firebase will not be initialized.");
      // Set a marker to indicate config is invalid, so children can render without waiting.
      setFirebase({} as FirebaseProviderProps); 
    }
  }, []);

  if (!firebase) {
    // While Firebase is initializing, we can return null or a loading spinner.
    // However, to avoid a flash of missing content, we'll let child pages handle their own loading state.
    // We will render the children, but the context will be null, so hooks will fail if not handled correctly.
    // The fix is to render the provider with a null context, and have consumers check the context.
    return <FirebaseProvider
      firebaseApp={null as any}
      firestore={null as any}
      auth={null as any}
    >
      {children}
    </FirebaseProvider>
  }
  
  if (!firebase.firebaseApp) {
     return <FirebaseProvider
      firebaseApp={null as any}
      firestore={null as any}
      auth={null as any}
    >
      {children}
    </FirebaseProvider>
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}

