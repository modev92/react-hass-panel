import React, { useCallback, useEffect } from 'react';
import JsSIP from 'jssip';
JsSIP.debug.enable('JsSIP:*');

const SIP = (): React.ReactElement => {
  const refAudioPlayer = React.useRef<HTMLAudioElement>(null);
  const refUa = React.useRef<JsSIP.UA>();

  useEffect(() => {
    const socket = new JsSIP.WebSocketInterface('wss://192.168.178.163:8089/ws');
    const configuration = {
      sockets: [socket],
      uri: 'sip:1001@192.168.178.163',
      authorization_user: '1001',
      password: 'mypassword',
      register: true,
    };

    refUa.current = new JsSIP.UA(configuration);

    refUa.current.start();

    return () => {
      console.log('stopSession');

      refUa.current?.stop();
    };
  }, []);

  const handleRemoteTrackEvent = async (event: RTCTrackEvent): Promise<void> => {
    if (!refAudioPlayer.current) {
      return;
    }

    let stream: MediaStream | null = null;
    if (event.streams) {
      stream = event.streams[0];
    } else {
      if (!stream) {
        stream = new MediaStream();
      }
      stream.addTrack(event.track);
    }

    const remoteAudio = refAudioPlayer.current;
    if (event.track.kind === 'audio' && remoteAudio.srcObject != stream) {
      remoteAudio.srcObject = stream;
      try {
        await remoteAudio.play();
      } catch (err) {
        console.log('Error starting audio playback: ' + err);
      }
    }
  };

  const startCall = useCallback(() => {
    if (!refUa || !refUa.current) {
      return;
    }
    // Register callbacks to desired call events
    const eventHandlers = {
      progress: function () {
        console.log('call is in progress');
      },
      failed: function (e: any) {
        console.log('call failed with cause: ' + JSON.stringify(e));
      },
      ended: function (e: any) {
        console.log('call ended with cause: ' + e);
      },
      confirmed: function () {
        console.log('call confirmed');
      },
    };

    const options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: false },
      rtcOfferConstraints: { offerToReceiveAudio: true },
    };

    const session = refUa.current.call('sip:8000@192.168.178.163', options);
    session.connection.addEventListener('track', handleRemoteTrackEvent);
  }, []);

  const endCall = useCallback(() => {
    refUa.current?.terminateSessions();
  }, []);

  return (
    <div>
      <audio id="remoteAudio" controls ref={refAudioPlayer} style={{ display: 'none' }} />

      <button onClick={startCall}>Call Doorbell</button>
      <button onClick={endCall}>Stop Call Doorbell</button>

      <img src="https://192.168.178.195/control/faststream.jpg?stream=full&fps=16" />
    </div>
  );
};

export default SIP;
