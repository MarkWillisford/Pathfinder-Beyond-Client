import React from 'react';
import {shallow} from 'enzyme';
import {NewCharacterNavLinks} from '../components/newCharacterNavLinks';

describe('<NewCharacterNavLinks />', () => {
  const creationSteps = [
    {name:"Character Basics",
    id:0,
    complete:false},
    {name:"Race",
    id:1,
    complete:false},          
    {name:"Class",
    id:2,
    complete:false},
    {name:"Ability Scores",
    id:3,
    complete:false},
    {name:"Details",
    id:4,
    complete:false},
    {name:"Skills",
    id:5,
    url:"",
    completedUrl:"",
    complete:false},
    {name:"Feats",
    id:6,
    url:"",
    completedUrl:"",
    complete:false},
    {name:"Equipment",
    id:7,
    url:"",
    completedUrl:"",
    complete:false},
  ];

  it('Renders without crashing', () => {
    shallow(<NewCharacterNavLinks creationSteps={creationSteps}/>);
  });
})