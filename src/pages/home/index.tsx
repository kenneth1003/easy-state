import styled from 'styled-components';
import Canvas from '@/containers/Canvas';
import OutputPanel from '@/containers/OutputPanel';
import SideNav from '@/containers/SideNav';
import CodeModal from '@/containers/CodeModal';

const Wrap = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  min-height: 600px;
`

const MainContent = styled.div`
  flex: 1;
`

const Side = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
`

const SideContent = styled.div`
  flex: 1;
  background-color: rgb(30, 31, 38);
  border-radius: 2px;
  margin: 16px 0 ;
`


const Home = () => {
  return (
    <Wrap>
      <Side>
        <SideContent>
          <SideNav />
        </SideContent>
        <SideContent>
          <OutputPanel />
        </SideContent>
      </Side>
      <MainContent>
        <Canvas />
      </MainContent>
    </Wrap>
  )
}

export default Home;