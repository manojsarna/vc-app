import "./peer.css";
import {
  selectVideoTrackByPeerID,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useRef, useEffect } from "react";

export function Peer({ peer }) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return (
    <div className="sm-peer-container">
      <video
        ref={videoRef}
        className="sm-peer-video"
        autoPlay
        muted
        playsInline
      />
      <div className="sm-peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}
