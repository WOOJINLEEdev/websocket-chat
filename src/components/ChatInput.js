import React, { useState } from "react";
import styled from "styled-components";
import { MdSend } from "react-icons/md";
import useSocketToken from "hooks/useSocketToken";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { socketTokenData, socketTokenMutate } = useSocketToken();

  function sendMessage() {
    if (text === "" || text.length < 1) {
      return false;
    }

    socketTokenData.websocketClient.send(
      JSON.stringify({
        token: socketTokenData.authToken,
        text,
      })
    );

    setText("");
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <MessageInputWrap>
      <label htmlFor="messageInput" className="visually_hidden">
        메시지 입력
      </label>
      <MessageInput
        id="messageInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={onKeyPress}
        autoFocus
      />
      <Button type="button" onClick={sendMessage}>
        <MdSend />
        <span className="visually_hidden">메시지 보내기</span>
      </Button>
    </MessageInputWrap>
  );
};

export default ChatInput;

const MessageInputWrap = styled.footer`
  display: flex;
  justify-content: space-between;
  height: 50px;
  border: 2px solid #efefef;
  box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.1);
`;

const MessageInput = styled.input`
  width: calc(100% - 70px);
  font-size: 20px;
  border: 0;
  outline: 0;
`;

const Button = styled.button`
  display: flex;
  background-color: #fff;
  border: 0;
  padding: 0;

  & svg {
    fill: green;
    width: 20px;
    height: 30px;
    margin: 10px 15px;
  }
`;
