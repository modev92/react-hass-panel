import React from 'react';
import { useHass } from './HassContext';

type LightAttributesInternal = {
  friendly_name: string;
  brightness: number;
};

const useLight = (entityId: string) => {
  const { states, callService } = useHass<LightAttributesInternal>();

  const service = React.useMemo(() => {
    return {
      toggle: () =>
        callService('light', 'toggle', {
          entity_id: entityId,
        }),
      setBrightness: (brightnessPercentage: number) =>
        callService('light', 'turn_on', {
          entity_id: entityId,
          brightness: Math.round((brightnessPercentage * 255) / 100),
        }),
      turnOn: () =>
        callService('light', 'turn_on', {
          entity_id: entityId,
        }),
      turnOff: () =>
        callService('light', 'turn_off', {
          entity_id: entityId,
        }),
    };
  }, [callService, entityId]);

  if (!states[entityId]) {
    console.error(`${entityId} does not exist`);
    return null;
  }

  return {
    state: states[entityId].state,
    friendlyName: states[entityId].attributes.friendly_name,
    brightness: Math.round(((states[entityId].attributes.brightness || 0) / 255) * 100),
    lastChanged: states[entityId].last_changed,
    service,
  };
};

export default useLight;
