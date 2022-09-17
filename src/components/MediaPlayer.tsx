import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useMediaPlayer from '../hass/useMediaPlayer';
import Card from './Card';
import PlaySvg from './icons/PlaySvg';
import PauseSvg from './icons/PauseSvg';
import BackwardSvg from './icons/BackwardSvg';
import SpeakerLowSvg from './icons/SpeakerLowSvg';
import SpeakerHighSvg from './icons/SpeakerHighSvg';

const Wrapper = styled.div`
  color: #cbcbcb;
  width: fit-content;
`;

const Header = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 8px;
`;
const Info = styled.div`
  width: 256px;
  padding: 4px 12px;
`;
const Location = styled.div`
  font-family: 'SF UI Text';
  text-transform: uppercase;
  color: #aaa;
`;
const Title = styled.div`
  font-family: 'SF UI Display';
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
`;
const Artist = styled.div`
  font-family: 'SF UI Text';
  font-weight: 600;
  color: #aaa;

  white-space: nowrap;
  overflow: hidden;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 24px 42px;
`;

const ActionButton = styled.button``;
const SoundControl = styled.div`
  display: flex;
  align-items: center;

  padding: 0px 16px;
  gap: 22px;

  button {
    width: 32px;
  }
`;

const ForwardSvg = styled(BackwardSvg)`
  transform: rotate(180deg);
`;

const Range = styled.input<{ value: number }>`
  position: relative;
  flex-grow: 1;
  height: 6px;

  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  background: #aaa;
  border-radius: 20px;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: white;
    width: 16px;
    height: 16px;
    border-radius: 16px;
  }
`;

interface MediaPlayerProps {
  entityId: string;
}

const MediaPlayer = ({ entityId }: MediaPlayerProps) => {
  const [rangeValue, setRangeValue] = useState(0.5);

  const hassElement = useMediaPlayer(entityId);

  const changeVolme = useCallback(
    (volume: number) => {
      setRangeValue(volume);
      hassElement?.service.volumeSet(volume);
    },
    [hassElement?.service]
  );

  useEffect(() => {
    if (hassElement?.volumeLevel) {
      setRangeValue(hassElement?.volumeLevel);
    }
  }, [hassElement?.volumeLevel]);

  if (!hassElement) {
    return null;
  }

  return (
    <Card>
      <Wrapper>
        <Header>
          <Image src={hassElement.picture} />
          <Info>
            <Location>{hassElement.friendlyName}</Location>
            <Title>{hassElement.title}</Title>
            <Artist>{hassElement.artist}</Artist>
          </Info>
        </Header>
        <Actions>
          <ActionButton>
            <BackwardSvg />
          </ActionButton>
          {hassElement.state === 'playing' ? (
            <ActionButton onClick={hassElement.service.pause}>
              <PauseSvg />
            </ActionButton>
          ) : (
            <ActionButton onClick={hassElement.service.play}>
              <PlaySvg />
            </ActionButton>
          )}
          <ActionButton>
            <ForwardSvg />
          </ActionButton>
        </Actions>
        <SoundControl>
          <ActionButton onClick={() => changeVolme(0)}>
            <SpeakerLowSvg />
          </ActionButton>
          <Range max={1} min={0} step={0.1} value={rangeValue} type="range" onChange={(e) => changeVolme(parseFloat(e.target.value))} />
          <ActionButton onClick={() => changeVolme(rangeValue + 0.1)}>
            <SpeakerHighSvg />
          </ActionButton>
        </SoundControl>
      </Wrapper>
    </Card>
  );
};

export default MediaPlayer;
