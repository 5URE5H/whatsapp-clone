import React, { Dispatch, SetStateAction, useRef } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

export default function Login({
  onIdSubmit,
}: {
  onIdSubmit: Dispatch<SetStateAction<string | undefined>>;
}) {
  const usernameRef = useRef<null | HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onIdSubmit(usernameRef.current?.value);
  };

  const generateId = () => {
    onIdSubmit(crypto.randomUUID());
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef}></Form.Control>
            </Form.Group>
            <Button className="mt-3 me-2" variant="primary" type="submit">
              Login
            </Button>
            <Button className="mt-3" variant="secondary" onClick={generateId}>
              Generate New
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
