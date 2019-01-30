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
export const characterReducer = (state=initialState, action) => {
  // refactor to switch case
  // return ...state,
  //    changes: action.changes,

    if (action.type === actions.LOAD_CHARACTER) {
      return Object.assign({}, state, {
        char:action.char,
      });
    } else if (action.type === actions.LOAD_CREATION_STEPS){
      return Object.assign({}, state, {
        creationSteps:[
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
        ],
        help:false,
        currentStep:0,
        disabledNext: false,
        disabledPrev: true,
        // the actual character object that will be converted and saved in memory
        newCharacter:{
          "strength": {
            base: 0,
            racial: 0,
          },
          "dexterity": {
            base: 0,
            racial: 0,
          },
          "constitution": {
            base: 0,
            racial: 0,
          },
          "intelligence": {
            base: 0,
            racial: 0,
          },
          "wisdom": {
            base: 0,
            racial: 0,
          },
          "charisma": {
            base: 0,
            racial: 0,
          },
          charClass:{
            classFeatures:{
              skills:0,
            }
          },
          skills:{
            "acrobatics": {},
            "appraise": {},
            "bluff": {},
            "climb": {},
            "craft": {},
            "diplomacy": {},
            "disableDevice": {},
            "disguise": {},
            "escapeArtist": {},
            "fly": {},
            "handleAnimal": {},
            "heal": {},
            "intimidate": {},
            "knowledge (arcana)": {},
            "knowledge (dungeoneering)": {},
            "knowledge (engineering)": {},
            "knowledge (geography)": {},
            "knowledge (history)": {},
            "knowledge (local)": {},
            "knowledge (nature)": {},
            "knowledge (nobility)": {},
            "knowledge (planes)": {},
            "knowledge (religion)": {},
            "linguistics": {},
            "perception": {},
            "perform": {},
            "profession": {},
            "ride": {},
            "senseMotive": {},
            "sleightOfHand": {},
            "spellcraft": {},
            "stealth": {},
            "survival": {},
            "swim": {},
            "useMagicDevice": {},
          }
        },
        abilityScoreGenerationMethod:"",
        statArrayToAssign:[],
        detailsExpand:[
          {id:0, name:"detailsTraitsExpand", expand:false},
          {id:1, name:"detailsCharacterDetailsExpand", expand:false},
          {id:2, name:"detailsPhysicalExpand", expand:false},
          {id:3, name:"detailsPersonalityExpand", expand:false},
          {id:4, name:"detailsExtrasExpand", expand:false},
        ],
      });
    } else if (action.type === actions.TOGGLE_STEP){
      return Object.assign({}, state, {
        currentStep:action.index,
        disabledNext:action.disabledNext, 
        disabledPrev:action.disabledPrev, 
      })
    } else if (action.type === actions.LOAD_RACES){
      return Object.assign({}, state, {
        racesArray:action.races,
      });
    } else if (action.type === actions.SET_STEP){
      return Object.assign({}, state, {
        currentStep:action.index,
        disabledNext:action.disabledNext, 
        disabledPrev:action.disabledPrev,         
      })
    } else if (action.type === actions.TOGGLE_RACE_EXPAND){
      const race = state.racesArray.find(r => r.id === action.index);// @todo could be null
      const expand = race.expand;
      return { ...state, 
        racesArray:[ ...state.racesArray.filter(r => r.id < race.id), 
          { ...race, expand:!expand }, 
          ...state.racesArray.filter(r => r.id > race.id) 
        ] 
      };
    } else if (action.type === actions.ABILITY_SCORE_GENERATION_METHOD){
      return Object.assign({}, state, {
        abilityScoreGenerationMethod:action.name,
      })
    } else if (action.type === actions.SET_AVAILABLE_STATS){
      return Object.assign({}, state, {
        statArrayToAssign:action.statArray,
      })
    } else if (action.type === actions.ASSIGN_SCORE){
      const index = state.statArrayToAssign.findIndex(function(element){
          return element.value == action.value;
        });
      return Object.assign({}, state, {
        statArrayToAssign:[...state.statArrayToAssign.slice(0,index),
          ...state.statArrayToAssign.slice(index+1)]
      })
    } else if (action.type === actions.SUBMIT_PREFERENCES_TO_STATE){
      const indexOfStep = 0;
      const step = state.creationSteps[indexOfStep];
      return Object.assign({}, state, {
        // first set the completed tag for step 0 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ], newCharacter:{ ...state.newCharacter,
          // add the values to the state
          preferences:{
            advancement:action.values.advancementSelecter,
            hpProcess:action.values.hpSelecter,
            encumberence:action.values.encumberence,
            coinWeight:action.values.coinWeight,
            monsterRaces:action.values.monsterRacesAllowed,
            templateRules:action.values.templateRuleSelecter,
          }
        }
      })
    } else if (action.type === actions.TOGGLE_HELP){
      return Object.assign({}, state, {
        help:!state.help,
      })
    } else if (action.type === actions.SUBMIT_RACE_TO_STATE){
      const race = state.racesArray.find(r => r.id === action.index);
      const indexOfStep = 1;
      const step = state.creationSteps[indexOfStep];
      return Object.assign({}, state, {
        // first set the completed tag for step 1 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ], newCharacter:{ ...state.newCharacter,
          // add the values to the state
          race:race,
        }
      })
    } else if (action.type === actions.SUBMIT_CLASS_TO_STATE){
      const charClass = state.classesArray.find(r => r.id === action.index);
      const indexOfStep = 2;  // Class
      const step = state.creationSteps[indexOfStep];
      return Object.assign({}, state, {
        // first set the completed tag for step 2 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ], newCharacter:{ ...state.newCharacter,
          // add the values to the state
          charClass:charClass,
        }
      })
    } else if (action.type === actions.SUBMIT_ABILITY_SCORES_TO_STATE){
      return(Object.assign({}, state, {
        newCharacter:{
          ...state.newCharacter,
          [action.ability]:{
            ...state.newCharacter[action.ability], [action.bonusType]:action.bonus
          }
        }
      }))
    } else if (action.type === actions.SUBMIT_SKILLS_TO_STATE){
      return(Object.assign({}, state, {
        newCharacter:{
          ...state.newCharacter,
          skills:{ 
            ...state.newCharacter.skills,
            [action.skill]:{
              ...state.newCharacter[action.skill], [action.bonusType]:action.bonus
            }
          }
        }           
      }))
    } else if (action.type === actions.TOGGLE_CLASS_EXPAND){
      const charClass = state.classesArray.find(r => r.id === action.index);
      const expand = charClass.expand;
      // THIS WORKS TO ENABLE THE CLICKED RACE 
      return { ...state, 
        classesArray:[ ...state.classesArray.filter(r => r.id < charClass.id), 
          { ...charClass, expand:!expand }, 
          ...state.classesArray.filter(r => r.id > charClass.id) 
        ] 
      };
    } else if (action.type === actions.LOAD_CLASSES){
      return Object.assign({}, state, {
        classesArray:action.classes,
      });
    } else if (action.type === actions.LOAD_TRAITS){
      return Object.assign({}, state, {
        traitsArray:action.traits,
      });
    } else if (action.type === actions.TOGGLE_DETAILS_EXPAND){
      const detail = state.detailsExpand.find(r => r.id == action.index);
      const expand = detail.expand;
      return { ...state, 
        detailsExpand:[ ...state.detailsExpand.filter(r => r.id < detail.id), 
          { ...detail, expand:!expand }, 
          ...state.detailsExpand.filter(r => r.id > detail.id) 
        ] 
      }
    } else if (action.type === actions.SAVE_ABILITY_SCORE_OPTIONS){
      return Object.assign({}, state, {
        abilityScoreOptions:action.options,
      });
    } else if (action.type === actions.SUBMIT_DETAILS_TO_STATE){
      const indexOfStep = 4;
      const step = state.creationSteps[indexOfStep];
      return Object.assign({}, state, {
        // first set the completed tag for step 0 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ], newCharacter:{ ...state.newCharacter,
          // add the values to the state
          details:{
            age:action.values.age,
            alignments:action.values.alignments,
            allies:action.values.allies,
            backstory:action.values.backstory,
            enemies:action.values.enemies,
            eyes:action.values.eyes,
            faith:action.values.faith,
            flaws:action.values.flaws,
            gender:action.values.gender,
            hair:action.values.hair,
            ideals:action.values.ideals,
            organizations:action.values.organizations,
            other:action.values.other,
            personalityTraits:action.values.personalityTraits,
            skin:action.values.skin,
            weight:action.values.weight,
          }
        }
      })
    } else if (action.type === actions.SET_STEP_TO_COMPLETE){
      const indexOfStep = action.step;
      const step = state.creationSteps[indexOfStep];
      return Object.assign({}, state, {
        // first set the completed tag for step 0 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ]
      })
    } else if (action.type === actions.EQUIPMENT_GENERATION_METHOD){
      return Object.assign({}, state, {
        equipmentGenerationMethod:action.value,
      })
    } else if (action.type === actions.GOLD_GENERATION_METHOD){
      return Object.assign({}, state, {
        newCharacter:{...state.newCharacter, goldMethod:action.text,
        }
      })
    } else if (action.type === actions.SET_GOLD){
      return Object.assign({}, state, {
        newCharacter:{...state.newCharacter, gold:action.value, availableGold:action.value,
        }
      })
    } else if (action.type === actions.ADD_ITEM_TO_CHARACTER){
      if(!state.newCharacter.gear){
          return Object.assign({}, state, {
            newCharacter:{...state.newCharacter, gear:[action.item]
          }
        })
      } else {
        return Object.assign({}, state, {
          newCharacter:{...state.newCharacter, gear:[...state.newCharacter.gear, action.item]
          }
        })        
      }
    } else if (action.type === actions.REMOVE_ITEM_FROM_CHARACTER){
      let indexOfItem = null;
      for(let i=0;i<state.newCharacter.gear.length;i++){
        if(state.newCharacter.gear[i] === action.item){
          indexOfItem = i;
        }
      }
      if(indexOfItem != undefined || indexOfItem != null){
        return Object.assign({}, state, {
          newCharacter:{...state.newCharacter, gear:[...state.newCharacter.gear.slice(0, indexOfItem),
                        ...state.newCharacter.gear.slice(indexOfItem + 1)]}
        });
      }    
    } else if (action.type === actions.SPEND_GOLD){
      let newGold = state.newCharacter.availableGold - action.cost;
      return Object.assign({}, state, {
        newCharacter:{...state.newCharacter, availableGold:newGold,
        }
      })
    } else if (action.type === actions.SET_EXPANDED_FEAT_CATEGORY){
      return Object.assign({}, state, {
        expanded:{...state.expanded, featCategory:action.name}
      })
    } else if (action.type === actions.SET_EXPANDED_FEAT){
      return Object.assign({}, state, {
        expanded:{...state.expanded, feat:action.name}
      })
    } else if (action.type === actions.SUMBIT_FEAT_TO_STATE){
      const indexOfStep = 6;
      const step = state.creationSteps[indexOfStep];
      if(!state.newCharacter.feats){
        return Object.assign({}, state, {
          creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
            { ...step, complete:true},
            ...state.creationSteps.filter(c => c.id > indexOfStep)
          ], 
          newCharacter:{...state.newCharacter, feats:[action.feat]}
        })
      } else {
        return Object.assign({}, state, {
          creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
            { ...step, complete:true},
            ...state.creationSteps.filter(c => c.id > indexOfStep)
          ], 
          newCharacter:{...state.newCharacter, feats:[...state.newCharacter.feats, action.feat]}
        })        
      }
    } 

// first set the completed tag for step 0 to true
        

    // Prep for future release
      /*else if (action.type === actions.TOGGLE_FEATURE_EXPAND){
      const charClass = state.classesArray.find(r => r.name === action.charClass)
      const feature = charClass.classFeatures.table.find(r => r[5].find(x => x.name === action.feature));
      console.log(feature);

      
    }*/;
    return state;
};

// default:
  // console.warn(`unhandled action: ${action.type}`);
  // return state