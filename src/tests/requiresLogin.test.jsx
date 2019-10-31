import React from 'react';
import {shallow} from 'enzyme';
import {RequiresLogin} from '../components/requiresLogin';

describe('<RequiresLogin />', () => {
  it('Renders without crashing', () => {
    shallow(<RequiresLogin />);
  });
})