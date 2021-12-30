import { useState, useEffect, useRef } from "react";
import "App.css";
import styled from "styled-components";
import { MdSend } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

function App() {
  const [socket, setSocket] = useState();
  const [authToken, setAuthToken] = useState("");
  const [text, setText] = useState("");
  const [receivedMsgs, setReceivedMsgs] = useState([]);

  const messageViewWrapRef = useRef();

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

  function sendMessage() {
    if (text === "" || text.length < 1) {
      return false;
    }

    socket.send(
      JSON.stringify({
        token: authToken,
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

  function scrollToBottom() {
    if (messageViewWrapRef.current) {
      messageViewWrapRef.current.scrollTop =
        messageViewWrapRef.current.scrollHeight;
    }
  }

  return (
    <div className="App">
      <Header>
        <IoIosArrowBack className="header_goBack" />
        <h1>User</h1>
        <BsThreeDots className="header_menu" />
      </Header>

      <MessageViewWrap ref={messageViewWrapRef}>
        {receivedMsgs.map((msg, index) => (
          <MessageBox isMyMessage={msg.is_my_message ? "me" : "notMe"}>
            <Message
              key={msg.id}
              className={msg.is_my_message ? "me" : "notMe"}
            >
              {msg.text}
            </Message>
          </MessageBox>
        ))}
      </MessageViewWrap>

      <MessageInputWrap>
        <MessageInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={onKeyPress}
          autoFocus
        />
        <Button type="button" onClick={sendMessage}>
          <MdSend />
        </Button>
      </MessageInputWrap>
    </div>
  );
}

export default App;

const Header = styled.header`
  height: 60px;
  color: #fff;
  background: green;
  border: 0;
  font-size: 15px;
  font-weight: bold;
  padding: 0 10px;
  text-align: center;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);

  & h1 {
    line-height: 60px;
  }

  .header_goBack {
    position: absolute;
    width: 30px;
    height: 30px;
    margin: 15px 0;
    color: #fff;
    top: 0;
    left: 10px;
  }

  .header_menu {
    position: absolute;
    width: 30px;
    height: 30px;
    margin: 15px 0;
    color: #fff;
    top: 0;
    right: 10px;
  }
`;

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
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 2px solid #efefef;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  /* border-bottom-left-radius: ${(props) =>
    props.isMyMessage === "me" && "0"}; */
`;

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
  cursor: pointer;

  & svg {
    fill: green;
    width: 20px;
    height: 30px;
    margin: 10px 15px;
  }
`;
