import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useSocketToken from "hooks/useSocketToken";

const ChatView = () => {
  const [socket, setSocket] = useState();
  const [authToken, setAuthToken] = useState("");
  const [receivedMsgs, setReceivedMsgs] = useState([]);

  const messageViewWrapRef = useRef();
  const { socketTokenData, socketTokenMutate } = useSocketToken();

  useEffect(() => {
    async function connectSocket() {
      const res = await fetch("http://localhost:9898/auth", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const authToken = await res.text();
      const websocketClient = new WebSocket(
        `ws://localhost:9898/ws?token=${authToken}`
      );

      websocketClient.onmessage = onMessage;
      setAuthToken(authToken);
      setSocket(websocketClient);

      const socketClientWrapper = {
        authToken,
        websocketClient,
      };
      socketTokenMutate(socketClientWrapper);
    }

    !socket && connectSocket();

    return () => {
      socket && socket.close();
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [receivedMsgs]);

  function onMessage(event) {
    const msgs = event.data.split("\n");

    setReceivedMsgs((prevMsgs) => [
      ...prevMsgs,
      ...msgs.map((msg) => JSON.parse(msg)),
    ]);
  }

  function scrollToBottom() {
    if (messageViewWrapRef.current) {
      messageViewWrapRef.current.scrollTop =
        messageViewWrapRef.current.scrollHeight;
    }
  }

  return (
    <MessageViewWrap ref={messageViewWrapRef}>
      {receivedMsgs.map((msg, index) => (
        <MessageBox isMyMessage={msg.is_my_message ? "me" : "notMe"}>
          <Message key={msg.id} className={msg.is_my_message ? "me" : "notMe"}>
            {msg.text}
          </Message>
        </MessageBox>
      ))}
    </MessageViewWrap>
  );
};

export default ChatView;

const MessageViewWrap = styled.main`
  position: relative;
  height: calc(100vh - 134px);
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #efefef;
`;

const MessageBox = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.isMyMessage === "me" ? "flex-end" : "flex-start"};
  width: 100%;
`;

const Message = styled.div`
  max-width: 70%;
  line-height: 16px;
  font-size: 16px;
  margin: 10px 0;
  padding: 15px;
  background-color: #fff;
  border: 2px solid #efefef;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
`;
