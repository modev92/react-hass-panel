import React from 'react';
import useSwitch from '../hass/useSwitch';
import Card from './Card';
import { ButtonWrapper, State, Title } from './Misc';
import OutletSvg from './icons/OutletSvg';

interface Props {
  entityId: string;
}

const Switch = ({ entityId }: Props) => {
  const hassElement = useSwitch(entityId);
  if (!hassElement) {
    return null;
  }

  return (
    <Card state={hassElement?.state}>
      <ButtonWrapper onClick={hassElement?.service?.toggle}>
        <OutletSvg />
        <div>
          <Title>{hassElement?.friendlyName}</Title>
          <State>{hassElement?.state}</State>
        </div>
      </ButtonWrapper>
    </Card>
  );
};

export default Switch;
