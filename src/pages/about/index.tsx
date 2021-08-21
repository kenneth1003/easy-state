import styled from 'styled-components';
import { Link } from 'react-router-dom';

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


const About = () => {
  return (
    <MainWrap>
      <DescBlock>
        <Description>
          <Link to="/">Back to app</Link>
          <br />
          <br />
          Author <a href="https://kenneth.pro" target="_blank" rel="noreferrer">Kenneth</a>
        </Description>
        <span>TODOs:</span>
        <StepList>
          <li>Customizing local state Persistent</li>
          <li>Set state and output number limit</li>
          <li>Optimize long list rendering performance</li>
        </StepList>
      </DescBlock>
    </MainWrap>
  )
}

export default About;