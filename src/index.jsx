import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './Components/App.jsx';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<App />);