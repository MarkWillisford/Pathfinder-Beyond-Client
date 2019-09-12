import React from 'react';
import {shallow} from 'enzyme';
import {Next} from '../components/next';

describe('<Next />', () => {
  it('Renders without crashing', () => {
    shallow(<Next />);
  });
})