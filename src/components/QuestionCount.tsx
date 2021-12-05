import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { questionCount } from '@/store/room.slice';
import { styled } from '@/styles';

const Container = styled('span', {
  marginLeft: '16px',
  background: '$pink-500',
  borderRadius: '99999px',
  padding: '8px 16px',
  color: '$white',
  fontWeight: '500',
  fontSize: '14px',
});

export function QuestionCount() {
  const count = useRecoilValue(questionCount);

  const message = count === 0 ? '' : `${count} pergunta(s)`;

  return <Container>{message}</Container>;
}
