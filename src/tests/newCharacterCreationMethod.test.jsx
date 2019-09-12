import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterCreationMethod} from '../components/newCharacterCreationMethod';

describe('<NewCharacterCreationMethod />', () => {
  it('Renders without crashing', () => {
    shallow(<NewCharacterCreationMethod />);
  });
})