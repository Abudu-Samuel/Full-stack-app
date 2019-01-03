import axios from 'axios';
import types from './actionTypes';

const isFetching = bool => ({
  type: types.IS_FETCHING,
  bool
});

const isProcessing = bool => ({
  type: types.IS_PROCESSING,
  bool
});

const fetchGroceriesSuccess = groceries => ({
  type: types.FETCH_GROCERIES_SUCCESS,
  groceries
});

const addGrocerySuccess = grocery => ({
  type: types.ADD_GROCERY_SUCCESS,
  grocery
});

const purchaseOrDropGrocerySuccess = payload => ({
  type: types.PURCHASE_OR_DROP_GROCERY_SUCCESS,
  payload
});

const deleteGrocerySuccess = id => ({
  type: types.DELETE_GROCERY_SUCCESS,
  id
});

const allRoundProcessError = error => ({
  type: types.ALL_ROUND_PROCESS_ERROR,
  error
});

export const fetchAllGroceries = () => (dispacth) => {
  dispacth(isFetching(true));
  return axios.get('/api/items')
    .then((response) => {
      dispacth(fetchGroceriesSuccess(response.data.payload));
      dispacth(isFetching(false));
    })
    .catch((error) => {
      dispacth(allRoundProcessError(error.response.data));
      dispacth(isFetching(false));
    });
};

export const addGrocery = name => (dispacth) => {
  dispacth(isProcessing(true));
  return axios.post('/api/items', { name })
    .then((response) => {
      dispacth(addGrocerySuccess(response.data.payload));
      dispacth(isProcessing(false));
    })
    .catch((error) => {
      dispacth(allRoundProcessError(error.response.data));
      dispacth(isProcessing(false));
    });
};

export const deleteGrocery = _id => (dispacth) => {
  dispacth(isProcessing(true));
  return axios.delete(`/api/item/${_id}`)
    .then((response) => {
      const { payload: { _id } } = response.data;
      dispacth(deleteGrocerySuccess(_id));
      dispacth(isProcessing(false));
    })
    .catch((error) => {
      dispacth(allRoundProcessError(error.response.data));
      dispacth(isProcessing(false));
    });
};

export const purchaseOrDropGrocery = _id => (dispacth) => {
  dispacth(isProcessing(true));
  return axios.put(`/api/item/${_id}`)
    .then((response) => {
      dispacth(purchaseOrDropGrocerySuccess(response.data.payload));
      dispacth(isProcessing(false));
    })
    .catch((error) => {
      dispacth(allRoundProcessError(error.response.data));
      dispacth(isProcessing(false));
    });
};