import reducer from '../../reducers/groceryReducer';
import types from '../../actions/actionTypes';

describe('grocery reducer', () => {
  const initialState = {
    groceries: [],
    isFetching: false,
    isProcessing: false
  };

  describe('Initial state', () => {
    it('should return the initial state of the app', (done) => {
      expect(reducer(undefined, {})).toEqual(initialState);
      done();
    });
  });

  it('should set loader to true when groceries are loading', (done) => {
    const action = {
      type: types.IS_FETCHING,
      bool: true
    };

    const loadedState = reducer(initialState, action);
    expect(loadedState.isFetching).toEqual(true);
    expect(loadedState.groceries).toEqual([]);
    expect(loadedState.isProcessing).toEqual(false);
    done();
  });

  it('should set processing loader to true when groceries are being saved', (done) => {
    const action = {
      type: types.IS_PROCESSING,
      bool: true
    };

    const loadedState = reducer(initialState, action);
    expect(loadedState.isProcessing).toEqual(true);
    expect(loadedState.groceries).toEqual([]);
    expect(loadedState.isFetching).toEqual(false);
    done();
  });

  it('should set goceries store to empty array when passed FETCH_GROCERIES_SUCCESS',
    (done) => {
      const action = {
        type: types.FETCH_GROCERIES_SUCCESS,
        groceries: []
      };

      const loadedState = reducer(initialState, action);
      expect(loadedState.isFetching).toEqual(false);
      expect(loadedState.groceries).toEqual([]);
      expect(loadedState.isProcessing).toEqual(false);
      done();
    });

  it('should set goceries to array containing item(s) when passed ADD_GROCERY_SUCCESS',
    (done) => {
      const action = {
        type: types.ADD_GROCERY_SUCCESS,
        grocery: {}
      };

      const loadedState = reducer(initialState, action);
      expect(loadedState.isFetching).toEqual(false);
      expect(loadedState.groceries).toEqual([{}]);
      expect(loadedState.groceries).toHaveLength(1);
      expect(loadedState.isProcessing).toEqual(false);
      done();
    });

  it('should set goceries to an empty array when passed DELETE_GROCERY_SUCCESS',
    (done) => {
      const action = {
        type: types.DELETE_GROCERY_SUCCESS,
        id: 'groceryId'
      };

      const loadedState = { ...initialState, groceries: [{ name: 'bakedBeans', _id: 'groceryId' }] };

      const state = reducer(loadedState, action);
      expect(state.isFetching).toEqual(false);
      expect(state.groceries).toEqual([]);
      expect(state.groceries).toHaveLength(0);
      expect(state.isProcessing).toEqual(false);
      done();
    });

  it('should set goceries to an empty array when passed PURCHASE_OR_DROP_GROCERY_SUCCESS',
    (done) => {
      const action = {
        type: types.PURCHASE_OR_DROP_GROCERY_SUCCESS,
        payload: { _id: 'groceryId', purchaseStatus: true }
      };

      const loadedState = {
        ...initialState,
        groceries: [
          { name: 'sugarCane', _id: 'theFirstGroceryId', purchaseStatus: true },
          { name: 'sugarCane', _id: 'groceryId', purchaseStatus: false }
        ]
      };

      const state = reducer(loadedState, action);
      expect(state.isFetching).toEqual(false);
      expect(state.groceries).toHaveLength(2);
      expect(state.groceries[0].purchaseStatus).toEqual(true);
      expect(state.groceries[1].purchaseStatus).toEqual(true);
      expect(state.isProcessing).toEqual(false);
      done();
    });
});