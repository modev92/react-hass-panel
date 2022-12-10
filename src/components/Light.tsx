import React, { useCallback, useEffect, useState } from 'react';
import useLight from '../hass/useLight';
import useInteraction from '../utils/useInteraction';
import useDebounce from '../utils/useDebounce';
import Card from './Card';
import { ButtonWrapper, State, Title } from './Misc';
import LightSvg from './icons/LightSvg';

interface LightProps {
  entityId: string;
}

const Light = ({ entityId }: LightProps) => {
  const hassElement = useLight(entityId);
  const [brightness, setBrightness] = useState(hassElement?.brightness || 0);

  useEffect(() => {
    setBrightness(hassElement?.brightness || 0);
  }, [hassElement?.brightness]);

  const debounced = useDebounce((value) => {
    hassElement?.service.setBrightness(value);
  }, 500);

  const onLongPress = useCallback(() => {
    console.log('long');
  }, []);

  const onClick = useCallback(() => hassElement?.service?.toggle(), [hassElement?.service]);
  const setOnSwipe = useCallback(
    (percentage: number) => {
      if (hassElement?.state === 'on') {
        setBrightness(percentage);
        debounced(percentage);
      }
    },
    [debounced, hassElement?.state]
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
          {/* TODO check if brightness is supported */}
          {/* <State>{hassElement?.state}</State> */}
          <State>{hassElement?.state === 'on' ? `${brightness}%` : hassElement?.state} </State>
        </div>
      </ButtonWrapper>
    </Card>
  );
};

export default Light;
