import React from 'react';
import { shape, string, bool } from 'prop-types';

const propTypes = {
  item: shape({
    name: string.isRequired,
    purchaseStatus: bool.isRequired
  }).isRequired
};

const GroceryItem = ({ item: { name, purchaseStatus } }) => {
  let wrapperClass = 'list-unstyled';
  if (purchaseStatus) {
    wrapperClass += ' strike-through';
  }

  return (
    <tr>
      <td className={wrapperClass}>{name}</td>
      <td>
        <span className="table-remove"><button type="button" className="btn btn-primary btn-rounded btn-sm my-0">Buy</button></span>
      </td>
      <td>
        <span className="table-remove"><button type="button" className="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>
      </td>
    </tr>
  );
};

GroceryItem.propTypes = propTypes;

export default GroceryItem;