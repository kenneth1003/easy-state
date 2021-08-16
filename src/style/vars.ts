// import {ThemedStyledInterface} from 'styled-components';

export const grayScale = [
  '#000',
  '#111',
  '#222',
  '#333',
  '#444',
  '#555',
  '#666',
  '#777',
  '#888',
  '#999',
  '#aaa',
  '#bbb',
  '#ccc',
  '#ddd',
  '#eee',
  '#fff',
];

export const lightTheme = {
  grayScale,

  body: '#f8f9fa',

  textMain: grayScale[3],
  text2nd: grayScale[6],
  text3rd: grayScale[8],

  separator: grayScale[11],

  paperBg: grayScale[15],
  paperShadow: '0 1px 2px 0 rgba(0,0,0,.2)',

  codeBlock: '#f5f5f5',

  headerBg: grayScale[2],
  headerText: grayScale[14],

  skillSelected: grayScale[14],
  skillDotInactive: grayScale[13],

  tagBg: grayScale[3],
  tagText: grayScale[14],

  main: 'rgb(0, 139, 139)',
};

export const darkTheme = {
  grayScale,

  body: '#141417',

  textMain: grayScale[12],
  text2nd: grayScale[9],
  text3rd: grayScale[7],

  separator: grayScale[4],

  // paperBg: '#292e2e',
  paperBg: '#1e1f26',
  paperShadow: '0 1px 2px 0 rgba(0,0,0,.2)',

  codeBlock: '#333',

  skillSelected: grayScale[4],
  skillDotInactive: grayScale[5],
  tagBg:'rgb(80, 200, 200)',
  tagText: grayScale[2],
  
  headerBg: '#141417',
  headerText: grayScale[14],
  main: 'rgb(80, 200, 200)',
};

type LightThemeType = typeof lightTheme
export type DarkThemeType = typeof darkTheme

export const consumeTheme = (path: keyof LightTheme) =>
  ({ theme }: { theme: LightThemeType }) => theme[path];

export type LightTheme = typeof lightTheme;

export const colors = {
  textMain: '#333',
  text2nd: '#666',
  text3rd: '#888',
  // main: 'lightseagreen'
  main: 'darkcyan',

  // main: '#000',
};

export const sizes = {
  screen: {
    s: 600
  }
};
