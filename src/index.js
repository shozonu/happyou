import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Sidebar from './Sidebar';
import * as serviceWorker from './serviceWorker';

let sidebarObj = ReactDOM.render(<Sidebar />, document.getElementById('side'));
let appObj = ReactDOM.render(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
