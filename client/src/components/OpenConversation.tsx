import React, { useCallback, useRef, useState } from "react";
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState<string>("");
  const { sendMessage, selectedConversation } = useConversations();
  const setRef = useCallback((node: any) => {
    node && node.scrollIntoView({ smooth: true });
  }, []);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r: any) => r.id),
      text
    );
    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.fromMe ? "you" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Form onSubmit={handleSend}>
        <FormGroup className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}
