import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { FormEvent, useEffect, useState } from 'react';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';

import { Button } from '@/components/Button';
import { CopyCode } from '@/components/CopyCode.';
import { QuestionCount } from '@/components/QuestionCount';
import { useAuth } from '@/hooks/useAuth';
import { useFirebase } from '@/hooks/useFirabase';
import { useToast } from '@/hooks/useToast';
import { database } from '@/services/firebase';
import type { Room } from '@/services/firebase/database';
import { currentIdRoom, roomDetails } from '@/store/room.slice';
import {
  Main,
  Container,
  Header,
  RoomImgLogo,
  HeaderContent,
  TextArea,
  FormFooter,
  UserInfo,
} from '@/styles/room.styles';

export default function Room() {
  const { user, isLogged } = useAuth();
  const { database } = useFirebase();
  const toast = useToast();
  const {
    query: { id },
  } = useRouter();
  const [newQuestion, setNewQuestion] = useState('');
  const setRoomDetails = useSetRecoilState(roomDetails);

  async function handleCreateNewQuestion(e: FormEvent) {
    try {
      e.preventDefault();

      if (!newQuestion.trim()) return;

      if (!user) {
        toast.error('Você precisa estar logado para criar perguntas');
        return;
      }

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

      toast.success('Sua pergunta foi enviado !');
    } catch (e) {
      toast.error('Ocorreu um erro ao criar a pergunta');
    }
  }

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
          <CopyCode />
        </HeaderContent>
      </Header>

      <Main>
        <div className="room-title">
          <h2>Sala de Node.js</h2>
          <QuestionCount />
        </div>

        <form onSubmit={handleCreateNewQuestion}>
          <TextArea
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

            <Button css={{ width: 'auto' }} type="submit">
              Enviar pergunta
            </Button>
          </FormFooter>
        </form>
      </Main>
    </Container>
  );
}
