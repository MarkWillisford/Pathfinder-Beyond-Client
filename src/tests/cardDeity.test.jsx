import React from 'react';
import {shallow} from 'enzyme';
import {CardDeity} from '../components/cardDeity';

describe('<CardDeity />', () => {
  it('Renders without crashing', () => {
    shallow(<CardDeity />);
  });
})