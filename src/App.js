import React, { Suspense, lazy } from "react";
import "App.css";
import styled from "styled-components";
import ChatHeader from "components/ChatHeader";
import ChatView from "components/ChatView";
import ChatInput from "components/ChatInput";
import Loading from "components/Loading";
import useMenuCollapsed from "hooks/useMenuCollapsed";

const Menu = lazy(() => import("components/Menu"));

function App() {
  const { data, mutate } = useMenuCollapsed();

  const handleDimClick = () => {
    mutate(!data);
  };

  return (
    <div className="App">
      <ChatHeader />
      <ChatView />
      <DimmedLayer className={data ? "" : "hide"} onClick={handleDimClick} />
      <Suspense fallback={<Loading />}>
        <Menu show={data} />
      </Suspense>
      <ChatInput />
    </div>
  );
}

export default App;

const DimmedLayer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.1);
`;
