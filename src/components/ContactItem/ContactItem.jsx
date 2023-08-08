import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, onDeleteContact }) => {

  return (
    <div>
      <div>{contact.name}</div>
      <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
    </div>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
