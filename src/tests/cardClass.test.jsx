import React from 'react';
import {shallow} from 'enzyme';
import CardClass from '../components/cardClass';

describe('<CardClass />', () => {
  it('Renders without crashing', () => {
    shallow(<CardClass name={"testName"}/>);
  });
})