import React from 'react';
import {shallow} from 'enzyme';
import {LandingPage} from '../components/landingPage';

describe('<LandingPage />', () => {
  const dispatch = jest.fn();

  it('Renders without crashing', () => {
    shallow(<LandingPage dispatch={dispatch}/>);
  });
})