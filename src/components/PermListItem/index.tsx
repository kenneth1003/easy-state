import { hashKey } from '@/core';
import { consumeTheme } from '@/style/vars';
import { useMemo } from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const Wrap = styled.div`
  padding: 8px;
  border-bottom: 1px solid #555;
  margin-bottom: 8px;
`

const RadioWrap = styled.div<{ active: boolean }>`
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  color: ${({ active, theme }) => active ? theme.main : '' };
  font-weight: ${({ active, theme }) => active ? 'bold' : '' };
  cursor: pointer;
  &:hover {
    color: ${consumeTheme('main')};
    font-weight: bold;
  }
`

const Upper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 8px;
`

const NumberLabel = styled.div`
  margin-right: 10px;
  font-size: 14px;
  position: relative;
  bottom: 4px;
`

interface Props {
  nth: number
  tags: string[]
  selectList: string[]
  selectMap: Record<string, string>
  onSelect: (...args: any[]) => any
}

const PermListItem = ({
  nth,
  tags,
  selectList,
  selectMap,
  onSelect,
}: Props) => {
  const key = useMemo(() => {
    return hashKey(tags);
  }, [tags])
  
  return (
    <Wrap>
      <Upper>
      <NumberLabel>{nth}. </NumberLabel>
        {
          tags.map((tag) => 
            <Tag
              style={{ marginRight: 8, marginBottom: 8 }}
              isTextOnly
            >
              { tag }
            </Tag>
          )  
        }
      </Upper>
      {
        selectList.map((option) => (
          <RadioWrap
            active={selectMap[key] === option}
            onClick={() => onSelect(key, option)}
          >
            { option }
          </RadioWrap>
          ))
      }
      {/* <Select
        style={{ marginRight: 8 }}
        options={selectList}
      /> */}
    </Wrap>
  );
};

export default PermListItem;
