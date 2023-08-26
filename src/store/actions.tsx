import { useState } from "react";
import { CardsAPI, OperationAPI } from "../types";

export const useCards = () => {
  const [cards, setCards] = useState<CardsAPI[]>([]);

  return { cards, setCards };
};

export const useOperations = () => {
  const [operations, setOperations] = useState<OperationAPI[]>([]);

  return { operations, setOperations };
};

export const useAppStore = () => {
  const cardsStore = useCards();
  const operationsStore = useOperations();
  return {
    ...cardsStore,
    ...operationsStore
  }
}
