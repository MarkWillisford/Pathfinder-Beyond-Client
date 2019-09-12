import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterAbilityScores} from '../components/newCharacterAbilityScores';
import testData from './testCharacterData.json';

describe('<NewCharacterAbilityScores />', () => {
  const charStats = testData;
  const tempAbilityScores = [];

  it('Renders without crashing', () => {
    shallow(<NewCharacterAbilityScores charStats={charStats} tempAbilityScores={tempAbilityScores}/>);
  });
})