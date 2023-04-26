import React, { PropsWithChildren, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Contact } from "../types/chat";

interface ContactsContext {
  contacts: Contact[];
  createContact: (id: string, name: string) => void;
}

export function useContacts() {
  const context = useContext(contactsContext);

  if (!context) {
    throw new Error("context does not exist");
  }

  return context;
}

const contactsContext = React.createContext<ContactsContext | null>(null);

export function ContactsProvider({ children }: PropsWithChildren) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id: string, name: string) => {
    setContacts((prevContacts: Contact[]) => {
      return [...prevContacts, { id, name }];
    });
  };

  return (
    <contactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </contactsContext.Provider>
  );
}
