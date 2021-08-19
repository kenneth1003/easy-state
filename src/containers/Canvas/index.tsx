import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { stateParentSelector } from '@/slices/stateParents';
import { stateOutputSelector } from '@/slices/stateOutputs';
import { useSelector } from 'react-redux';
import PermListItem from '@/components/PermListItem';
import { ItemTitle } from '@/components/BlockInfo';
import { genPermListFromStateParents, hashKey } from '@/core';
import CodeModal from '../CodeModal';
import { Button } from '@/components';

const Wrap = styled.div`
  padding: 16px;
`

enum UIMode {
  Code,
  Combination
}

const Canvas = () => {
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateOutput = useSelector(stateOutputSelector.selectAll);

  const [uiMode, setUIMode] = useState<UIMode | undefined>(undefined);
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
      <Button active={uiMode === UIMode.Code} onClick={() => setUIMode(UIMode.Code)}>Generated Code</Button>
      <Button active={uiMode === UIMode.Combination} onClick={() => setUIMode(UIMode.Combination)}>Edit Combination</Button>

      {
        uiMode === UIMode.Code
          ? <CodeModal
            selectMap={selectMap}
          />
          : null
      }
      {
        uiMode === UIMode.Combination
        ? <>
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
        </>
        : null
      }
      
    </Wrap>
  );
};

Canvas.propTypes = {

}

export default Canvas;
