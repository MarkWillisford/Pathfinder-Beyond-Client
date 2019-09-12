import React from 'react';
import {shallow} from 'enzyme';
import {EquipmentGold} from '../components/equipment_Gold';

describe('<EquipmentGold />', () => {
  it('Renders without crashing', () => {
    shallow(<EquipmentGold />);
  });
})