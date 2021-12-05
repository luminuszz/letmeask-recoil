import { createStitches } from '@stitches/react';

export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    colors: {
      white: '#FFF',
      black: '#29292E',
      shadow: '#050206',
      'purple-500': '#835AFD',
      gradient1: '#485BFF',
      gradient2: '#FF59F8',
      danger: '#E73F5D',
      google: '#ea4335',
      'gray-200': '#DBDCDD',
      'gray-300': '#A8A8B3',
      'gray-500': '#737380',
      'gray-100': '#FEFEFE',
      background: '#F8F8F8',
      'pink-200': '#D67EE2',
      'pink-500': '#E559F9',
      'hover-purple': '#6F4BD8',
      'hover-danger': '#D73754',
      'hover-gray-medium': '#7E7E86',
      'hover-gray-light': '#CECECE',
    },

    fonts: {
      primary: 'Roboto',
      secondary: 'Poppins',
    },
  },

  utils: {
    px: (value: string | number) => ({
      paddingRight: value,
      paddingLeft: value,
    }),
    py: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',

    body: {
      background: '$background',
      color: '$black',
    },

    'body,input,button,textarea': {
      fontWeight: 400,
      fontSize: 16,
      fontFamily: '$primary,sans-serif',
    },
  },
});
