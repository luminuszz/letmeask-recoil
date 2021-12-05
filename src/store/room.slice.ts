import { atom, selector } from 'recoil';

import { Question, Room } from '@/services/firebase/database';

export const roomDetails = atom<Room | null>({
  key: 'roomDetails',
  default: null,
});

export const currentIdRoom = selector<string>({
  key: 'currentRoom',
  get: ({ get }) => get(roomDetails)?.key || '',
});

export const currentRoomsQuestions = selector<Question[]>({
  key: 'currentRoomsQuestions',
  get: ({ get }) => {
    const room = get(roomDetails);

    return Object.entries(room?.questions || {}).map(([key, content]) => ({
      id: key,
      ...content,
    }));
  },
});

export const questionCount = selector<number | null>({
  key: 'questionCount',
  get: ({ get }) => {
    const questions = get(currentRoomsQuestions);

    console.log({
      questions,
    });

    return questions ? questions.length : null;
  },
});
