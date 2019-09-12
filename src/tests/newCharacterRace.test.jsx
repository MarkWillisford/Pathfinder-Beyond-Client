import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterRace} from '../components/newCharacterRace';

describe('<NewCharacterRace />', () => {
  const dispatch = jest.fn();

  it('Renders without crashing', () => {
    shallow(<NewCharacterRace dispatch={dispatch}/>);
  });
})