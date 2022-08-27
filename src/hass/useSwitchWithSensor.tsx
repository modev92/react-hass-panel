import { useSensorGroup } from './useSensor';
import useSwitch from './useSwitch';

const METER_SENSOR = ['current', 'voltage'] as const;

const useSwitchWithSensor = (entityId: string, switchName?: string) => {
  const switchEntity = useSwitch(`switch.${entityId}_${switchName}`);
  const sensorGroup = useSensorGroup<typeof METER_SENSOR[number]>(`sensor.${entityId}`, METER_SENSOR);

  return {
    ...switchEntity,
    ...sensorGroup,
  };
};

export default useSwitchWithSensor;
