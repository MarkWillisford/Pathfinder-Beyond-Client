import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterClass} from '../components/newCharacterClass';

describe('<NewCharacterClass />', () => {
  const dispatch = jest.fn();

  it('Renders without crashing', () => {
    shallow(<NewCharacterClass dispatch={dispatch}/>);
  });
})