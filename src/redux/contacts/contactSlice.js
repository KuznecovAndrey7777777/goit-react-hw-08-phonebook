import { createSlice } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from './operation';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    error: null,
    isLoading: false,
    sortedAlphabetic: true,
    recentlyAdded: true,
  },
  reducers: {
    sortByName(state) {
      state.contacts = state.contacts.sort((firstContact, secondContact) =>
        state.sortedAlphabetic
          ? firstContact.name.localeCompare(secondContact.name)
          : secondContact.name.localeCompare(firstContact.name)
      );
      state.sortedAlphabetic = !state.sortedAlphabetic;
    },
    sortByAdded(state) {
      state.contacts = state.contacts.sort((firstContact, secondContact) =>
        state.recentlyAdded
          ? firstContact.id.localeCompare(secondContact.id)
          : secondContact.id.localeCompare(firstContact.id)
      );
      state.recentlyAdded = !state.recentlyAdded;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(addContact.pending, handlePending)
      .addCase(deleteContact.pending, handlePending)
      .addCase(editContact.pending, (state, action) => {
        state.isLoading = true;
        state.shouldOpenModal = true;
      })

      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.rejected, handleRejected)

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload);
        state.isLoading = false;
        state.error = null;
        Notiflix.Notify.success(
          `${action.payload.name} успішно додано до вашої телефонної книги`
        );
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
        Notiflix.Notify.success(
          `${action.payload.name} було успішно видалено з вашої телефонної книги`
        );
      })

      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.contacts[index] = action.payload;
      });
  },
});

export default contactsSlice.reducer;
export const { sortByName, sortByAdded, toggleShowFavourites } =
  contactsSlice.actions;
