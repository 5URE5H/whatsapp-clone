import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ConversationModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConversation(selectedContacts);
    closeModal();
  };

  const handleCheckboxChange = (contactId: string) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contactId))
        return prevSelectedContacts.filter((prevId) => prevId !== contactId);
      else return [...prevSelectedContacts, contactId];
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContacts.includes(contact.id).toString()}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button className="mt-3" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
