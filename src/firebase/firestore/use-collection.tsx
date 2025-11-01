'use client';

import {useEffect, useState, useRef} from 'react';
import type {
  Query,
  DocumentData,
  QuerySnapshot,
  FirestoreError,
} from 'firebase/firestore';
import {onSnapshot} from 'firebase/firestore';

export type UseCollectionOptions = {
  /**
   * If `true`, the hook will not listen for changes in the collection.
   * This is useful for collections that are not expected to change often.
   *
   * @default false
   */
  disabled?: boolean;
};

/**
 * A hook that provides a real-time stream of a collection from Firestore.
 *
 * @param query The query to listen to.
 * @param options An object of options to configure the hook. See `UseCollectionOptions`.
 * @returns An object with the following properties:
 * - `data`: The data from the collection, or `null` if the data is still loading.
 * - `loading`: A boolean that is `true` while the data is loading, and `false` otherwise.
 * - `error`: An error object if an error occurred, or `null` otherwise.
 */
export function useCollection<T = DocumentData>(
  query: Query<T> | null,
  options: UseCollectionOptions = {disabled: false}
) {
  const {disabled} = options;
  const [data, setData] = useState<QuerySnapshot<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  // We use a ref to store the query to avoid re-running the effect when the query changes.
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    if (disabled || !queryRef.current) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      queryRef.current,
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [disabled]);

  return {data, loading, error};
}
