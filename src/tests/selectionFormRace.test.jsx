import React from 'react';
import {shallow} from 'enzyme';
import {SelectionFormRace} from '../components/selectionFormRace';

describe('<SelectionFormRace />', () => {
  it('Renders without crashing', () => {
    shallow(<SelectionFormRace />);
  });
})