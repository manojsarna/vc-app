import "./meeting.css";
import {
  selectPeers,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsConnectedToRoom,
  useHMSActions,
} from "@100mslive/react-sdk";
import { Peer } from "../peer/Peer";
import React from "react";
import {
  AntDesignAudioMutedOutlined,
  AntDesignAudioOutlined,
  EvaVideoOffOutline,
  EvaVideoOutline,
  FluentArrowExit20Filled,
} from "../../Icons";

export function Meeting() {
  const peers = useHMSStore(selectPeers);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  const toggleAudio = () => {
    hmsActions.setLocalAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    hmsActions.setLocalVideoEnabled(!videoEnabled);
  };
  return (
    <React.Fragment>
      <div className="sm-meeting-room">
        <h1>Meeting Room</h1>
        <div className="sm-peers-container">
          {peers.map((peer) => (
            <Peer key={peer.id} peer={peer} />
          ))}
        </div>
      </div>
      <div className="sm-controls">
        <button
          className="sm-btn-icon"
          onClick={toggleAudio}
          title={audioEnabled ? "Mute" : "Unmute"}
        >
          {audioEnabled ? (
            <AntDesignAudioOutlined />
          ) : (
            <AntDesignAudioMutedOutlined />
          )}
        </button>
        <button
          className="sm-btn-icon"
          onClick={toggleVideo}
          title={videoEnabled ? "Disable Video" : "Enable Video"}
        >
          {videoEnabled ? <EvaVideoOutline /> : <EvaVideoOffOutline />}
        </button>
        {isConnected && (
          <button
            title="Leave Room"
            className="sm-btn-icon btn-leave"
            onClick={() => hmsActions.leave()}
          >
            <FluentArrowExit20Filled />
          </button>
        )}
      </div>
    </React.Fragment>
  );
}
