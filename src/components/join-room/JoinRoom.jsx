import "./joinroom.css";
import { useHMSActions } from "@100mslive/react-sdk";
import { useState } from "react";

export function JoinRoom() {
  const hmsActions = useHMSActions();
  const [input, setInput] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getToken = async (user_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_TOKEN_GENERATION_ENDPOINT}api/token`,
      {
        method: "POST",
        body: JSON.stringify({
          user_id,
          role: "host",
          type: "app",
          room_id: process.env.REACT_APP_ROOM_ID,
        }),
      }
    );

    const { token } = await response.json();
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken(input.name);
    hmsActions.join({
      userName: input.name,
      authToken: token,
    });
  };

  return (
    <div className="sm-form-container">
      <form className="sm-join-room" onSubmit={handleSubmit}>
        <h2>Join Room</h2>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={input.name}
          onChange={handleInputChange}
        />
        <button className="sm-btn-join">Join</button>
      </form>
    </div>
  );
}
