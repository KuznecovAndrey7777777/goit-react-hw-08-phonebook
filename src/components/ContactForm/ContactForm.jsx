import { useDispatch } from 'react-redux';
import { Input, AddButton, Form, Title } from './ContactForm.styled';
import { IoMdContacts } from 'react-icons/io';
import Notiflix from 'notiflix';
import Loader from '../Loader/Loader';
import { addContact } from 'redux/contacts/operation';
import { useContacts } from 'hooks/useContact';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { contacts } = useContacts();
  const { isLoading } = useContacts();

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target;
    const contact = { name: name.value, number: number.value };
    if (contacts.find(existingContact => existingContact.name === name.value)) {
      Notiflix.Notify.failure(`${contact.name} вже у ваших контактах`);
    } else {
      dispatch(addContact(contact));
    }
    e.target.reset();
  };

  return (
    <>
      <Title>Phonebook</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад Адріан, Джейкоб Мерсер, Шарль де Бац де Кастельмор д'Артаньян"
          required
          placeholder="Name"
        />
        <Input
          type="tel"
          name="number"
          title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та починатися з +"
          required
          placeholder="Number"
        />
        <AddButton type="submit">
          <span>Add contacts </span>
          {isLoading ? (
            <Loader color={'#ffffff'} size={'20'} />
          ) : (
            <IoMdContacts size="20" />
          )}
        </AddButton>
      </Form>
    </>
  );
};

export default ContactForm;
