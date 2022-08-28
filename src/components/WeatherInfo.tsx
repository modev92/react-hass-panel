import React from 'react';
import styled from 'styled-components';
import useWeather from '../hass/useWeather';

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Value = styled.div`
  font-family: 'SF UI Display';
  font-weight: bold;
  font-size: 42px;

  span {
    font-weight: 300;
  }
`;

const Info = styled.div`
  font-family: 'SF UI Text';
  font-weight: 600;
  text-transform: capitalize;
`;

interface WeatherInfoProps {
  entityId: string;
}

const WeatherInfo = ({ entityId }: WeatherInfoProps) => {
  const weather = useWeather(entityId);

  return (
    <Wrapper>
      <Value>
        {weather?.temperature}
        <span>&deg;</span>
      </Value>
      <div>
        <Info>{weather?.zone}</Info>
        <Info>{weather?.state}</Info>
      </div>
    </Wrapper>
  );
};

export default WeatherInfo;
