import React, { useCallback } from 'react';
import useLight from '../hass/useLight';
import useLongPress from '../utils/useLongPress';
import Card from './Card';
import { ButtonWrapper, State, Title } from './Misc';
import LightSvg from './icons/LightSvg';

interface LightProps {
  entityId: string;
}

const Light = ({ entityId }: LightProps) => {
  const hassElement = useLight(entityId);

  const onLongPress = useCallback(() => {
    console.log('long');
  }, []);
  const onClick = useCallback(() => hassElement?.service?.toggle(), [hassElement?.service]);

  const longPressProps = useLongPress({ onLongPress, onClick });

  if (!hassElement) {
    return null;
  }

  return (
    <Card state={hassElement?.state}>
      <ButtonWrapper {...longPressProps}>
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
