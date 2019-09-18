import React from 'react';
import {shallow} from 'enzyme';
import {CardDomain} from '../components/cardDomain';

describe('<CardDomain />', () => {
  it('Renders without crashing', () => {
    shallow(<CardDomain name={"testName"}/>);
  });
})