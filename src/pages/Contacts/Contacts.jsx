import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Section, Title, ContactsWrapper, Message } from './Contacts.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';
import { fetchContacts } from 'redux/contacts/operation';
import { useContacts } from 'hooks/useContact';
import { UseAuth } from 'hooks/useAuth';

const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts } = useContacts();
  const { isLoggedIn } = UseAuth();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Section>
      <div>
        <ContactForm />
        <Filter />
      </div>
      <div>
        <Title>Contacts</Title>
        <ContactsWrapper>
          {contacts.length > 0 ? (
            <ContactsList />
          ) : (
            <Message>Add your first contact</Message>
          )}
        </ContactsWrapper>
      </div>
    </Section>
  );
};

export default Contacts;