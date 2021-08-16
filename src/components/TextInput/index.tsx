
import styled from 'styled-components';
import { consumeTheme } from '@/style/vars';

interface Props extends React.ComponentPropsWithoutRef<'input'> {}

const Wrap = styled.input<Props>`
  width: 100%;
  background-color:#141417;
  border: none;
  color: #fff;
  padding: 8px;
  border-radius: 2px;
  &::placeholder {
    color: ${consumeTheme('text3rd')};
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
