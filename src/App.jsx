import React, { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Header, JoinRoom, Meeting } from "./components";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);
  return (
    <React.Fragment>
      <Header />
      {isConnected ? (
        <>
          <Meeting />
        </>
      ) : (
        <JoinRoom />
      )}
    </React.Fragment>
  );
}

export default App;
