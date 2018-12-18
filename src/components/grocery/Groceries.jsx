import React, { Component, Fragment } from 'react';
import GroceryItemList from './GroceryItemList';

class Groceries extends Component {
  groceryList = [
    { id: 1, name: 'Lettuce', purchaseStatus: false },
    { id: 2, name: 'Apples', purchaseStatus: true },
    { id: 3, name: 'Nuggets', purchaseStatus: false }
  ]

  render() {
    return (
      <Fragment>
        <GroceryItemList items={this.groceryList} />
      </Fragment>
    );
  }
}

export default Groceries;
