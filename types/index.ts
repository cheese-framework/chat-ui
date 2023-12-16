export interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
}

export interface Chat {
  _id: string;
  sender: UserChat;
  receiver: UserChat;
  room: string;
  message: string;
  createdAt: string;
}

export interface Room {
  _id: string;
  sender: {
    id: string;
    name: string;
  };
  receiver: {
    id: string;
    name: string;
  };
  createdBy: string;
  updatedAt: string;
  lastMessage: string;
  recipients: Array<string>;
  exist: boolean;
}

interface UserChat {
  id: string;
  username: string;
}
