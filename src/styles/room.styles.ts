import { styled } from '@/styles';

export const Container = styled('div', {});

export const Header = styled('header', {
  padding: '24px',
  borderBottom: '1px solid #e2e2e2',
});

export const HeaderContent = styled('div', {
  maxWidth: '1120px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
});

export const RoomImgLogo = styled('img', {
  maxHeight: '45px',
});

export const Main = styled('main', {
  maxWidth: '800px',
  margin: '0 auto',
  '.room-title': {
    margin: '32px 0 24px',
    display: 'flex',
    alignItems: 'center',

    h1: {},
  },
});

export const RoomTitle = styled('h1', {
  fontFamily: '$secondary',
  fontSize: '24px',
  color: '$black',
});

export const CopyCode = styled('div', {});

export const TextArea = styled('textarea', {
  width: '100%',
  border: 0,
  padding: '16px',
  borderRadius: '8px',
  background: '$gray.100',
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  resize: 'vertical',
  minHeight: '130px',
});

export const FormFooter = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '16px',

  span: {
    fontSize: '14px',
    color: '$gray-500',
    fontWeight: 500,

    button: {
      background: 'transparent',
      border: 0,
      color: '$purple-500',
      textDecoration: 'underline',
      fontSize: '14px',
      cursor: 'pointer',
    },
  },
});

export const UserInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
  },

  span: {
    fontSize: '14px',
    color: '$black',
    marginLeft: '8px',
    fontWeight: 500,
  },
});
