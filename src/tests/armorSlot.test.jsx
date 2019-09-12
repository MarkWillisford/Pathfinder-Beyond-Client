import React from 'react';
import {shallow} from 'enzyme';
import {ArmorSlot} from '../components/armorSlot';
import testData from './testCharacterData.json';

describe('<ArmorSlot />', () => {
  const dispatch = jest.fn();
  const charStats = testData;
  const newCharacter = {
    race:{
      standardRacialTraits:{
        base:{
          size:"medium"
  }}}}
  const armorList = [{
    id: '5cdb4f269930571ac033401e',
    name: 'Leather',
    expand: false,
    description: '',
    use: 'light armor',
    cost: 10,
    bonus: {
      armor: 2
    },
    maxDexBonus: 6,
    armorCheckPenalty: 0,
    arcaneSpellFailureChance: 10,
    speed: {
      '20': 20,
      '30': 30
    },
    weight: 15,
    material: null,
    masterwork: false
  }]
  
  it('Renders without crashing', () => {
    shallow(<ArmorSlot charStats={charStats} newCharacter={newCharacter}
      currentState={"empty"} armor={armorList} dispatch={dispatch}/>);
  })
})