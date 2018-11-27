import * as actions from '../actions';

const initialState = {
  user:"Me",
  isLoggedIn:true,
  chars:[{
    pic:{      src:"lizardPic.gif",      alt:"Slick's Pic",    },
  	thum:{  		src:"lizardThum.gif",  		alt:"Slick's Thum",  	},
  	name:"Slick",
  	level:18,
  	race:"Lizardfolk",
  	class:"Fighter",
    bio:"Slick explored Blackrock Mountain before entering the Dark Tower",
    background:"Raised in the cliff cities, Slick learned to fight",
    stats:{
      abilityScores:{
        strength:18,
        dexterity:16,
        constitution:18,
        intelligence:10,
        wisdom:12,
        charisma:10,
      },
      maxHitPoints:300,
      armorClass:28,
    },
  },{    
    pic:{      src:"ElfPic.gif",      alt:"Syren's Pic",    },
    thum:{      src:"Elf.gif",      alt:"Syren's Image",    },
    name:"Syren",
    level:16,
    race:"Elf",
    class:"Ranger",
    bio:"After helping the Cloud Giants, Syren has had many little adventures",
    background:"Born a Princess",
    stats:{
      abilityScores:{
        strength:14,
        dexterity:18,
        constitution:14,
        intelligence:12,
        wisdom:16,
        charisma:14,
      },
      maxHitPoints:150,
      armorClass:22,
    },
  }],
};

export const reducer = (state=initialState, action) => {
    if (action.type === actions.LOAD_CHARACTER) {
      return Object.assign({}, state, {
        char:action.char,
      });
    } else if (action.type === actions.LOAD_CREATION_STEPS){
      return Object.assign({}, state, {
        creationSteps:[
          {name:"Character Basics",
          id:0,
          url:"",
          completedUrl:"",
          complete:false},
          {name:"Race",
          id:1,
          url:"",
          completedUrl:"",
          complete:false},
          {name:"Class",
          id:2,
          url:"",
          completedUrl:"",
          complete:false},
          {name:"Ability Scores",
          id:3,
          url:"",
          completedUrl:"",
          complete:false},
          {name:"Details",
          id:4,
          url:"",
          completedUrl:"",
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
        ],
        currentStep:1,
        disabledNext: false,
        disabledPrev: false,
      });
    } else if (action.type === actions.DECREMENT_CURRENT_STEP){
      if(state.currentStep !== 0){
        const newCurrentStep = state.currentStep-1;
        return Object.assign({}, state, {
          currentStep:newCurrentStep,
        })
      } else {
        return state;
      } 
    } else if (action.type === actions.INCREMENT_CURRENT_STEP){
      if(state.currentStep !== 7){
        const newCurrentStep = state.currentStep+1;
        return Object.assign({}, state, {
          currentStep:newCurrentStep,
        })
      } else {
        return state;
      } 
    } else if (action.type === actions.TOGGLE_STEP){
      console.log("in reducer - toggleStep");
      return Object.assign({}, state, {
        currentStep:action.index,
        disabledNext: action.disabledNext, 
        disabledPrev: action.disabledPrev, 
      })
    } else if (action.type === actions.LOAD_RACES){
      return Object.assign({}, state, {
        racesArray:[
        {id:0,thum:"img",name:"Human",expand:false},
        {id:1,thum:"img",name:"Elf",expand:true},
        {id:2,thum:"img",name:"Dwarf",expand:false},
      ],
      });
    }
    return state;
};