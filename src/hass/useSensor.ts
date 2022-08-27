import { StateOptions, useHass } from './HassContext';

type SwitchAttributesInternal = {
  friendly_name: string;
  state_class: string;
  device_class: string;
  unit_of_measurement: string;
};
type SwitchAttributes = {
  friendlyName: string;
  stateClass: string;
  deviceClass: string;
  unitOfMeasurement: string;
};

function mapAttributes(attributes: SwitchAttributesInternal) {
  return {
    friendlyName: attributes.friendly_name,
    stateClass: attributes.state_class,
    deviceClass: attributes.device_class,
    unitOfMeasurement: attributes.unit_of_measurement,
  };
}

const useSensor = (entityId: string) => {
  const { states } = useHass<SwitchAttributesInternal>();

  if (!states[entityId]) {
    console.error(`${entityId} does not exist`);
    return null;
  }

  return {
    state: states[entityId].state,
    lastChanged: states[entityId].last_changed,
    attributes: mapAttributes(states[entityId].attributes),
  };
};

/**
 * useSensorGroup('sensor.delock1', ['current', 'voltage']) => 'sensor.delock1_current' and 'sensor.delock1_voltage'
 * @param entityId build from given name
 * @param sensors Array of sensor values
 * @returns sensor data `${entityId}_${sensor}`
 */
export const useSensorGroup = <T extends string>(entityId: string, sensors: readonly string[]) => {
  const { states } = useHass<SwitchAttributesInternal>();

  if (!sensors.every((sensor) => states[`${entityId}_${sensor}`])) {
    console.error(`${entityId} does not have all of the given sensors ${sensors}`);
    return null;
  }

  return sensors.reduce(
    (output, sensor) => ({
      ...output,
      [sensor]: {
        state: states[`${entityId}_${sensor}`].state,
        lastChanged: states[`${entityId}_${sensor}`].last_changed,
        attributes: mapAttributes(states[`${entityId}_${sensor}`].attributes),
      },
    }),
    {}
  ) as Record<T, StateOptions<SwitchAttributes>>;
};

export default useSensor;
