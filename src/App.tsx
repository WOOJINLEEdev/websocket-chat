import { Suspense, lazy } from "react";

import "App.css";

import ChatHeader from "components/ChatHeader";
import ChatView from "components/ChatView";
import ChatInput from "components/ChatInput";
import Loading from "components/Loading";

const Menu = lazy(() => import("components/Menu"));

function App() {
  return (
    <div className="App">
      <ChatHeader />
      <ChatView />
      <ChatInput />

      <Suspense fallback={<Loading />}>
        <Menu />
      </Suspense>
    </div>
  );
}

export default App;
