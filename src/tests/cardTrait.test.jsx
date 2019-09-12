import React from 'react';
import {shallow} from 'enzyme';
import {CardTrait} from '../components/cardTrait';

describe('<CardTrait />', () => {
  const traitSlots = [
    {
      type: 'any',
      selection: null
    }
  ]
  it('Renders without crashing', () => {
    shallow(<CardTrait traits={traitSlots} name={"testName"}/>);
  });
})