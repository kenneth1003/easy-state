
import styled from 'styled-components';
import { sizes, consumeTheme } from '@/style/vars';

interface Props extends React.ComponentPropsWithoutRef<'select'> {
  options?: string[]
}

const Wrap = styled.select<Props>`
  cursor: pointer;
  margin-right: 8px;
  background: #111;
  color: #fff;
  padding: 4px;
  border-radius: 2px;
`

const Select = ({
  options,
  ...inputProps
}: Props) => {
  return (
    <Wrap
      { ...inputProps }
    >
      {
        options?.map((option) => {
          return <option>
            { option }
          </option>
        })
      }
    </Wrap>
  );
};


export default Select;
