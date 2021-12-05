import { atom, atomFamily } from 'recoil';

export const formState = atomFamily<Record<string, any>, Record<string, any>>({
  key: 'formState',
  default: (value) => value,
});

export const formErros = atom({
  key: 'formErros',
  default: {},
});
