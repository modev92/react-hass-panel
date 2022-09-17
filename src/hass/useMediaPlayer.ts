import React from 'react';
import { useHass } from './HassContext';

type MediaPlayerAttributesInternal = {
  friendly_name: string;
  group_members: string[];
  entity_picture: string;
  media_artist: string;
  media_title: string;
  repeat: string;
  shuffle: boolean;
  is_volume_muted: boolean;
  volume_level: number;
};

const useMediaPlayer = (entityId: string) => {
  const { states, callService } = useHass<MediaPlayerAttributesInternal>();

  const service = React.useMemo(() => {
    return {
      volumeSet: (volumeLevel: number) =>
        callService('media_player', 'volume_set', {
          entity_id: entityId,
          volume_level: volumeLevel,
        }),
      play: () =>
        callService('media_player', 'media_play', {
          entity_id: entityId,
        }),
      pause: () =>
        callService('media_player', 'media_pause', {
          entity_id: entityId,
        }),
      mediaNextTrack: () =>
        callService('media_player', 'media_next_track', {
          entity_id: entityId,
        }),
      mediaPreviousTrack: () =>
        callService('media_player', 'media_previous_track', {
          entity_id: entityId,
        }),
    };
  }, [callService, entityId]);

  if (!states[entityId]) {
    console.error(`${entityId} does not exist`);
    return null;
  }

  return {
    state: states[entityId].state,
    friendlyName: states[entityId].attributes.friendly_name,
    lastChanged: states[entityId].last_changed,
    picture: states[entityId].attributes.entity_picture,
    isMuted: states[entityId].attributes.is_volume_muted,
    volumeLevel: states[entityId].attributes.volume_level,
    artist: states[entityId].attributes.media_artist,
    title: states[entityId].attributes.media_title,
    service,
  };
};

export default useMediaPlayer;
