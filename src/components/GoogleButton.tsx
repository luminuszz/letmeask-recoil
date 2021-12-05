import { useRouter } from 'next/router';

import type { ReactNode } from 'react';
import { ButtonHTMLAttributes } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { styled } from '@/styles';
import { CSS } from '@stitches/react';

const Container = styled('button', {
  marginTop: '64px',
  height: '50px',
  borderRadius: '8px',
  fontWeight: 500,
  background: '$google',
  width: '100%',
  color: '$white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 0,
  transition: 'filter 0.2s',
  '&:hover': {
    filter: 'brightness(0.9)',
  },
});
const IconImage = styled('img', {
  marginRight: '8px',
});

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  css?: CSS;
  children: ReactNode;
};
export function GoogleButton({ children, ...props }: Props) {
  const router = useRouter();
  const toast = useToast();
  const { signWithGoogleSign, user } = useAuth();

  async function handleCreateNewRoomWithGoogle() {
    try {
      if (!user) {
        await signWithGoogleSign();
      }

      await router.push('/rooms/new');

      toast.success('Crie uma sala para começar a fazer perguntas !');
    } catch (e) {
      toast.error('Ocorreu um erro ao fazer o login');
    }
  }

  return (
    <Container {...props} onClick={handleCreateNewRoomWithGoogle}>
      <IconImage src="/google-icon.svg" />
      {children}
    </Container>
  );
}
