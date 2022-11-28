import React from 'react';
import useSensor from '../hass/useSensor';
import Card from './Card';
import LightSvg from './icons/LightSvg';
import { BasicWrapper, ButtonWrapper, CircleState, State, Title } from './Misc';

interface SensorProps {
  entityId: string;
  variant: 'small' | 'large';
}

const Sensor = ({ entityId, variant }: SensorProps) => {
  const hassElement = useSensor(entityId);
  if (!hassElement) {
    return null;
  }

  if (variant === 'small') {
    return (
      <Card state="on">
        <BasicWrapper>
          <LightSvg />
          <div>
            <Title>{hassElement?.friendlyName}</Title>
            <State>
              {hassElement?.state} {hassElement?.attributes.unitOfMeasurement}
            </State>
          </div>
        </BasicWrapper>
      </Card>
    );
  }

  return (
    <Card state="on">
      <ButtonWrapper as="div">
        <CircleState>20°</CircleState>
        <div>
          <Title>Temperatur</Title>
        </div>
      </ButtonWrapper>
    </Card>
  );
};

export default Sensor;
