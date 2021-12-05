import Link from 'next/link';
import { useRouter } from 'next/router';

import * as Yup from 'yup';

import { Button } from '@/components/Button';
import { withSSRAuth } from '@/helpers/withSSRAuth';
import { useAuth } from '@/hooks/useAuth';
import { useFirebase } from '@/hooks/useFirabase';
import { useForm } from '@/hooks/useForm';
import {
  Aside,
  Container,
  Content,
  Img,
  Input,
  LogoImage,
  Main,
  Paragraph,
  StrongText,
  Text,
  Title,
} from '@/styles/auth.styles';

type FormPayload = {
  roomName: string;
};

const validationSchema = Yup.object().shape({
  roomName: Yup.string().required('O nome da sala é obrigatório!'),
});

export default function NewRoomPage() {
  const router = useRouter();
  const { database } = useFirebase();
  const { user } = useAuth();

  const { errors, handleChange, handleSubmit, values } = useForm<FormPayload>({
    validationSchema,
    onSubmit,
    initialValues: {
      roomName: '',
    },
  });

  async function onSubmit(values: FormPayload) {
    const room = await database.collection('rooms').save({
      roomName: values.roomName,
      authorId: user?.id,
    });

    await router.push({
      pathname: '/rooms/[id]',
      query: { id: room.key },
    });
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
          <Title css={{ marginTop: '10px', marginBottom: '10px' }}>
            Criar uma nova sala
          </Title>
          <form onSubmit={handleSubmit}>
            <Input
              name="roomName"
              type="text"
              placeholder="Nome da sala"
              onChange={handleChange}
              value={values.roomName}
            />
            {errors.roomName && (
              <Paragraph status={errors.roomName ? 'error' : 'default'}>
                {errors.roomName}
              </Paragraph>
            )}

            <Button css={{ marginTop: '10px' }} type="submit">
              Criar sala
            </Button>
          </form>
          <Paragraph>
            Quer entrar em uma sala existente ?{' '}
            <Link href="/">
              <a href="#">Clique aqui</a>
            </Link>
          </Paragraph>
        </Content>
      </Main>
    </Container>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
