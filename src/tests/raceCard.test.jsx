import React from 'react';
import {shallow} from 'enzyme';
import {RaceCard} from '../components/raceCard';

describe('<RaceCard />', () => {
  it('Renders without crashing', () => {
    shallow(<RaceCard />);
  });
})