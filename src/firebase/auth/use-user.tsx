'use client';

import {useEffect, useState} from 'react';
import {onAuthStateChanged, type User} from 'firebase/auth';

import {useAuth} from '../provider';

/**
 * A hook that provides the current user and their authentication state.
 *
 * It returns an object with the following properties:
 * - `user`: The current user object, or `null` if the user is not authenticated.
 * - `loading`: A boolean that is `true` while the authentication state is being determined, and `false` otherwise.
 */
export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return {user, loading};
}
