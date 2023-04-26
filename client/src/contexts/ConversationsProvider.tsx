import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Conversation } from "../types/chat";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

interface ConversationsContext {
  conversations: Conversation[];
  createConversation: (recipients: string[]) => void;
  selectedConversation: Conversation;
  sendMessage: (recipients: string[], text: string) => void;
  setSelectedConversationIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function useConversations() {
  const context = useContext(conversationsContext);

  if (!context) {
    throw new Error("context does not exist");
  }

  return context;
}

const conversationsContext = React.createContext<ConversationsContext | null>(
  null
);

export function ConversationsProvider({
  id,
  children,
}: PropsWithChildren<{ id: string }>) {
  const { contacts } = useContacts();

  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const socket = useSocket();

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const formattedConversations = conversations.map(
    (conversation: Conversation, index: number) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => contact.id === recipient);
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const selected = index === selectedConversationIndex;

      const messages = conversation.messages.map((message) => {
        const contact = contacts.find(
          (contact) => contact.id === message.sender
        );
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        return {
          ...message,
          senderName: name,
          fromMe,
        };
      });

      return { ...conversation, messages, recipients, selected };
    }
  );

  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations: string[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }: any) => {
      setConversations((prevConversations: any) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversation = prevConversations.map(
          (conversation: { recipients: any[]; messages: any }) => {
            if (arrayEquality(conversation.recipients, recipients)) {
              madeChange = true;

              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              };
            }

            return conversation;
          }
        );

        if (madeChange) {
          return newConversation;
        } else {
          return [
            ...prevConversations,
            {
              recipients,
              messages: [newMessage],
            },
          ];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  const sendMessage = (recipients: string[], text: string) => {
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({ recipients, text, sender: id });
  };

  return (
    <conversationsContext.Provider
      value={{
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        createConversation,
        setSelectedConversationIndex,
      }}
    >
      {children}
    </conversationsContext.Provider>
  );
}

function arrayEquality(a: any[], b: any[]) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element: any, index: number) => {
    return element === b[index];
  });
}
