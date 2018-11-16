import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './navBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const isLoggedIn = true;

  ReactDOM.render(
  	<NavBar isLoggedIn={isLoggedIn}/>, div
  	);
  ReactDOM.unmountComponentAtNode(div);
});