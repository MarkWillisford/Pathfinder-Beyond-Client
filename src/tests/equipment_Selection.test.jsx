import React from 'react';
import {shallow} from 'enzyme';
import {Equipment_Selection} from '../components/equipment_Selection';

describe('<Equipment_Selection />', () => {
  const dispatch = jest.fn();

  it('Renders without crashing', () => {
    shallow(<Equipment_Selection dispatch={dispatch}/>);
  });
})