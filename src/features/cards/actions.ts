import { AppAction } from '../../app/store';
import { apiGetCards, apiUpdateCard, apiDeleteCard, apiSaveNewCard, CardSaveData } from '../../app/api';

import {
  addCard as addCardState,
  updateCard as updateCardState,
  deleteCard as deleteCardState,
  setCards as setCardsState,
} from './slice';

export const fetchCards = (): AppAction<Promise<void>> => (dispatch) => {
  return apiGetCards().then((cardsList) => {
    dispatch(setCardsState(cardsList));
  });
};

export const addCard =
  (data: CardSaveData): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiSaveNewCard(data).then((newCard) => {
      if (newCard) {
        dispatch(addCardState(newCard));
      }
    });
  };

export const updateCard =
  (id: string, data: CardSaveData): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiUpdateCard(id, data).then((newCard) => {
      if (newCard) {
        dispatch(updateCardState({ id: newCard.id, newCard: newCard }));
      }
    });
  };

export const deleteCard =
  (id: string): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiDeleteCard(id).then(() => {
      dispatch(deleteCardState(id));
    });
  };
