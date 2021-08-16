import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { stateParentSelector } from '@/slices/stateParents';
import { stateOutputSelector } from '@/slices/stateOutputs';
import { useSelector } from 'react-redux';
import PermListItem from '@/components/PermListItem';
import { ItemTitle } from '@/components/BlockInfo';
import { genPermListFromStateParents, hashKey } from '@/core';
import CodeModal from '../CodeModal';

const Wrap = styled.div`
  padding: 16px;
`

const Canvas = () => {
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateOutput = useSelector(stateOutputSelector.selectAll);
  const [selectMap, setSelectMap] = useState<Record<string, string>>({});
  const [allCombs, setAllCombs] = useState<string[][]>([]);

  useEffect(() => {
    const permList = genPermListFromStateParents(allStateParent)
    const map = permList.reduce<Record<string, string>>((pre, cur) => {
      const key = hashKey(cur)
      pre[key] = allStateOutput[0]?.title
      return pre
    }, {})
    setSelectMap(map);
    setAllCombs(permList)
  }, [allStateOutput, allStateParent])

  return (
    <Wrap>
      <CodeModal
        selectMap={selectMap}
      />
      <ItemTitle>
        All Combinations: { allCombs.length }
      </ItemTitle>
      {
        allCombs.map((comb, idx) => (
          <PermListItem
            nth={idx + 1}
            tags={comb}
            selectMap={selectMap}
            selectList={
              allStateOutput.map(({ title }) => title)
            }
            onSelect={(key: string, value: string) => {
              setSelectMap({
                ...selectMap,
                [key]: value
              })
            }}
          />
        ))
      }
    </Wrap>
  );
};

Canvas.propTypes = {

}

export default Canvas;
