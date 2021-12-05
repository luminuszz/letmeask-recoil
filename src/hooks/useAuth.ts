import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useFirebase } from '@/hooks/useFirabase';
import { User, userState, userIsLogged } from '@/store/user.slice';

type UseAuthReturn = {
  signWithGoogleSign: () => Promise<void>;
  user: User | null;
  isLogged: boolean;
};

export function useAuth(): UseAuthReturn {
  const firebase = useFirebase();
  const [user, setUser] = useRecoilState(userState);
  const isLogged = useRecoilValue(userIsLogged);

  async function signWithGoogleSign() {
    try {
      const { user } = await firebase.auth.signInWithPopupWithGoogle();

      if (!user.photoURL || !user.displayName) {
        throw new Error('Missing informations');
      }

      setUser({
        name: user.displayName as string,
        email: user.email as string,
        id: user.uid,
        avatarUrl: user.photoURL,
      });
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    const unSubscribe = firebase.auth.onAuthStateEffectListener((user) => {
      if (user) {
        if (!user.photoURL || !user.displayName) {
          throw new Error('Missing informations');
        }

        setUser({
          name: user.displayName as string,
          email: user.email as string,
          id: user.uid,
          avatarUrl: user.photoURL,
        });
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return {
    user,
    isLogged,
    signWithGoogleSign,
  };
}
