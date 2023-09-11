import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Canvas from '@/containers/Canvas';
import OutputPanel from '@/containers/OutputPanel';
import SideNav from '@/containers/SideNav';
import { stateParentSelector } from '@/slices/stateParents';
import {
  stateOutputSelector
} from '@/slices/stateOutputs';
import { Link } from 'react-router-dom';

const SEOH1 = styled.h1`
  font-size: 20px;
`

const SEOH2 = styled.h2`
  display: inline;
  font-weight: normal;
  font-size: 14px;
`;

const DescBlock = styled.div`
  padding: 0 8px;
  font-size: 14px;
`

const Description = styled.p`
  line-height: 1.5;
  a {
    color: #ccc;
    text-decoration: none;
    border-bottom: 1px dotted #aaa;
  }
`

const StepList = styled.ol`
  margin: 8px 0;
  padding-left: 18px;
  li {
    line-height: 1.5;
  }
`

// const 

const MainWrap = styled.div`
  /* position: relative; */
  min-height: 600px;
  max-width: 1120px;
  margin: 0 auto;
`

const Wrap = styled.div`
  /* position: relative; */
  display: flex;
`

const MainContent = styled.div`
  flex: 1;
`

const Side = styled.div`
  /* flex: 1 0 360px; */
  position: sticky;
  top: 0;
  flex-shrink: 0;
  flex-basis: 320px;
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 60px); */
`

const SideContent = styled.div`
  background-color: rgb(30, 31, 38);
  border-radius: 2px;
  margin: 16px 0 ;
`

const SideSubContent = styled.div`
  flex-shrink: 0;
  flex-basis: 120px;
  background-color: rgb(30, 31, 38);
  border-radius: 2px;
`


const Home = () => {
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateOutput = useSelector(stateOutputSelector.selectAll);

  const isHasStateParentValue = allStateParent.some((stateParent) => stateParent.states.length)
  const isHasStateOutput = allStateOutput.length;

  return (
    <MainWrap>
      <DescBlock>
        <Description>
          <Link to="/about">About Page</Link>
          <SEOH1>A tool to create state mapping JS code</SEOH1>
          The generated code is based on the concept of <SEOH2><a href="https://refactoring.guru/design-patterns/state" target="_blank" rel="noreferrer">state pattern</a></SEOH2> and <SEOH2><a href="https://stackoverflow.com/questions/105311/what-are-table-driven-methods" target="_blank" rel="noreferrer">table driven methods</a></SEOH2>. Steps:
        </Description>
        {/* <span>Steps:</span> */}
        <StepList>
          <li>Input possible <strong>States</strong> and <strong>Outputs</strong> of your application</li>
          <li>Update the output of given the state combinations under the <strong>Select Output</strong> Tab</li>
          <li>Code will be generated under the <strong>JS Code</strong> Tab</li>
          <li>Copy it as a base and modify details to fit your application</li>
        </StepList>
      </DescBlock>
      <Wrap>
        <Side>
          <SideContent>
            <SideNav />
          </SideContent>
          <SideSubContent>
            <OutputPanel />
          </SideSubContent>
        </Side>
        <MainContent>
          {
            (isHasStateOutput && isHasStateParentValue) ? <Canvas /> : null
          }
        </MainContent>
      </Wrap>
    </MainWrap>
  )
}

export default Home;