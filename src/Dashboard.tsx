import React from 'react';
import styled from 'styled-components';
import Light from './components/Light';

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url(http://localhost:3000/homekit-bg.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
`;

const GridWrapper = styled.div`
  padding: 24px;
`;

const Dashboard = () => {
  return (
    <BackgroundWrapper>
      <GridWrapper>
        <Light entityId="light.seitenlicht" />
        {/* <Light entityId="switch.delock1_smart_plug" /> */}
      </GridWrapper>
    </BackgroundWrapper>
  );
};

export default Dashboard;
