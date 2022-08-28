import React from 'react';
import styled from 'styled-components';

const DateAndTimeContainer = styled.div`
  font-family: 'SF UI Text';
  font-size: 24px;
  margin-top: 8px;
  margin-bottom: 22px;
`;

const DateAndTime = () => {
  const now = new Date();
  const weekday = now.toLocaleString('de-de', { weekday: 'long' });
  const monat = now.toLocaleString('de-de', { month: 'long' });
  const time = now.toLocaleString('de-de', { minute: '2-digit', hour: '2-digit' });
  return (
    <DateAndTimeContainer>
      {weekday} <strong>-</strong> {now.getDate()}. {monat} {time} Uhr
    </DateAndTimeContainer>
  );
};

export default DateAndTime;
