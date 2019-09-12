import React from 'react';
import {shallow} from 'enzyme';
import {Dashboard} from '../components/dashboard';

describe('<Dashboard />', () => {
  const characters = [];
  const dispatch = jest.fn();

  it('Renders without crashing', () => {
    shallow(<Dashboard characters={characters} dispatch={dispatch}/>);
  });
})