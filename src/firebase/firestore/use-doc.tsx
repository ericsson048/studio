'use client';

import {useEffect, useState, useRef} from 'react';
import type {
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';
import {onSnapshot} from 'firebase/firestore';

export type UseDocOptions = {
  /**
   * If `true`, the hook will not listen for changes in the document.
   * This is useful for documents that are not expected to change often.
   *
   * @default false
   */
  disabled?: boolean;
};

/**
 * A hook that provides a real-time stream of a document from Firestore.
 *
 * @param ref The reference to the document to listen to.
 * @param options An object of options to configure the hook. See `UseDocOptions`.
 * @returns An object with the following properties:
 * - `data`: The data from the document, or `null` if the data is still loading.
 * - `loading`: A boolean that is `true` while the data is loading, and `false` otherwise.
 * - `error`: An error object if an error occurred, or `null` otherwise.
 */
export function useDoc<T = DocumentData>(
  ref: DocumentReference<T> | null,
  options: UseDocOptions = {disabled: false}
) {
  const {disabled} = options;
  const [data, setData] = useState<DocumentSnapshot<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  // We use a ref to store the ref to avoid re-running the effect when the ref changes.
  const refRef = useRef(ref);

  useEffect(() => {
    refRef.current = ref;
  }, [ref]);

  useEffect(() => {
    if (disabled || !refRef.current) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      refRef.current,
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
