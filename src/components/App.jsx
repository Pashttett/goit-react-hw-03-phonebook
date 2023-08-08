import React, { Component } from 'react';
import ContactForm from './ContactForm/AddContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    const isContactExists = contacts.find(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() || contact.number === number
    );

    if (isContactExists) {
      alert(`${name} or phone number ${number} is already in the phonebook`);
      return;
    }

    const newContact = {
      id: `id-${Date.now()}`,
      name,
      number,
    };

    this.setState(
      (prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleDeleteContact = (id) => {
    this.setState(
      (prevState) => ({
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          name={this.state.name}
          setName={(name) => this.setState({ name })}
          number={this.state.number}
          setNumber={(number) => this.setState({ number })}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;
