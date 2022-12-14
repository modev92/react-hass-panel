import React from 'react';
import { useHass } from './HassContext';

const useScene = (entityId: string) => {
  const { states, callService, entities } = useHass<{ friendly_name: string }>();

  const service = React.useMemo(() => {
    return {
      turnOn: () =>
        callService('scene', 'turn_on', {
          entity_id: entityId,
        }),
    };
  }, [callService, entityId]);

  if (!states[entityId] || !entities[entityId]) {
    console.error(`${entityId} does not exist`);
    return null;
  }

  return {
    friendlyName: states[entityId].attributes.friendly_name,
    lastChanged: states[entityId].last_changed,
    service,
    icon: entities[entityId].icon,
  };
};

export default useScene;
