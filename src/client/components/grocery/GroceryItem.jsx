import React from 'react';
import {
  shape, string, bool, func, number
} from 'prop-types';

const propTypes = {
  item: shape({
    name: string.isRequired,
    purchaseStatus: bool.isRequired
  }).isRequired,
  deleteItem: func.isRequired,
  purchaseOrDropItem: func.isRequired
};

const GroceryItem = ({
  item: { _id, name, purchaseStatus }, deleteItem, purchaseOrDropItem
}) => {
  let wrapperClass = 'list-unstyled';
  if (purchaseStatus) {
    wrapperClass += ' strike-through';
  }

  return (
    <tr>
      <td className={wrapperClass}>{name}</td>
      <td>
        <span className="table-remove">
          <button
            type="button"
            className={`btn btn-sm ${purchaseStatus ? 'btn-outline-primary' : 'btn-primary'}`}
            onClick={() => purchaseOrDropItem(_id)}>
            {purchaseStatus ? 'Unbuy' : 'Buy'}
          </button>
        </span>
      </td>
      <td>
        <span className="table-remove">
          <button
            type="button"
            className="btn btn-danger btn-rounded btn-sm my-0"
            onClick={() => deleteItem(_id)}>
            Remove
          </button>
        </span>
      </td>
    </tr>
  );
};

GroceryItem.propTypes = propTypes;

export default GroceryItem;