import React from 'react';
import styled, { css } from 'styled-components';
import SvgStateCss from './icons/SvgStateCss';
import { MiscStateCss } from './Misc';

const CardWrapper = styled.div<{ state?: string }>`
  font-family: 'SF UI Display';
  font-style: normal;
  user-select: none;

  border-radius: 12px;

  color: black;

  > * {
    min-width: 94px;
    padding: 12px;
    border-radius: 12px;
    background-color: rgb(255, 255, 255);

    ${({ state }) =>
      state !== 'on' &&
      css`
        background-color: rgba(128, 128, 128, 0.5);
      `}
  }

  ${SvgStateCss}
  ${MiscStateCss}
`;

interface CardProps {
  children: React.ReactNode;
  state?: string;
}

const Card = ({ children, state }: CardProps): React.ReactElement => {
  return <CardWrapper state={state}>{children}</CardWrapper>;
};

export default Card;
