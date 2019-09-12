import React from 'react';
import {shallow} from 'enzyme';
import {RegistrationPage} from '../components/registrationPage';

describe('<RegistrationPage />', () => {
  it('Renders without crashing', () => {
    shallow(<RegistrationPage />);
  });
})