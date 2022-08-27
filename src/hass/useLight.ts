import React from 'react';
import { useHass } from './HassContext';

const useLight = (entityId: string) => {
  const { states, callService } = useHass();

  const service = React.useMemo(() => {
    return {
      toggle: () =>
        callService('light', 'toggle', {
          entity_id: entityId,
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
    lastChanged: states[entityId].last_changed,
    service,
  };
};

export default useLight;
