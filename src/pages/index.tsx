import { useRouter } from 'next/router';

import * as Yup from 'yup';

import { Button } from '@/components/Button';
import { GoogleButton } from '@/components/GoogleButton';
import { useFirebase } from '@/hooks/useFirabase';
import { useForm } from '@/hooks/useForm';
import { useLoading } from '@/hooks/useLoading';
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

type FormPayload = {
  roomCode: string;
};

export default function LoginPage() {
  const { database } = useFirebase();
  const { isLoading, state } = useLoading();
  const router = useRouter();
  const toast = useToast();

  const { values, errors, handleChange, handleSubmit } = useForm<FormPayload>({
    onSubmit: handleJoinRoom,
    initialValues: { roomCode: '' },
    validationSchema: Yup.object({
      roomCode: Yup.string().required('Campo obrigatório'),
    }),
  });

  async function handleJoinRoom({ roomCode }: FormPayload) {
    state.start();
    try {
      if (!roomCode.trim()) {
        return;
      }

      const roomRef = await database.collection('rooms').getOne(roomCode);

      if (roomRef.exists()) {
        await router.push(`rooms/${roomRef.key}`);
      } else {
        toast.error('Essa sala ainda não existe');
      }
    } catch (e) {
      console.error(e);

      toast.error('Houve um erro ao buscar a sala');
    } finally {
      state.stop();
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
          <form onSubmit={handleSubmit}>
            <Input
              name="roomCode"
              onChange={handleChange}
              disabled={isLoading}
              type="text"
              placeholder="Digite o código da sala"
              value={values.roomCode}
            />
            {errors.roomCode && (
              <p style={{ color: 'red' }}>{errors.roomCode}</p>
            )}

            <Button
              css={{ marginTop: '10px' }}
              type="submit"
              disabled={isLoading}
            >
              Entrar na sala
            </Button>
          </form>
        </Content>
      </Main>
    </Container>
  );
}
