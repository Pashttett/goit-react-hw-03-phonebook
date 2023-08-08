import React from 'react';
import PropTypes from 'prop-types';
import {
  ContactListContainer,
  ContactListItem,
  DeleteButton,
} from './ContactList.styled';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ContactListContainer>
      {contacts.map((contact) => (
        <ContactListItem key={contact.id}>
          {contact.name} - {contact.number}{' '}
          <DeleteButton onClick={() => onDeleteContact(contact.id)}>Delete</DeleteButton>
        </ContactListItem>
      ))}
    </ContactListContainer>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
