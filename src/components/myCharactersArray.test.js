import React from 'react';
import ReactDOM from 'react-dom';
import MyCharactersArray from './myCharactersArray';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const chars = [{
  	thum:{
  		src:"lizard.gif",
  		alt:"Slick's Image",
  	},
  	name:"Slick",
  	level:18,
  	race:"Lizardfolk",
  	class:"Fighter",
  },{
    thum:{
      src:"Elf.gif",
      alt:"Syren's Image",
    },
    name:"Syren",
    level:16,
    race:"Elf",
    class:"Ranger",
  }]
  ReactDOM.render(<MyCharactersArray characters={chars}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
