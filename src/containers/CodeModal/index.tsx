import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { stateParentSelector } from '@/slices/stateParents';
import { stateOutputSelector } from '@/slices/stateOutputs';
import { useSelector } from 'react-redux';
import { genCode2 } from '@/core';
import { Button as RawButton } from '@/components';

const CopyButton = styled(RawButton)`
  margin-right: 8px;
  background-color: rgb(30,31,38);
`

const RefreshButton = styled(RawButton)`
  margin-right: 8px;
  background-color: rgb(30,31,38);
`

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    alert('Code Copied')
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    alert('Code Copied')
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

// const pruneSelectMap = (selectMap: Record<string, string>) => {
//   let mostOutput: string = ''
//   let mostCount = 0
//   const counter: Record<string, number> = {}

//   Object.keys(selectMap)
//     .forEach((key) => {
//       const output = selectMap[key]
//       if (counter[output]) {
//         counter[output] += 1
//       } else {
//         counter[output] = 1
//       }
//       if (counter[output] > mostCount) {
//         mostOutput = output
//         mostCount = counter[output]
//       }
//     })

//   const returnMap = Object.keys(selectMap).reduce<Record<string, string>>((pre, cur) => {
//     const output = selectMap[cur]
//     if (mostOutput !== output) {
//       pre[cur] = output
//     }
//     return pre
//   }, {})

//   return {
//     selectMap: returnMap,
//     mostOutput
//   }
// }

interface Props {
  selectMap: Record<string, string>;
  refreshCode: (...args: any[]) => any;
}

const CodeModal = ({
  selectMap,
  refreshCode,
}: Props) => {
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateOutput = useSelector(stateOutputSelector.selectAll);
  const prevState = useRef('')
  const [isStale, setIsStale] = useState(false);
  const [isHighlightReady, setIsHighlightReady] = useState(false);
  // const [isPruneElse, setIsPruneElse] = useState(false);
  const codeBlockRef = useRef<HTMLPreElement | null>(null);
  // const finalSelectMap = isPruneElse
  //   ? pruneSelectMap(selectMap).selectMap
  //   : selectMap

  // const testCases = genTestCase(selectMap);
  // const node = genOptimizeTree(allStateParent, finalSelectMap)
  const code = genCode2(allStateParent, selectMap).join('\n');

  useEffect(() => {
    console.log('prese');
    const src = document.createElement('script');
    if (typeof (window as any).Prism === 'undefined') {
      (window as any).Prism = {};
      (window as any).Prism.manual = true;
      src.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js');
      document.body.append(src)
      src.onload = () => {
        (window as any).Prism.highlightElement(codeBlockRef.current, false, () => {
          setIsHighlightReady(true)
        })
      }
    } else {
      (window as any).Prism.highlightElement(codeBlockRef.current, false, () => {
        setIsHighlightReady(true)
      })
    }
  }, [])

  useEffect(() => {
    const strStateParent = JSON.stringify(allStateParent)
    const strStateOutput = JSON.stringify(allStateOutput)

    const currentState = `${strStateParent}##${strStateOutput}`

    if (currentState !== prevState.current && isHighlightReady) {
      setIsStale(true)
    }
    prevState.current = currentState

  }, [allStateParent, allStateOutput, isHighlightReady])

  return (
    <>
    <ToolBar>
      {
        isStale &&
        <RefreshButton onClick={() => {
          refreshCode()
          setIsStale(false)
        }}>
          Refresh JS
        </RefreshButton>
      }
      <CopyButton onClick={() => copyTextToClipboard(code)}>
        Copy
      </CopyButton>
      {/* <Warning>Please double check if the behavior is expected.</Warning> */}
    </ToolBar>
    <div style={{ width: '100%', overflow: 'auto', position: 'relative' }}>
      <pre
        ref={codeBlockRef}
        className="language-javascript"
        style={
          isHighlightReady
          ? {}
          : { color: 'rgba(0,0,0,0)' }
        }
      >
        <code>
          {code}
        </code>
      </pre>
      
      {/* <pre className="language-js" style={{ width: '100%' }}>
        <code>
        {testCases.join('\n')}
        </code>
      </pre> */}
    </div>
    </>
  );
};

CodeModal.propTypes = {

}

export default CodeModal;
