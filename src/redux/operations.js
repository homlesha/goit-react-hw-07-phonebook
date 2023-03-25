import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL = 'https://641ca80a1a68dc9e460ed33c.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({name, phone}, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', {
        name: name,
        phone: phone,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
      try {
     await axios.delete(`/contacts/${contactId}`);
        return contactId;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    },
    {
		condition: (_, { getState }) => {
			const isLoading = getState().isLoading
			if (isLoading) {
				return false
			}
		},
	}
  );
