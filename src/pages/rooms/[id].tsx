import { useRouter } from 'next/router';

import { FormEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { Button } from '@/components/Button';
import { CopyCode } from '@/components/CopyCode.';
import { ExitRoomButton } from '@/components/ExitRoomButton';
import { QuestionCount } from '@/components/QuestionCount';
import { useAuth } from '@/hooks/useAuth';
import { useFirebase } from '@/hooks/useFirabase';
import { useLoading } from '@/hooks/useLoading';
import { useToast } from '@/hooks/useToast';
import { roomDetails } from '@/store/room.slice';
import {
  Main,
  Container,
  Header,
  RoomImgLogo,
  HeaderContent,
  TextArea,
  FormFooter,
  UserInfo,
  HeaderActions,
} from '@/styles/room.styles';

export default function Room() {
  const { user } = useAuth();
  const { database } = useFirebase();
  const { isLoading, state } = useLoading();
  const notify = useToast();
  const router = useRouter();

  const [newQuestion, setNewQuestion] = useState('');
  const [room, setRoomDetails] = useRecoilState(roomDetails);
  const id = router.query?.id as string;

  async function handleCreateNewQuestion(e: FormEvent) {
    try {
      e.preventDefault();

      if (!newQuestion.trim()) return;

      if (!user) {
        notify.error('Você precisa estar logado para criar perguntas');
        return;
      }

      state.start();

      const question = {
        content: newQuestion,
        author: {
          name: user.name,
          avatar: user.avatarUrl,
        },
        isHighlighted: false,
        isAnswered: false,
      };

      await database.collection('rooms').insert(`${id}/questions`, question);

      setNewQuestion('');

      notify.success('Sua pergunta foi enviado !');
    } catch (e) {
      notify.error('Ocorreu um erro ao criar a pergunta');
    } finally {
      state.stop();
    }
  }

  const handleExitRoom = () => router.push('/');

  useEffect(() => {
    database.collection('rooms').on(`${id}`, (room) => {
      const databaseRoom = room.val();

      setRoomDetails({ ...databaseRoom, key: id });
    });
  }, [id, database, setRoomDetails]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <RoomImgLogo src="/logo.svg" />
          <HeaderActions>
            <CopyCode />
            <ExitRoomButton onClick={handleExitRoom} />
          </HeaderActions>
        </HeaderContent>
      </Header>

      <Main>
        <div className="room-title">
          <h2>{room?.roomName}</h2>
          <QuestionCount />
        </div>

        <form onSubmit={handleCreateNewQuestion}>
          <TextArea
            disabled={isLoading}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Oque você quer perguntar ?"
          />

          <FormFooter>
            {!!user ? (
              <UserInfo>
                <img src={user.avatarUrl} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}

            <Button css={{ width: 'auto' }} type="submit" disabled={isLoading}>
              Enviar pergunta
            </Button>
          </FormFooter>
        </form>
      </Main>
    </Container>
  );
}
