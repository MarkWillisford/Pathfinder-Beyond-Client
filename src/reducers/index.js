const initialState = {
  user:"Me",
  isLoggedIn:true,
  chars:[{
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
  }],
};

export const reducer = (state=initialState, action) => {
    return state;
};