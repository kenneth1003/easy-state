import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { stateParentSelector } from '@/slices/stateParents';
import { stateOutputSelector } from '@/slices/stateOutputs';
import { useSelector } from 'react-redux';
import PermListItem from '@/components/PermListItem';
import { ItemTitle } from '@/components/BlockInfo';
import { genPermListFromStateParents, hashKey } from '@/core';
import CodeModal from '../CodeModal';
import { Button as RawButton } from '@/components';

const Button = styled(RawButton)`
  /* border: 1px solid #666; */
  margin-right: 8px;
`

const Description = styled.p`
  margin-top: 4px;
  line-height: 1.5;
  font-size: 14px;
  a {
    color: #ccc;
    text-decoration: none;
    border-bottom: 1px dotted #aaa;
  }
`

const Wrap = styled.div`
  padding: 16px;
`

const Tabs = styled.div`
  border-bottom: 1px solid #666;;
  margin-bottom: 12px;
`


enum UIMode {
  Code,
  Combination
}

const Canvas = () => {
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateOutput = useSelector(stateOutputSelector.selectAll);

  const [uiMode, setUIMode] = useState<UIMode | undefined>(UIMode.Code);
  const [selectMap, setSelectMap] = useState<Record<string, string>>({});
  const [allCombs, setAllCombs] = useState<string[][]>([]);

  const refreshCode = useCallback(() => {
    setUIMode(undefined)
    setTimeout(() => {
      setUIMode(UIMode.Code)
    })
  }, [])

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
      <Description>
        You can modify the output mapping in the "Edit Output" tab, or copy "JS Code" and modify it yourself.
      </Description>
      <Tabs>
        <Button active={uiMode === UIMode.Code} onClick={() => setUIMode(UIMode.Code)}>JS Code</Button>
        <Button active={uiMode === UIMode.Combination} onClick={() => setUIMode(UIMode.Combination)}>Edit Output</Button>
      </Tabs>
      {
        uiMode === UIMode.Code
          ? <CodeModal
            selectMap={selectMap}
            refreshCode={refreshCode}
          />
          : null
      }
      {
        uiMode === UIMode.Combination
        ? <>
          <ItemTitle style={{ marginLeft: 8 }}>
            Combinations: { allCombs.length }
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
