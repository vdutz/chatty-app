// Application entrypoint.

// Loads up the application styles
require("../styles/application.scss");

// Renders the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('react-root'));


