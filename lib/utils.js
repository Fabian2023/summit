import { agentImg, DID_API } from "./constants";

let peerConnection;
let streamId;
let sessionId;
let sessionClientAnswer;

export async function connect() {
  if (peerConnection && peerConnection.connectionState === "connected") {
    return;
  }

  stopAllStreams();
  closePC();

  const sessionResponse = await fetch(`${DID_API.url}/talks/streams`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${DID_API.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_url: agentImg,
    }),
  });

  const {
    id: newStreamId,
    offer,
    ice_servers: iceServers,
    session_id: newSessionId,
  } = await sessionResponse.json();
  streamId = newStreamId;
  sessionId = newSessionId;

  try {
    sessionClientAnswer = await createPeerConnection(offer, iceServers);
  } catch (e) {
    console.log("error during streaming setup", e);
    stopAllStreams();
    closePC();
    return;
  }

  await fetch(`${DID_API.url}/talks/streams/${streamId}/sdp`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${DID_API.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: sessionClientAnswer,
      session_id: sessionId,
    }),
  });

  console.log(peerConnection);
}

export function closePC(pc = peerConnection) {
  if (!pc) return;
  console.log("stopping peer connection");
  pc.close();
  pc.removeEventListener("track", onTrack, true);
  pc.removeEventListener("icecandidate", onIceCandidate, true);
  pc.removeEventListener(
    "connectionstatechange",
    onConnectionStateChange,
    true
  );

  console.log("stopped peer connection");
  if (pc === peerConnection) {
    peerConnection = null;
  }
}

async function createPeerConnection(offer, iceServers) {
  if (!peerConnection) {
    peerConnection = new RTCPeerConnection({ iceServers });
  }

  peerConnection.addEventListener("icecandidate", onIceCandidate, true);
  peerConnection.addEventListener(
    "connectionstatechange",
    onConnectionStateChange,
    true
  );
  peerConnection.addEventListener("track", onTrack, true);

  await peerConnection.setRemoteDescription(offer);
  console.log("set remote sdp OK");

  const sessionClientAnswer = await peerConnection.createAnswer();
  console.log("create local sdp OK");

  await peerConnection.setLocalDescription(sessionClientAnswer);
  console.log("set local sdp OK");

  return sessionClientAnswer;
}

export async function sendInput(text) {
  // Get the user input from the text input field
  if (
    peerConnection?.signalingState === "stable" ||
    peerConnection?.iceConnectionState === "connected"
  ) {
    const res = await fetch(`${DID_API.url}/talks/streams/${streamId}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${DID_API.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script: {
          type: "text",
          subtitles: "false",
          provider: {
            type: "microsoft",
            voice_id: "es-MX-CarlotaNeural",
          },
          ssml: true,
          input: `Hola ${text}, es un honor tenerte aquí hoy. Nos encontramos en un momento crucial para la ciencia y la medicina, donde la innovación es la clave de la lucha contra las enfermedades infecciosas`, // Use the user input as the input value
        },
        config: {
          fluent: true,
          pad_audio: 0,
          driver_expressions: {
            expressions: [
              { expression: "neutral", start_frame: 0, intensity: 0 },
            ],
            transition_frames: 0,
          },
          align_driver: true,
          align_expand_factor: 0,
          auto_match: true,
          motion_factor: 0,
          normalization_factor: 0,
          sharpen: true,
          stitch: true,
          result_format: "mp4",
        },
        // eslint-disable-next-line no-dupe-keys
        config: {
          stitch: true,
        },
        driver_url: "bank://lively/",
        session_id: sessionId,
      }),
    });
    console.log(res);
  }
}

export async function destroy() {
  await fetch(`${DID_API.url}/talks/streams/${streamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${DID_API.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session_id: sessionId }),
  });

  stopAllStreams();
  closePC();
}

export function onIceCandidate(event) {
  console.log("onIceCandidate", event);
  if (event.candidate) {
    const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

    fetch(`${DID_API.url}/talks/streams/${streamId}/ice`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${DID_API.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate,
        sdpMid,
        sdpMLineIndex,
        session_id: sessionId,
      }),
    });
  }
}

function onTrack(event) {
  const remoteStream = event.streams[0];
  console.log(remoteStream);
  setVideoElement(remoteStream);
}

function setVideoElement(stream) {
  if (!stream) return;
  const talkVideo = document.getElementById("talk-video");
  console.log(stream);
  talkVideo.srcObject = stream;
}

function stopAllStreams() {
  const talkVideo = document.getElementById("talk-video");
  if (talkVideo.srcObject) {
    talkVideo.srcObject.getTracks().forEach((track) => track.stop());
    talkVideo.srcObject = null;
  }
}

function onConnectionStateChange() {
  if (peerConnection.connectionState === "failed") {
    connect();
  }
}
