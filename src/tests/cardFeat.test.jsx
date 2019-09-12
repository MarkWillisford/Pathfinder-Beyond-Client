import React from 'react';
import {shallow} from 'enzyme';
import {CardFeat} from '../components/cardFeat';

describe('<CardFeat />', () => {
  const featSlots = [
    {
      type: 'any',
      selection: null
    }
  ]

  it('Renders without crashing', () => {
    shallow(<CardFeat feats={featSlots} name={"testName"}/>);
  });
})