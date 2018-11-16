import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './landing';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const isLoggedIn = false;

  ReactDOM.render(<Landing isLoggedIn={isLoggedIn}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
