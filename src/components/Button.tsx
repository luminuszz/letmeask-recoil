import { ButtonHTMLAttributes, ReactNode } from 'react';

import { styled } from '@/styles';
import { CSS } from '@stitches/react';

const Container = styled('button', {
  height: '50px',
  borderRadius: '8px',
  fontWeight: 500,
  background: '$purple-500',
  px: '32px',
  width: '100%',
  color: '$white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 0,
  transition: 'filter 0.2s',

  '&:not:(:disabled):hover': {
    filter: 'brightness(0.9)',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  css?: CSS;
};

export function Button({ children, ...props }: Props) {
  return <Container {...props}>{children}</Container>;
}
