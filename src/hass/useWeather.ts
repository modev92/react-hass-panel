import { useHass } from './HassContext';

type WeatherAttributesInternal = {
  temperature: number;
  friendly_name: string;
};

const useWeather = (entityId: string) => {
  const { states } = useHass<WeatherAttributesInternal>();

  if (!states[entityId]) {
    console.error(`${entityId} does not exist`);
    return null;
  }

  return {
    state: states[entityId].state,
    zone: states['zone.home'].attributes.friendly_name,
    temperature: states[entityId].attributes.temperature,
  };
};

export default useWeather;
