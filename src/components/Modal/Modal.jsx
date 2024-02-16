import { useDispatch, useSelector } from 'react-redux';
import { editContact } from 'redux/contacts/operation';
import { IoMdContacts } from 'react-icons/io';
import { selectIsLoading } from 'redux/contacts/selectors';
import Loader from '../Loader/Loader';
import {
  BtnClose,
  ModalWindow,
  Overlay,
  Form,
  Input,
  AddButton,
  Icon,
} from './Modal.styled';

const Modal = ({ contactInfo, toggleOpen }) => {
  const { name, number, id } = contactInfo;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target;
    const contact = { name: name.value, number: number.value, id };
    dispatch(editContact(contact));
    toggleOpen();
  };

  return (
    <Overlay>
      <ModalWindow>
        <Form onSubmit={handleSubmit}>
          <BtnClose onClick={toggleOpen}>
            <Icon size="30" />
          </BtnClose>
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад Адріан, Джейкоб Мерсер, Шарль де Бац де Кастельмор д'Артаньян"
            required
            placeholder="Name"
            defaultValue={name}
          />
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та починатися з +"
            required
            placeholder="Number"
            defaultValue={number}
          />
          <AddButton type="submit">
            <span>Edit contacts </span>{' '}
            {isLoading ? <Loader /> : <IoMdContacts size="25" />}
          </AddButton>
        </Form>
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
