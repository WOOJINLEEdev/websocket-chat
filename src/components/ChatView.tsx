import { useState, useEffect, useRef } from "react";
import { atom, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { instance } from "utils/http-client";
import { IMessageBox, IReceivedMsgs, TokenData } from "types";

export const tokenData = atom<TokenData>({
  key: "#tokenData",
  default: { token: "", websocketClient: undefined },
});

const ChatView = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [_, setAuthToken] = useState("");
  const [receivedMsgs, setReceivedMsgs] = useState<IReceivedMsgs[]>([]);
  const messageViewWrapRef = useRef<HTMLDivElement>(null);

  const setSocketTokenData = useSetRecoilState(tokenData);

  useEffect(() => {
    async function connectSocket() {
      const res = await instance.post(
        `${process.env.REACT_APP_AUTH_API_BASE_URL}/auth`
      );

      const token: string = res.data;
      const websocketClient = new WebSocket(
        `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/ws?token=${token}`
      );

      websocketClient.onmessage = onMessage;
      setAuthToken(token);
      setSocket(websocketClient);

      const socketClientWrapper = {
        token,
        websocketClient,
      };

      setSocketTokenData(socketClientWrapper);
    }

    !socket && connectSocket();

    return () => {
      socket && socket.close();
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [receivedMsgs]);

  function onMessage(event: MessageEvent) {
    const msgs = event.data.split("\n");

    setReceivedMsgs((prevMsgs) => [
      ...prevMsgs,
      ...msgs.map((msg: string) => JSON.parse(msg)),
    ]);
  }

  function scrollToBottom() {
    if (messageViewWrapRef.current) {
      messageViewWrapRef.current.scrollTop =
        messageViewWrapRef.current.scrollHeight;
    }
  }

  return (
    <main>
      <MessageViewWrap ref={messageViewWrapRef}>
        {receivedMsgs.map((msg) => (
          <MessageBox
            key={msg.id}
            isMyMessage={msg.is_my_message ? "me" : "notMe"}
          >
            <Message className={msg.is_my_message ? "me" : "notMe"}>
              {msg.text}
            </Message>
          </MessageBox>
        ))}
      </MessageViewWrap>
    </main>
  );
};

export default ChatView;

const MessageViewWrap = styled.div`
  position: relative;
  height: calc(100vh - 134px);
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #efefef;
`;

const MessageBox = styled.div<IMessageBox>`
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
  background-color: #ffffff;
  border: 2px solid #efefef;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
`;
