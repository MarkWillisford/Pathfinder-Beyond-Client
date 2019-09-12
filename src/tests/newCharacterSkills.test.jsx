import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterSkills} from '../components/newCharacterSkills';
import testData from './testCharacterData.json';

describe('<NewCharacterSkills />', () => {
  const charStats = testData;

  it('Renders without crashing', () => {
    shallow(<NewCharacterSkills charStats={charStats}/>);
  });
})