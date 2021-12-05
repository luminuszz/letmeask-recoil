import { styled } from '@/styles/index';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  height: '100vh',
});

export const Aside = styled('aside', {
  flex: 7,
  background: '$purple-500',
  color: '$white',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  px: '80px',
  py: '120px',
});

export const Main = styled('main', {
  flex: 8,
  px: 32,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Img = styled('img', {
  maxWidth: '320px',
});

export const StrongText = styled('strong', {
  fontWeight: '700',
  fontSize: '36px',
  fontFamily: '$secondary',
  lineHeight: '42px',
  marginTop: '16px',
});

export const Text = styled('p', {
  fontSize: '24px',
  lineHeight: '32px',
  marginTop: '16px',
  color: '$background',
});

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '320px',
  alignItems: 'stretch',
  textAlign: 'center',
});

export const LogoImage = styled('img', {
  alignSelf: 'center',
});

export const Divider = styled('div', {
  fontSize: '14px',
  color: '$gray-300',

  margin: '32px 0',
  display: 'flex',
  alignItems: 'center',

  '&::before': {
    content: '',
    flex: 1,
    height: '1px',
    background: '$gray-300',
    marginRight: '16px',
  },

  '&::after': {
    marginLeft: '16px',
    content: '',
    flex: 1,
    height: '1px',
    background: '$gray-300',
  },
});

export const Input = styled('input', {
  height: 50,
  borderRadius: '8px',
  px: '16px',
  background: '$white',
  border: '1px solid $gray-300',
  width: '100%',
});

export const Button = styled('button', {
  marginTop: '16px',
  width: '100%',
});

export const Paragraph = styled('p', {
  fontSize: '14px',
  color: '$gray-500',
  marginTop: '16px',

  '> a': {
    color: '$pink-500',
  },

  variants: {
    status: {
      error: {
        color: '$danger',
      },
      default: {},
    },
  },

  defaultVariants: {
    status: 'default',
  },
});

export const Title = styled('h2', {
  fontSize: '24px',
  margin: '24px 0 24px',
  fontFamily: '$secondary',
});
