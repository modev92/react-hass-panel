import React from 'react';
import useLight from '../hass/useLight';
import Card from './Card';
import { ButtonWrapper, State, Title } from './Misc';
import LightSvg from './icons/LightSvg';

interface LightProps {
  entityId: string;
}

const Light = ({ entityId }: LightProps) => {
  const hassElement = useLight(entityId);
  if (!hassElement) {
    return null;
  }

  return (
    <Card state={hassElement?.state}>
      <ButtonWrapper onClick={hassElement?.service?.toggle}>
        <LightSvg />
        <div>
          <Title>{hassElement?.friendlyName}</Title>
          <State>{hassElement?.state}</State>
        </div>
      </ButtonWrapper>
    </Card>
  );
};

export default Light;
