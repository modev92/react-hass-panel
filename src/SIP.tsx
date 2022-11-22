import React, { useEffect } from 'react';

const enc = new TextEncoder();

function toArrayBuffer(message: string) {
  return enc.encode(message);
}

function parseResponse(incommingData: string) {
  const data = incommingData.replace(/[^ -~]+/g, '') as string;
  if (data.charAt(0) === '{') {
    return JSON.parse(data);
  } else {
    try {
      const res = JSON.parse(data.substring(1));
      return res;
    } catch {
      console.error('Strange first char', data, data.lastIndexOf('}'));
      return {};
    }
  }
}

let receiveAudio = false;
const SIP = (): React.ReactElement => {
  useEffect(() => {
    const socket = new WebSocket('wss://192.168.178.195:5000/ws', 'binary');

    socket.onopen = () => {
      socket.send(
        toArrayBuffer(`POST /control/eventstream.jpg HTTP/1.0
Host: 192.168.178.195
Connection: close
User-Agent: mx-client (andromeda MX-V4-5-0-26-10-g0baa9b6)

`)
      );
      // socket.send(
      //   _base64ToArrayBuffer(
      //     'UE9TVCAvY29udHJvbC9ldmVudHN0cmVhbS5qcGcgSFRUUC8xLjANCkhvc3Q6IDE5Mi4xNjguMTc4LjE5NQ0KQ29ubmVjdGlvbjogY2xvc2UNClVzZXItQWdlbnQ6IG14LWNsaWVudCAoYW5kcm9tZWRhIE1YLVY0LTUtMC0yNi0xMC1nMGJhYTliNikNCg0K'
      //   )
      // );
      // setTimeout(() => {
      //   socket.send(_base64ToArrayBuffer('eyJtZXRob2QiOiJ2aWRlb19lbmFibGUiLCJpZCI6MjYsInBhcmFtcyI6W2ZhbHNlXX0A'));
      //   setTimeout(() => {
      //     socket.send(_base64ToArrayBuffer('eyJtZXRob2QiOiJ2aWRlb19lbmFibGUiLCJpZCI6MjYsInBhcmFtcyI6W2ZhbHNlXX0A'));
      //   }, 2000);
      // }, 2000);
    };
    socket.onmessage = async (message) => {
      const data = parseResponse(await message.data.text());

      if (receiveAudio) {
        console.log('got audio');
      } else {
        console.log(receiveAudio, data);
      }

      if (data?.result?.userlevel === 'guest') {
        socket.send(toArrayBuffer('{"method":"video_enable","id":2,"params":[true]}'));
      }
      if (data?.id === 2) {
        socket.send(toArrayBuffer('{"method":"mode","id":3,"params":["mxpeg"]}'));
      }
      if (data?.id === 3) {
        socket.send(toArrayBuffer('{"method":"fps","id":4,"params":[12.00]}'));
      }
      if (data?.id === 4) {
        socket.send(toArrayBuffer('{"method":"audiooutput","id":5,"params":["off"]}'));
      }
      if (data?.id === 5) {
        socket.send(toArrayBuffer('{"method":"video_enable","id":6,"params":[true]}'));
      }
      if (data?.id === 6) {
        socket.send(toArrayBuffer('{"method":"mode","id":7,"params":["mxpeg"]}'));
      }
      if (data?.id === 7) {
        socket.send(toArrayBuffer('{"method":"size","id":8,"params":[{"w":352,"h":288,"fix":false,"configmode":"off"}]}'));
      }
      if (data?.id === 8) {
        socket.send(toArrayBuffer('{"method":"fps","id":9,"params":[4.00]}'));
      }
      if (data?.id === 9) {
        socket.send(toArrayBuffer('{"method":"audiooutput","id":10,"params":["off"]}'));
      }
      if (data?.id === 10) {
        socket.send(toArrayBuffer('{"method":"live","id":11}'));
        // breaking next line
        // socket.send(toArrayBuffer('{"method":"subscription","id":12,"params":["alarmupdate",true]}'));
      }
      if (data?.id === 11) {
        socket.send(toArrayBuffer('{"method":"rangeinfo","id":13}'));
        socket.send(toArrayBuffer('{"method":"rangeinfo","id":14}'));
        socket.send(toArrayBuffer('{"method":"camerafeatures","id":15}'));
        socket.send(toArrayBuffer('{"method":"rangeinfo","id":16}'));
        setTimeout(() => {
          socket.send(toArrayBuffer('{"method":"audiooutput","id":17,"params":["pcm16"]}'));
          receiveAudio = true;
        }, 3000);
        setTimeout(() => {
          socket.send(toArrayBuffer('{"method":"audiooutput","id":19,"params":["off"]}'));
          receiveAudio = false;
        }, 10000);
      }
    };
    socket.onclose = () => {
      console.log({ event: 'onclose' });
    };
    socket.onerror = (error) => {
      console.log(error);
    };
  }, []);

  return <div>Tests</div>;
};

export default SIP;
