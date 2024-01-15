import { AppAction } from '../../app/store';
import {
  apiDeleteOperation,
  apiGetOperations,
  apiSaveNewOperation,
  apiUpdateOperation,
  OperationSaveData,
} from '../../app/api';

import {
  addOperation as addOperationState,
  updateOperation as updateOperationState,
  deleteOperation as deleteOperationState,
  setOperations as setOperationsState,
} from './slice';

export const fetchOperaions = (): AppAction<Promise<void>> => (dispatch) => {
  return apiGetOperations().then((operations) => {
    dispatch(setOperationsState(operations));
  });
};

export const addOperation =
  (data: OperationSaveData): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiSaveNewOperation(data).then((operaion) => {
      if (operaion) {
        dispatch(addOperationState(operaion));
      }
    });
  };

export const updateOperation =
  (id: string, data: OperationSaveData): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiUpdateOperation(id, data).then((operaion) => {
      if (operaion) {
        dispatch(updateOperationState({ id: operaion.id, newOperation: operaion }));
      }
    });
  };

export const deleteOperation =
  (id: string): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiDeleteOperation(id).then(() => {
      dispatch(deleteOperationState(id));
    });
  };
