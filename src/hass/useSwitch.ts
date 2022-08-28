import React from 'react';
import { useHass } from './HassContext';

const useSwitch = (entityId: string) => {
  const { states, callService } = useHass<{ friendly_name: string }>();

  const service = React.useMemo(() => {
    return {
      toggle: () =>
        callService('switch', 'toggle', {
          entity_id: entityId,
        }),
      turnOn: () =>
        callService('switch', 'turn_on', {
          entity_id: entityId,
        }),
      turnOff: () =>
        callService('switch', 'turn_off', {
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
    lastChanged: states[entityId].last_changed,
    service,
  };
};

export default useSwitch;
