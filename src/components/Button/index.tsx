import { consumeTheme } from '@/style/vars';
import styled from 'styled-components';

const Wrap = styled.button<Props>`
  background-color: #141417;
  color: ${consumeTheme('text2nd')};
  border: none;
  padding: 8px;
  outline: none;
  border-radius: 2px;
  color: ${({ active, theme }) => active ? theme.main : ''} !important;
  font-weight: ${({ active, theme }) => active ? 'bold' : ''};
  &:hover {
    cursor: pointer;
    /* color: ${consumeTheme('main')}; */
    color: #fff;
  }
`



interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick: (...args: any[]) => any
  children: React.ReactNode
  active?: boolean
}

const Button = ({
  onClick,
  children,
  active,
  className
}: Props) => {
  return (
    <Wrap
      onClick={onClick}
      active={active}
      className={className}
    >
      { children }
    </Wrap>
  );
};

Button.propTypes = {

}

export default Button;
