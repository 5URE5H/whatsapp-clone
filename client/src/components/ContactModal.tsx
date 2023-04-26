import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

export default function ContactModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const idRef = useRef<null | HTMLInputElement>(null);
  const nameRef = useRef<null | HTMLInputElement>(null);
  const { createContact } = useContacts();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idRef.current && nameRef.current)
      createContact(idRef.current?.value, nameRef.current?.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button className="mt-3" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
