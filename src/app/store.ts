import { configureStore, ThunkDispatch, ThunkAction, PayloadAction, Action } from '@reduxjs/toolkit';

import cardsReducer from '../features/cards/slice';
import operationsReducer from '../features/operations/slice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    operations: operationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
export type AppAction<R> = ThunkAction<R, RootState, unknown, Action<string>>;
