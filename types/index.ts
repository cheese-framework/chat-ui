export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface Chat {
  id: string;
  sender: UserChat;
  receiver: UserChat;
  room: string;
  message: string;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  createdBy: string;
  updatedAt: string;
  lastMessage: string;
  recipient: Array<string>;
}

interface UserChat {
  id: string;
  username: string;
}
