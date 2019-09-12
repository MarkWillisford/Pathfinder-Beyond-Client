import React from 'react';
import {AbilityScoreDice} from '../components/abilityScoreDice';
import {shallow} from 'enzyme';

describe('<AbilityScoreDice />', () => {
  it('Renders without crashing', () => {
    shallow(<AbilityScoreDice />);
  });
})