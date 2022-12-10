import React from 'react';
import useButton from '../hass/useButton';
import Card from './Card';
import { BasicWrapper, Title } from './Misc';

interface Props {
  entityId: string;
}

const Button = ({ entityId }: Props) => {
  const hassElement = useButton(entityId);
  if (!hassElement) {
    return null;
  }

  return (
    <Card singleState>
      <BasicWrapper as="button" vCenter onClick={hassElement?.service?.press}>
        <ha-state-icon icon={hassElement.icon} state={hassElement?.state}></ha-state-icon>
        <div>
          <Title>{hassElement?.friendlyName}</Title>
        </div>
      </BasicWrapper>
    </Card>
  );
};

export default Button;
