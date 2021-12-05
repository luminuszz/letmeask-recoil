import { atom, selector } from 'recoil';

import { persisteCookiesEffect } from '@/helpers/persisteCookiesEffect';

export type User = {
  name: string;
  email: string;
  id: string;
  avatarUrl: string;
};

export const COOKIE_USER_KEY = '@letmeask:user';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persisteCookiesEffect(COOKIE_USER_KEY)],
});

export const userIsLogged = selector<boolean>({
  key: 'userIsLogged',
  get: ({ get }) => !!get(userState),
});
