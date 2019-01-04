export default {
  emptyFetchResponse: {
    message: 'Item not currently available',
    payload: []
  },
  internalServerError: {
    message: 'Internal server error'
  },
  addItemSuccessResponse: {
    message: 'Grocery successfully added',
    payload: {
      purchaseStatus: false,
      _id: '5c18ea26392d9682320b7a88',
      name: 'apple',
      createdAt: '2019-01-18T12:37:58.658Z',
      updatedAt: '2019-01-18T12:37:58.658Z',
      __v: 0
    }
  },
  addItemErrorResponse: {
    message: 'You already have apple in your list'
  },
  deleteItemSuccessResponse: {
    message: 'apple has been deleted',
    payload: {
      id: '5c18d691a8b2267c8d2b19dd'
    }
  },
  notFoundErrorResponse: {
    message: 'Item not found'
  },
  purchaseOrDropSuccessResponse: {
    message: 'apple has been purchased',
    payload: {
      purchaseStatus: true,
      id: '5c18ea26392d9682320b7a88',
      name: 'apple',
      createdAt: '2019-01-18T12:37:58.658Z',
      updatedAt: '2019-01-18T13:11:26.917Z',
      __v: 0
    }
  }
};