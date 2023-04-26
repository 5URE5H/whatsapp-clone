export interface Contact {
  id: string;
  name: string;
}

export interface Conversation {
  selected?: boolean;
  messages: Message[];
  recipients: Recipient[] | string[];
}

export interface Recipient {
  id: string;
  name?: string;
}

export interface Message {
  sender: string;
  text: string;
  fromMe: boolean;
  senderName: string;
}
