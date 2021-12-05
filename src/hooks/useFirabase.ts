import { auth, database } from '@/services/firebase';

export function useFirebase() {
  return {
    auth,
    database,
  };
}
