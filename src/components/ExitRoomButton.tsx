import { ButtonHTMLAttributes } from 'react';

import { Button } from '@/components/Button';
import { styled } from '@/styles';

export const Icon = styled('img', {
  width: '20px',
  height: '20px',

  svg: {
    fill: '$background',
  },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function ExitRoomButton(props: Props) {
  return (
    <Button
      {...props}
      css={{ width: '50px', height: '40px', marginLeft: '20px' }}
    >
      <Icon src="/log-out.svg" alt="logout" />
    </Button>
  );
}
