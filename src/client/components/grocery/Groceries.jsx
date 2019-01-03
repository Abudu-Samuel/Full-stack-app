import React, { Component, Fragment } from 'react';
import {
  func, shape, bool, array
} from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-md-spinner';
import GroceryItemList from './GroceryItemList';
import validator from '../../helpers/validation';
import * as groceryActions from '../../actions/groceryAction';

const propTypes = {
  groceries: shape({
    isFetching: bool.isRequired,
    isProcessing: bool.isRequired,
    groceries: array.isRequired
  }).isRequired,
  actions: shape({
    fetchAllGroceries: func.isRequired,
    addGrocery: func.isRequired,
    deleteGrocery: func.isRequired,
    purchaseOrDropGrocery: func.isRequired
  }).isRequired
};

class Groceries extends Component {
  state = {
    name: '',
    error: {}
  }

  actions = this.props.actions;

  componentDidMount() {
    this.actions.fetchAllGroceries();
  }

  handleChange = (event) => {
    event.persist();

    this.setState(prevState => ({
      ...prevState,
      name: event.target.value
    }));
  }

  handleFocus = (event) => {
    event.persist();
    this.setState(prevState => ({
      error: { ...prevState.error, [event.target.name]: '' }
    }));
  }

  isValid = (name) => {
    const { error, isValid } = validator(name);
    if (!isValid) {
      this.setState(() => ({
        error
      }));
    }
    return isValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name } = this.state;

    if (this.isValid(name)) {
      this.actions.addGrocery(name)
        .then(() => this.setState({ name: '', error: {} }));
    }
  }

  handleDelete = (id) => {
    this.actions.deleteGrocery(id);
  }

  handlePurchaseOrDrop = (id) => {
    this.actions.purchaseOrDropGrocery(id);
  }

  render() {
    const { groceries: { isFetching, isProcessing, groceries } } = this.props;

    const {
      name, error
    } = this.state;

    return (
      <Fragment>
        {isFetching
          ? (
            <div className="loader-container">
              <Loader size="35" className="loader-component" />
            </div>
          ) : (
            <Fragment>
              <div className="input-group mt-5 pl-0 container">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  autoComplete="off"
                  className="form-control"
                  placeholder="enter item name" />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    onClick={this.handleSubmit}
                    disabled={isProcessing}>
                    {isProcessing ? 'Adding...' : 'Add Item'}
                  </button>
                </div>
              </div>
              {error.name && <span className="field-error">{error.name}</span>}
              <GroceryItemList
                items={groceries}
                deleteItem={this.handleDelete}
                purchaseOrDropItem={this.handlePurchaseOrDrop} />
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ groceries }) => ({
  groceries
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(groceryActions, dispatch)
});

Groceries.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Groceries);
