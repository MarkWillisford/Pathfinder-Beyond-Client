import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacter} from '../components/newCharacter';

describe('<NewCharacter />', () => {
  it('Renders without crashing', () => {
    shallow(<NewCharacter />);
  });
})