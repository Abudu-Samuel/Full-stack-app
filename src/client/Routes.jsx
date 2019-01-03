import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/common/Header';
import NotFoundPage from './components/common/NotFoundPage';
import Groceries from './components/grocery/Groceries';

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <div>
        <Header />
      </div>
      <Switch>
        <Route exact path="/" component={Groceries} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;