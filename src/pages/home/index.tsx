import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Canvas from '@/containers/Canvas';
import OutputPanel from '@/containers/OutputPanel';
import SideNav from '@/containers/SideNav';
import CodeModal from '@/containers/CodeModal';
import { stateParentSelector } from '@/slices/stateParents';
import {
  stateOutputSelector
} from '@/slices/stateOutputs';

const Wrap = styled.div`
  /* position: relative; */
  display: flex;
  min-height: 600px;
  max-width: 1080px;
  margin: 0 auto;
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
  height: calc(100vh - 46px);
`

const SideContent = styled.div`
  flex: 1;
  background-color: rgb(30, 31, 38);
  border-radius: 2px;
  margin: 16px 0 ;
`

const SideSubContent = styled.div`
  flex-shrink: 0;
  flex-basis: 100px;
  background-color: rgb(30, 31, 38);
  border-radius: 2px;
`


const Home = () => {
  const allStateParent = useSelector(stateParentSelector.selectAll);
  const allStateOutput = useSelector(stateOutputSelector.selectAll);

  const isHasStateParentValue = allStateParent.some((stateParent) => stateParent.states.length)
  const isHasStateOutput = allStateOutput.length;

  return (
    <Wrap>
      <Side>
        <SideContent>
          <SideNav />
        </SideContent>
        {
          isHasStateParentValue && <SideSubContent>
            <OutputPanel />
          </SideSubContent>
        }

      </Side>
      <MainContent>
        {
          (isHasStateOutput && isHasStateParentValue) ? <Canvas /> : null
        }
      </MainContent>
    </Wrap>
  )
}

export default Home;