import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { MdSend } from "react-icons/md";

import { useRecoilState } from "recoil";
import { tokenData } from "./ChatView";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const [socketTokenData, setSocketTokenData] = useRecoilState(tokenData);

  function sendMessage() {
    if (message === "" || message.length < 1) {
      return false;
    }

    socketTokenData.websocketClient?.send(
      JSON.stringify({
        token: socketTokenData.token,
        text: message,
      })
    );

    setMessage("");
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (message.length > 0) {
      sendMessage();
    }
  }

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <footer>
      <MessageForm onSubmit={handleFormSubmit}>
        <label htmlFor="messageInput" className="visually_hidden">
          메시지 입력
        </label>
        <input
          type="text"
          id="messageInput"
          className="message_input"
          value={message}
          onChange={handleMessageChange}
          autoFocus
        />

        <button
          type="submit"
          className="submit_btn"
          onClick={sendMessage}
          aria-label="Send Message"
        >
          <MdSend />
        </button>
      </MessageForm>
    </footer>
  );
};

export default ChatInput;

const MessageForm = styled.form`
  display: flex;
  justify-content: space-between;
  height: 50px;
  border: 2px solid #efefef;
  box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.1);

  & .message_input {
    width: calc(100% - 70px);
    font-size: 20px;
    border: 0;
    outline: 0;
    padding-left: 10px;
  }

  & .submit_btn {
    display: flex;
    background-color: #ffffff;
    border: 0;
    padding: 0;

    & svg {
      fill: #008000;
      width: 20px;
      height: 30px;
      margin: 10px 15px;
    }
  }
`;
