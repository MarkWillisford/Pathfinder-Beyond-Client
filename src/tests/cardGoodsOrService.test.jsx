import React from 'react';
import {shallow} from 'enzyme';
import {CardGoodsOrServices} from '../components/cardGoodsOrService';

describe('<CardGoodsOrServices />', () => {
  it('Renders without crashing', () => {
    shallow(<CardGoodsOrServices />);
  });
})