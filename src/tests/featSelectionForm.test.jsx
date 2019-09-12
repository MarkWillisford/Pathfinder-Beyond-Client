import React from 'react';
import {shallow} from 'enzyme';
import {FeatSelectionsForm} from '../components/featSelectionsForm';

describe('<FeatSelectionsForm />', () => {
  it('Renders without crashing', () => {
    shallow(<FeatSelectionsForm />);
  });
})