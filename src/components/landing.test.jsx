import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './landing';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const isLoggedIn = true;			/* ASK MICHAL - Setting this to false causes this test to fail 
  										with an error revolving around a <Link> without a <Router> 
  										Looking at the curriculum I notice that they skipped testing
  										after introducting the Redux-Router */

  ReactDOM.render(<Landing isLoggedIn={isLoggedIn}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});