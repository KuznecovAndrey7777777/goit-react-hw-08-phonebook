import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { deleteContact } from 'redux/contacts/operation';
import {
  List,
  ListItem,
  Btn,
  BtnWrapper,
  LoaderStyled,
} from './ContactsList.styled';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import Modal from '../Modal/Modal';
import SortedBtns from '../SortedBtns/SortedBtns';
import Loader from '../Loader/Loader';
import { useContacts } from 'hooks/useContact';

const ContactList = () => {
  const dispatch = useDispatch();
  const { visibleContacts } = useContacts();
  const { isLoading } = useContacts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetContact, setTargetContact] = useState({});

  const toggleOpen = () => setIsModalOpen(!isModalOpen);

  const handleClick = e => {
    const id = e.currentTarget.parentNode.parentNode.dataset.id;
    const targetContact = visibleContacts.find(contact => contact.id === id);
    setTargetContact(targetContact);
    toggleOpen();
  };

  const handleDelete = id => {
    Confirm.show(
      'Видалення контакту',
      'Хочете видалити цей контакт?',
      'Yes',
      'No',
      () => {
        dispatch(deleteContact(id));
      }
    );
  };

  return (
    <>
      <SortedBtns />
      {isLoading ? (
        <LoaderStyled>
          {' '}
          <Loader color={'#0fc1dd'} size={'50'} />
        </LoaderStyled>
      ) : (
        <List>
          {visibleContacts.map(({ name, number, id }) => {
            return (
              <ListItem data-id={id} key={id}>
                {name}: {number}
                <BtnWrapper>
                  <Btn type="button" onClick={handleClick}>
                    <MdOutlineModeEdit size="20" />
                  </Btn>
                  <Btn delete type="button" onClick={() => handleDelete(id)}>
                    {isLoading ? (
                      <Loader color={'#ffffff'} size={'20'} />
                    ) : (
                      <IoMdCloseCircleOutline size="20" />
                    )}
                  </Btn>
                </BtnWrapper>
                {isModalOpen && (
                  <Modal toggleOpen={toggleOpen} contactInfo={targetContact} />
                )}
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default ContactList;
