import React from 'react';
import styled from 'styled-components';
import Light from './components/Light';
import Switch from './components/Switch';

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url(http://localhost:3000/homekit-bg.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
  gap: 24px;
  padding: 32px;
`;

const Dashboard = () => {
  return (
    <BackgroundWrapper>
      <GridWrapper>
        <Light entityId="light.seitenlicht" />
        <Switch entityId="switch.delock1_smart_plug" />
      </GridWrapper>
    </BackgroundWrapper>
  );
};

export default Dashboard;
