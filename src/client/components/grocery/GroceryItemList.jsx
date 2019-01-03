import React from 'react';
import { array, func } from 'prop-types';
import GroceryItem from './GroceryItem';

const propTypes = {
  items: array.isRequired,
  deleteItem: func.isRequired,
  purchaseOrDropItem: func.isRequired
};

const renderItemsNotFound = () => (
  <div className="no-items central">
    <i className="fa fa-exclamation-triangle fa-3x pb-3 d-block" />
    <p className="lead">There are currently no items in the store</p>
  </div>
);

const renderItemsFound = (items, deleteItem, purchaseOrDropItem) => (
  <div className="card container mt-5">
    <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Grocery List</h3>
    <div className="card-body">
      <div id="table" className="table-editable">
        <table className="table table-bordered table-responsive-md table-striped text-center">
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(item => (
                <GroceryItem
                  key={item._id}
                  item={item}

                  deleteItem={deleteItem}
                  purchaseOrDropItem={purchaseOrDropItem} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const GroceryItemList = ({
  items, deleteItem, purchaseOrDropItem
}) => {
  if (items.length === 0) {
    return renderItemsNotFound();
  }
  return renderItemsFound(items, deleteItem, purchaseOrDropItem);
};

GroceryItemList.propTypes = propTypes;

export default GroceryItemList;