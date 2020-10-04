import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContacts);
    closeModal();
  };

  const handleCheckboxCheck = (contactId) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contactId)) {
        return prevSelectedContacts.filter((prevId) => contactId !== prevId);
      } else {
        return [...prevSelectedContacts, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                rype="checkbox"
                value={selectedContacts.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxCheck(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
