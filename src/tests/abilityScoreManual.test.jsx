import React from 'react';
import {AbilityScoreManual} from '../components/abilityScoreManual';
import {shallow} from 'enzyme';

describe('<AbilityScoreManual />', () => {
  it('Renders without crashing', () => {
    shallow(<AbilityScoreManual />);
  })
})