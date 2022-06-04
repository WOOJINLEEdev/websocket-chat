export interface IReceivedMsgs {
  is_my_message: string;
  id: number;
  text: string;
}

export interface IMessageBox {
  isMyMessage: string;
}

export interface TokenData {
  token: string;
  websocketClient?: WebSocket;
}
