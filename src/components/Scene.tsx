import React from 'react';
import useScene from '../hass/useScene';
import Card, { State } from './Card';
import LightSvg from './icons/LightSvg';
import { BasicWrapper, Title } from './Misc';

interface SensorProps {
  entityId: string;
  state?: State;
}

const Scene = ({ entityId, state }: SensorProps) => {
  const hassElement = useScene(entityId);
  if (!hassElement) {
    return null;
  }

  return (
    <Card state={state}>
      <BasicWrapper as="button" vCenter onClick={hassElement?.service?.turnOn}>
        <LightSvg />
        <div>
          <Title>{hassElement?.friendlyName}</Title>
        </div>
      </BasicWrapper>
    </Card>
  );
};

export default Scene;
