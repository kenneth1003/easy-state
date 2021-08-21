
import styled from 'styled-components';
import { consumeTheme } from '@/style/vars';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  hideCursor?: boolean;
}

const Wrap = styled.input<Props>`
  width: 100%;
  /* background-color:rgba(0,0,0,0); */
  background-color:#141417;
  border: none;
  color: #fff;
  padding: 8px;
  border-radius: 3px;
  ${({ hideCursor }) => hideCursor ? 'caret-color: transparent;' : ''}
  &::placeholder {
    color: ${consumeTheme('text3rd')};
  }
  border:1px solid #141417;
  box-sizing: border-box;
  &:focus {
    outline: none;
    /* border:1px solid ${consumeTheme('main')}; */
    border:1px solid #ccc;
  }
`

const TextInput = ({
  ...inputProps
}: Props) => {
  return (
    <Wrap
      { ...inputProps }
    />
  );
};


export default TextInput;
