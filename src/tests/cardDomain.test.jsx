import React from 'react';
import {shallow} from 'enzyme';
import {CardDomain} from '../components/CardDomain';

describe('<CardDomain />', () => {
  it('Renders without crashing', () => {
    shallow(<CardDomain name={"testName"}/>);
  });
})