export type OperationType = 'income' | 'expense';

export interface OperationAPI {
  id: string;
  name: string;
  value: number;
  type: OperationType;
  cardNumber: string;
  created: string;
}
