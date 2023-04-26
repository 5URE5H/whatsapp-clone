import { useState } from "react";
import { Button, Modal, Nav, Tab } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import ConversationModal from "./ConversationModal";
import ContactModal from "./ContactModal";

const CONVERSATIONS = "conversations";
const CONTACTS = "contacts";

export default function Sidebar({ id }: { id: string }) {
  const [activeKey, setActiveKey] = useState<any>(CONVERSATIONS);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ width: "300px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-end small">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded-0">
          New {activeKey === CONVERSATIONS ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === CONVERSATIONS ? (
          <ConversationModal closeModal={closeModal} />
        ) : (
          <ContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
