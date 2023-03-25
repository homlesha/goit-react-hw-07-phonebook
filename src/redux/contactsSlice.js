import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    filterContact(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const itemIndex = state.contacts.items.findIndex(
          contact => contact.id === action.payload
        );
        state.contacts.items.splice(itemIndex, 1);
      })

      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

// extraReducers: {
//   [fetchContacts.pending](state) {
//     state.isLoading = true;
//   },
//   [fetchContacts.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.contacts.items = action.payload;
//   },
//   [fetchContacts.rejected](state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//   [addContact.pending](state) {
//     state.isLoading = true;
//   },
//   [addContact.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.contacts.items.push(action.payload);
//   },
//   [addContact.rejected](state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//   [deleteContact.pending](state) {
//     state.isLoading = true;
//   },
//   [deleteContact.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     const itemIndex = state.contacts.items.findIndex(
//       contact => contact.id === action.payload
//     );
//     state.contacts.items.splice(itemIndex, 1);
//   },
//   [deleteContact.rejected](state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
// },
// });

export const { filterContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
