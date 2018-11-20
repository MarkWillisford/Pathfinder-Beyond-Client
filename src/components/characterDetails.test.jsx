import React from 'react';
import ReactDOM from 'react-dom';
import CharacterDetails from './characterDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const char = {
  	thum:{
  		src:"lizard.gif",
  		alt:"Slick's Image",
  	},
  	name:"Slick",
  	level:18,
  	race:"Lizardfolk",
  	class:"Fighter",
  }

  ReactDOM.render(<CharacterDetails character={char}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
