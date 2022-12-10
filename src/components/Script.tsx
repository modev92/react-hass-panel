import React from 'react';
import useScript from '../hass/useScript';
import Card from './Card';
import { BasicWrapper, Title } from './Misc';

interface Props {
  entityId: string;
  script: string;
}

const Script = ({ entityId, script }: Props) => {
  const hassElement = useScript(entityId);
  if (!hassElement) {
    return null;
  }

  return (
    <Card singleState>
      <BasicWrapper as="button" vCenter onClick={() => hassElement?.service?.custom(script)}>
        <ha-state-icon icon={hassElement.icon} state={hassElement?.state}></ha-state-icon>
        <div>
          <Title>{hassElement?.friendlyName}</Title>
        </div>
      </BasicWrapper>
    </Card>
  );
};

export default Script;
