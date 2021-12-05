import Image from 'next/image';

import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { useToast } from '@/hooks/useToast';
import { Room } from '@/services/firebase/database';
import { currentIdRoom, roomDetails } from '@/store/room.slice';
import { styled } from '@/styles';

const Container = styled('button', {
  height: '40px',
  borderRadius: '8px',
  overflow: 'hidden',

  background: '$white',
  border: '1px solid $purple-500',
  cursor: 'pointer',
  display: 'flex',
});

const Content = styled('div', {
  background: '$purple-500',
  padding: '0 12px',
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  alignItems: 'center',
});

const Code = styled('span', {
  display: 'block',
  alignSelf: 'center',
  flex: '1',
  padding: '0 16px 0 12px',
  width: '230px',
  fontSize: '14px',
  fontWeight: 500,
});

export function CopyCode() {
  const { contents, state } = useRecoilValueLoadable(currentIdRoom);
  const toast = useToast();

  async function handleCopyCode() {
    if (contents) {
      await navigator.clipboard.writeText(contents);

      toast.success('Código copiado !');
    }
  }

  const isLoading = state === 'loading';

  return (
    <Container onClick={handleCopyCode} disabled={!contents}>
      <Content>
        <img src="/copy.svg" alt="Copy room code" />
      </Content>

      <Code> {isLoading ? '...' : `Sala ${contents}`}</Code>
    </Container>
  );
}
