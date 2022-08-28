import React, { useState } from 'react';
import styled from 'styled-components';
import DateAndTime from './components/DateAndTime';
import LayerSelector from './components/LayerSelector';
import Light from './components/Light';
import Switch from './components/Switch';
import WeatherInfo from './components/WeatherInfo';

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url(http://localhost:3000/homekit-bg.jpeg);
  /* background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(http://localhost:3000/PersonalBackground.jpeg); */

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 32px;
`;

const Header = styled.header`
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
`;

const HeaderInfo = styled.div`
  mix-blend-mode: plus-lighter;
`;

const Title = styled.h1`
  font-family: 'SF UI Display';
  font-size: 52px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
  gap: 24px;
`;

const Dashboard = () => {
  const [currentLayer, setCurrentLayer] = useState(0);

  return (
    <BackgroundWrapper>
      <Header>
        <HeaderInfo>
          <Title>Home Dashboard</Title>
          <DateAndTime />
          <WeatherInfo entityId="weather.home" />
        </HeaderInfo>
        <LayerSelector
          layers={[{ name: 'Main' }, { name: 'Actions' }, { name: 'Rooms' }]}
          currentLayer={currentLayer}
          changeLayer={setCurrentLayer}
        />
      </Header>

      <GridWrapper>
        <Light entityId="light.seitenlicht" />
        <Switch entityId="switch.delock1_smart_plug" />
        <Switch entityId="switch.parce" />
      </GridWrapper>
    </BackgroundWrapper>
  );
};

export default Dashboard;
