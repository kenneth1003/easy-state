// import React from 'react';
import styled, { css } from 'styled-components';
import { consumeTheme } from '@/style/vars';

interface Props {
  isTextOnly?: boolean
}

const base = css`
  /* font-family: monospace; */
  display: inline-block;
  font-weight: bold;
  padding: 2px 4px;
  letter-spacing: 1px;
  font-size: 13px;
  border-radius: 3px;
  transition: all .5s;
`;

// const normal = css`
//   color: ${colors.textMain};
//   border: 1px solid ${colors.textMain};
// `

const solidMixin = css`
  background-color: ${consumeTheme('tagBg')};
  color: ${consumeTheme('tagText')};

  input {
    display: block;
    width: 320px;
    font-weight: bold;
    padding: 2px 4px;
    letter-spacing: 1px;
    font-size: 13px;
    border-radius: 3px;
    box-sizing: border-box;
    border: none;
    background-color: ${consumeTheme('tagBg')};
    color: ${consumeTheme('tagText')};
    &:focus {
      outline: none;
    }
  }
`;

const textOnlyMixin = css`
  /* background-color: ${consumeTheme('paperBg')}; */
  background-color: rgba(255,255,255, .1);
  color: ${consumeTheme('textMain')};
`;

const Tag = styled.span<Props>`
  ${base}
  ${
    ({ isTextOnly }) => isTextOnly
      ? textOnlyMixin
      : solidMixin
  }
`;

export default Tag;