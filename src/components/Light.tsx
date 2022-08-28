import React from 'react';
import styled from 'styled-components';
import useLight from '../hass/useLight';
import Card from './Card';
import { State, Title } from './Misc';
import LightSvg from './icons/LightSvg';

const LightWrapper = styled.button`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Infos = styled.div``;

interface LightProps {
  entityId: string;
}

const Light = ({ entityId }: LightProps) => {
  const light = useLight(entityId);
  if (!light) {
    return null;
  }

  return (
    <Card state={light?.state}>
      <LightWrapper onClick={light?.service?.toggle}>
        <LightSvg />
        <Infos>
          <Title>{light?.friendlyName}</Title>
          <State>{light?.state}</State>
        </Infos>
      </LightWrapper>
    </Card>
  );
};

export default Light;
