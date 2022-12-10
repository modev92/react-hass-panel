import React from 'react';
import { useHass } from './HassContext';

const useScript = (entityId: string) => {
  const { states, callService, entities } = useHass<{ friendly_name: string }>();

  const service = React.useMemo(() => {
    return {
      custom: (name: string) =>
        callService('script', name, {
          entity_id: entityId,
        }),
    };
  }, [callService, entityId]);

  if (!states[entityId] || !entities[entityId]) {
    console.error(`${entityId} does not exist`);
    return null;
  }

  return {
    state: states[entityId].state,
    icon: entities[entityId].icon,
    friendlyName: states[entityId].attributes.friendly_name,
    lastChanged: states[entityId].last_changed,
    service,
  };
};

export default useScript;
