import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { AtomEffect } from 'recoil';

type PersisteCookiesEffect = <T = any>(key: string) => AtomEffect<T>;

export const persisteCookiesEffect: PersisteCookiesEffect =
  (key) =>
  ({ onSet, setSelf }) => {
    const cookies = parseCookies();

    const storageValue = cookies[key];

    if (storageValue) {
      setSelf(JSON.parse(storageValue));
    }

    onSet((changedValue, _, isReset) => {
      isReset
        ? destroyCookie(null, key)
        : setCookie(null, key, JSON.stringify(changedValue));
    });
  };
