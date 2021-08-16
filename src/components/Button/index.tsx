import { consumeTheme } from '@/style/vars';
import styled from 'styled-components';

const Wrap = styled.button<Props>`
  background-color: #141417;
  color: ${consumeTheme('text2nd')};
  border: none;
  padding: 8px;
  outline: none;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
`



interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick: (...args: any[]) => any
  children: React.ReactNode
}

const Button = ({
  onClick,
  children
}: Props) => {
  return (
    <Wrap
      onClick={onClick}
    >
      { children }
    </Wrap>
  );
};

Button.propTypes = {

}

export default Button;
