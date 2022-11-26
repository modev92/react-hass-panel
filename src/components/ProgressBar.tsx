import React from 'react';
import styled from 'styled-components';

const ProgressbarContainer = styled.div`
  background-color: white;
  position: absolute;
  width: 6px;
  height: 100%;
  top: 0;
  right: 0;
`;

const ProgressbarBar = styled.div<{ height: number }>`
  background-color: #ffc107;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ height }) => height}%;
  box-sizing: border-box;
  animation: grow 1.5s ease-out forwards;
  transform-origin: bottom;
`;

export const VProgressBar = ({ height }: { height: number }) => (
  <ProgressbarContainer>
    <ProgressbarBar height={height} />
  </ProgressbarContainer>
);
