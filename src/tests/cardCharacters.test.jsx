import React from 'react';
import {shallow} from 'enzyme';
import CardCharacters from '../components/cardCharacters';

describe('<CardCharacters />', () => {
  it('Renders without crashing', () => {
    shallow(<CardCharacters />);
  });
})