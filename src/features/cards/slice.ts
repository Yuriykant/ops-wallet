import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsAPI } from './types';

import { apiSaveNewCard, CardSaveData } from '../../app/api';

interface InitialState {
  list: CardsAPI[];
}

const initialState: InitialState = {
  list: [],
};

export const addCardApi = createAsyncThunk('api/addCard', async (data: CardSaveData) => {
  return apiSaveNewCard(data);
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardsAPI>) => {
      state.list.unshift(action.payload);
    },
    updateCard: (state, action: PayloadAction<{ id: CardsAPI['id']; newCard: CardsAPI }>) => {
      const id = action.payload.id;
      const newCard = action.payload.newCard;
      state.list = state.list.map((item) => {
        if (item.id === id) {
          return newCard;
        }
        return item;
      });
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    setCards: (state, action: PayloadAction<CardsAPI[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCardApi.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.list.unshift(action.payload);
      }
    });
  },
});

export const { addCard, updateCard, deleteCard, setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
