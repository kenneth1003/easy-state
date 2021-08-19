import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CodeMirror from 'react-codemirror';

import { stateParentSelector } from '@/slices/stateParents';
import { stateOutputSelector } from '@/slices/stateOutputs';
import { useSelector } from 'react-redux';
import PermListItem from '@/components/PermListItem';
import { ItemTitle } from '@/components/BlockInfo';
import { genPermListFromStateParents, genOptimizeTree, genCode2, genTestCase, hashKey } from '@/core';
import { Button } from '@/components';


const pruneSelectMap = (selectMap: Record<string, string>) => {
  let mostOutput: string = ''
  let mostCount = 0
  const counter: Record<string, number> = {}

  Object.keys(selectMap)
    .forEach((key) => {
      const output = selectMap[key]
      if (counter[output]) {
        counter[output] += 1
      } else {
        counter[output] = 1
      }
      if (counter[output] > mostCount) {
        mostOutput = output
        mostCount = counter[output]
      }
    })

  const returnMap = Object.keys(selectMap).reduce<Record<string, string>>((pre, cur) => {
    const output = selectMap[cur]
    if (mostOutput !== output) {
      pre[cur] = output
    }
    return pre
  }, {})

  return {
    selectMap: returnMap,
    mostOutput
  }
}

const Wrap = styled.div``

interface Props {
  selectMap: Record<string, string>
}

const CodeModal = ({
  selectMap
}: Props) => {
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateOutput = useSelector(stateOutputSelector.selectAll);
  const [isPruneElse, setIsPruneElse] = useState(false);
  const finalSelectMap = isPruneElse
    ? pruneSelectMap(selectMap).selectMap
    : selectMap

  // const testCases = genTestCase(selectMap);
  // const node = genOptimizeTree(allStateParent, finalSelectMap)
  const code = genCode2(allStateParent, selectMap);

  useEffect(() => {
    // import('@/third-party/prism.js')
    const src = document.createElement('script')
    src.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js');
    document.body.append(src)
  }, [])

  return (
    // <Modal 
    //     isOpen
    //     onAfterOpen={() => {}}
    //     onRequestClose={() => {}}
    //     style={{}}
    //     contentLabel="Example Modal"
    //   >
    <div style={{ width: '100%', overflow: 'auto' }}>
      {/* <Button onClick={() => setIsPruneElse(!isPruneElse)}>
        toggle
      </Button> */}
      <pre className="language-javascript">
        <code>
          {code.join('\n')}
        </code>
      </pre>
      {/* <pre className="language-js" style={{ width: '100%' }}>
        <code>
        {testCases.join('\n')}
        </code>
      </pre> */}
    </div>
    // </Modal>
  );
};

CodeModal.propTypes = {

}

export default CodeModal;
