'use client';

import {useEffect, useState} from 'react';

import {FirebaseProvider, type FirebaseProviderProps} from './provider';

/**
 * A client-side component that initializes Firebase and provides it to its children.
 *
 * It ensures that Firebase is initialized only once on the client.
 */
export function FirebaseClientProvider({children}: React.PropsWithChildren) {
  const [firebase, setFirebase] = useState<FirebaseProviderProps | null>(null);

  useEffect(() => {
    // Dynamically import initializeFirebase to ensure it's only run on the client.
    import('.').then(({initializeFirebase}) => {
      setFirebase(initializeFirebase());
    });
  }, []);

  if (!firebase) {
    // You can show a loading skeleton here if you want.
    // We return null to keep it simple.
    return null;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
