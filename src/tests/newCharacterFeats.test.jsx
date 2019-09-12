import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterFeats} from '../components/newCharacterFeats';

describe('<NewCharacterFeats />', () => {
  const dispatch = jest.fn();

  it('Renders without crashing', () => {
    shallow(<NewCharacterFeats featsList={[]} dispatch={dispatch}/>);
  });
})