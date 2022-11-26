import React, { useCallback, useState } from 'react';
import useLight from '../hass/useLight';
import useInteraction from '../utils/useInteraction';
import Card from './Card';
import { ButtonWrapper, State, Title } from './Misc';
import LightSvg from './icons/LightSvg';

interface LightProps {
  entityId: string;
}

const Light = ({ entityId }: LightProps) => {
  const hassElement = useLight(entityId);
  const [brightness, setBrightness] = useState(60);

  const onLongPress = useCallback(() => {
    console.log('long');
  }, []);

  const onClick = useCallback(() => hassElement?.service?.toggle(), [hassElement?.service]);
  const setOnSwipe = useCallback(
    (percentage: number) => {
      if (hassElement?.state === 'on') {
        setBrightness(percentage);
      }
    },
    [hassElement?.state]
  );
  const interactionProps = useInteraction({ onSwipe: setOnSwipe, onLongPress, onClick }, { initialSwipePercentage: brightness });

  if (!hassElement) {
    return null;
  }

  return (
    <Card state={hassElement?.state}>
      <ButtonWrapper {...interactionProps}>
        <LightSvg />
        <div>
          <Title>{hassElement?.friendlyName}</Title>
          {/* <State>{hassElement?.state}</State> */}
          <State>{hassElement?.state === 'on' ? `${brightness}%` : hassElement?.state} </State>
        </div>
      </ButtonWrapper>
    </Card>
  );
};

export default Light;
