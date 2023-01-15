import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Wrapper = styled.div`
  color: #cbcbcb;
  width: fit-content;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
`;

interface VideoProps {
  entityId: string;
}

const Video = ({ entityId }: VideoProps) => {
  const hassElement = { entityId };

  if (!hassElement) {
    return null;
  }

  return (
    <Card>
      <Wrapper>
        <Image src="https://smarthomescene.com/wp-content/uploads/2022/07/mushroom-card-part2-update-card.png.webp" />
      </Wrapper>
    </Card>
  );
};

export default Video;
