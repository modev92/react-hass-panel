import React, { useState } from 'react';
import styled from 'styled-components';
import DateAndTime from './components/DateAndTime';
import LayerSelector from './components/LayerSelector';
import Light from './components/Light';
import MediaPlayer from './components/MediaPlayer';
import Scene from './components/Scene';
import Sensor from './components/Sensor';
import Switch from './components/Switch';
import WeatherInfo from './components/WeatherInfo';
import hassMedia from './utils/hassMedia';

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background: url(${hassMedia('homekit-bg.jpeg')}); */
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(${hassMedia('PersonalBackground.jpeg')});

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 32px;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
`;

const HeaderInfo = styled.div``;

const Title = styled.h1`
  font-family: 'SF UI Display';
  font-size: 52px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
  gap: 24px;
`;

const GridWrapperSmall = styled(GridWrapper)`
  grid-template-columns: repeat(auto-fit, 152px);
`;

const Space = styled.div`
  margin-top: 24px;
`;

const BottomElements = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;
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
        <Scene entityId="scene.test" state="on" />
      </GridWrapper>
      <Space />
      <GridWrapperSmall>
        <Sensor entityId="sensor.gaszaehler_24a" variant="small" />
        <Sensor entityId="sensor.gaszaehler_24a" variant="large" />
        {/* TODO:
            1. LED Color
            2. Sensor (Temperatur, Luftfeuchtigkeit, ...)
            3. Camera
        */}
      </GridWrapperSmall>
      <BottomElements>
        <MediaPlayer entityId="media_player.kuche" />
      </BottomElements>
    </BackgroundWrapper>
  );
};

export default Dashboard;
