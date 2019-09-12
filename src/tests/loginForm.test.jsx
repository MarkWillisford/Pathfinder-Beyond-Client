import React from 'react';
import {shallow} from 'enzyme';
import {LoginForm} from '../components/loginForm';

describe('<LoginForm />', () => {
  const handleSubmit = jest.fn();

  it('Renders without crashing', () => {
    shallow(<LoginForm handleSubmit={handleSubmit}/>);
  });
})