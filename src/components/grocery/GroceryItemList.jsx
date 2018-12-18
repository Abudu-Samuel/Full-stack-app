import React from 'react';
import { array } from 'prop-types';
import GroceryItem from './GroceryItem';

const propTypes = {
  items: array.isRequired
};

const GroceryItemList = ({ items }) => (
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
                <GroceryItem key={item.id} item={item} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

GroceryItemList.propTypes = propTypes;

export default GroceryItemList;