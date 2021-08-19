
import styled from 'styled-components';
import { sizes, consumeTheme } from '@/style/vars';

export const BlockContainer = styled.div<{ active?: boolean }>`
  background-color: ${consumeTheme('paperBg')};
  position: relative;
  z-index: ${({ active }) => active ? 3 : 0};
  transition: opacity .3s;
  margin: 15px;
  @media screen and (max-width: ${sizes.screen.s}px) {
    margin: 0;
  }
`;

export const ItemWrap = styled.div`
  margin-bottom: 24px;
`;

export const ItemTitle = styled.div`
  color: ${consumeTheme('textMain')};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  & {
    text-decoration: none;
  }
  display: flex;
  @media screen and (max-width: ${sizes.screen.s}px) {
    flex-direction: column-reverse;
    align-items: center;
  }
  input {
    font-size: 18px;
    font-weight: bold;
    background-color: rgba(0,0,0,0);
    border: none;
    color: #fff;
    &:focus {
      outline: none;
    }
  }
`;
export const ItemTitleDecorate = styled.a.attrs({
  target: '_blank'
})`
  color: ${consumeTheme('textMain')};
  font-weight: normal;
  font-size: 16px;
  margin-left: 4px;
  align-self: flex-end;
  display: inline-block;
  @media screen and (max-width: ${sizes.screen.s}px) {
    align-self: center;
    margin-bottom: 4px;
  }
`;

export const ItemSubtitle = styled.div`
color: ${consumeTheme('text2nd')};
  margin: 2px 0 4px 2px;
  /* font-size: 15px; */
`;

export const ItemTitleLeft = styled.div`
  color: ${consumeTheme('textMain')};
  font-weight: bold;
`;

export const DecorationText = styled.span`
  font-size: 13px;
  color: ${consumeTheme('text2nd')};
  margin: 0 8px;
`;

export const DetailList = styled.ul`
  list-style: disc;
  margin-left: 20px;
`;

export const DetailLi = styled.li`
  color: ${consumeTheme('textMain')};
  line-height: 1.3;
  /* font-size: 15px; */
`;
