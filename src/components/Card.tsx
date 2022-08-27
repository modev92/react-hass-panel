import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: 'SF UI Display';

  font-style: normal;
  user-select: none;

  h1 {
    font-weight: 300;
  }
`;

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps): React.ReactElement => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Card;
