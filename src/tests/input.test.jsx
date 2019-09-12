import React from 'react';
import {shallow} from 'enzyme';
import Input from '../components/input';

describe('<Input />', () => {
  const meta = {
    "touched":false,
    "error":false
  };
  const input = {
    "name":"testName"
  };
  
  it('Renders without crashing', () => {
    shallow(<Input meta={meta} input={input}/>);
  });
})