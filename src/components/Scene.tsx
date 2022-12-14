import React from 'react';
import useScene from '../hass/useScene';
import Card from './Card';
import { BasicWrapper, Title } from './Misc';

interface Props {
  entityId: string;
}

const Scene = ({ entityId }: Props) => {
  const hassElement = useScene(entityId);
  if (!hassElement) {
    return null;
  }

  return (
    <Card singleState>
      <BasicWrapper as="button" vCenter onClick={hassElement?.service?.turnOn}>
        <ha-state-icon icon={hassElement.icon || 'mdi:alpha-s-circle'}></ha-state-icon>
        <div>
          <Title>{hassElement?.friendlyName}</Title>
        </div>
      </BasicWrapper>
    </Card>
  );
};

export default Scene;
