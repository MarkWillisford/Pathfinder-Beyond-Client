import React from 'react';
import {shallow} from 'enzyme';
import {Prev} from '../components/prev';

describe('<Prev />', () => {
  it('Renders without crashing', () => {
    shallow(<Prev />);
  });
})