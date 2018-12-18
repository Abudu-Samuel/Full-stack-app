import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import '../public/style.css';

ReactDOM.render(<Routes />, document.getElementById('root'));

if (module.hot) module.hot.accept();