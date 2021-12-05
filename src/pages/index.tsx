import { useRouter } from 'next/router';

import { FormEvent, useState } from 'react';

import { Button } from '@/components/Button';
import { GoogleButton } from '@/components/GoogleButton';
import { useFirebase } from '@/hooks/useFirabase';
import { useToast } from '@/hooks/useToast';
import {
  Img,
  Container,
  Aside,
  StrongText,
  Text,
  Main,
  Content,
  LogoImage,
  Divider,
  Input,
} from '@/styles/auth.styles';

export default function LoginPage() {
  const { database } = useFirebase();
  const router = useRouter();
  const toast = useToast();

  const [input, setInput] = useState('');

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    const roomRef = await database.collection('rooms').getOne(input);

    if (roomRef.exists()) {
      await router.push(`rooms/${roomRef.key}`);
    } else {
      toast.error('Essa sala ainda não existe');
    }
  }

  return (
    <Container>
      <Aside>
        <Img src="/illustration.svg" alt="ilustração" />
        <StrongText>Crie salas de Q&amp;A ao-vivo </StrongText>
        <Text>Tire as dúvidas da sua audiência em tempo real</Text>
      </Aside>
      <Main>
        <Content>
          <LogoImage src="/logo.svg" alt="logo" />
          <GoogleButton>Crie sua sala com o Google</GoogleButton>
          <Divider>ou entre em uma sala</Divider>
          <form onSubmit={handleJoinRoom}>
            <Input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setInput(e.target?.value)}
            />

            <Button css={{ marginTop: '10px' }} type="submit">
              Entrar na sala
            </Button>
          </form>
        </Content>
      </Main>
    </Container>
  );
}
