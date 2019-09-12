import React from 'react';
import {shallow} from 'enzyme';
import {WeaponSlot} from '../components/weaponSlot';
import testData from './testCharacterData.json';

describe('<WeaponSlot />', () => {
  const dispatch = jest.fn();
  const charStats = testData;
  const newCharacter = {
    race:{
      standardRacialTraits:{
        base:{
          size:"medium"
  }}}}
  const weaponsList = [];
  
  it('Renders without crashing', () => {
    shallow(<WeaponSlot charStats={charStats} newCharacter={newCharacter}
      currentState={"empty"} weapon={weaponsList} dispatch={dispatch}/>);
  })
})