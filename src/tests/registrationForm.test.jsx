import React from 'react';
import {shallow} from 'enzyme';
import {RegistrationForm} from '../components/registrationForm';

describe('<RegistrationForm />', () => {
  const handleSubmit = jest.fn();

  it('Renders without crashing', () => {
    shallow(<RegistrationForm handleSubmit={handleSubmit}/>);
  });
})