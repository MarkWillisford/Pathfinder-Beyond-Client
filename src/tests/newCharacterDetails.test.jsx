import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterDetails} from '../components/newCharacterDetails';

describe('<NewCharacterDetails />', () => {
  it('Renders without crashing', () => {
    shallow(<NewCharacterDetails />);
  });
})