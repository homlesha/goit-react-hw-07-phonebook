import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import {
  ContactList,
  ContactItem,
  ContactText,
  ContactLink,
  ContactButton,
} from './ContactsList.styled';

export const ContactsList = () => {
  const { contacts, filter } = useSelector(state => state);
  const dispatch = useDispatch();

  const getContacts = () => {
    const normilizedFilter = filter.toLowerCase().trim();
    return contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };
  const filterName = getContacts();

  useEffect(() => {
    dispatch(fetchContacts())
  },[dispatch]);

  return (
    <ContactList>
      {filterName.map(({ id, name, phone }) => (
        <ContactItem key={id}>
          <ContactText>{name}:</ContactText>
          <ContactLink href="/">{phone}</ContactLink>
          <ContactButton
            type="button"
            onClick={() => {
              dispatch(deleteContact(id));
            }}
          >
            Delete
          </ContactButton>
        </ContactItem>
      ))}
    </ContactList>
  );
};

export default ContactsList;
