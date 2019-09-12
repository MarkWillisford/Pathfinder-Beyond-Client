import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterPreferencesForm} from '../components/newCharacterPreferences';

describe('<NewCharacterPreferencesForm />', () => {
  it('Renders without crashing', () => {
    shallow(<NewCharacterPreferencesForm />);
  });
})