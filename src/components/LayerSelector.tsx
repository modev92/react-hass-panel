import React from 'react';
import styled, { css } from 'styled-components';

const LayerElement = styled.button<{ selected: boolean }>`
  padding: 8px;
  flex: 1 1 0px;
  font-family: 'SF UI Display';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;

  color: black;

  background-color: rgba(255, 255, 255, 0.4);

  ${({ selected }) =>
    selected &&
    css`
      background-color: rgba(255, 255, 255, 0.7);
    `}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-self: end;

  border-radius: 8px;

  ${LayerElement}:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  ${LayerElement}:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

type Layer = {
  name: string;
};

interface LayerSelectorProps {
  layers: Layer[];
  currentLayer: number;
  changeLayer: (index: number) => void;
}

const LayerSelector = ({ layers, currentLayer, changeLayer }: LayerSelectorProps) => {
  return (
    <Wrapper>
      {layers.map((layer, index) => (
        <LayerElement key={index} selected={index === currentLayer} onClick={() => changeLayer(index)}>
          {layer.name}
        </LayerElement>
      ))}
    </Wrapper>
  );
};

export default LayerSelector;
