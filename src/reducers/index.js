import * as actions from '../actions';

const races = [
  {id:0,thum:"img",name:"Human",expand:false, standardRacialTraits:{
    base:{
      abilityScoreRacialBonuses: "Select", 
      age:"normal", 
      size:"medium", 
      type:"Humanoid [Human]", 
      speed:"Humans have a base speed of 30 feet.", 
      Languages:{start:"Common", learn:"any"}},
    racial:[{name:"Bonus Feat", description:"Humans select one extra feat at 1st level."},
      {name:"Skilled", description:"Humans gain an additional skill rank at first level and one additional rank whenever they gain a level."},
    ]
  }},
  {id:1,thum:"img",name:"Elf",expand:false, standardRacialTraits:{
    base:{abilityScoreRacialBonuses: "+2 Dexterity, +2 Intelligence, and –2 Constitution", age:"normal", size:"medium", type:"Humanoid [Elf]", speed:"Elves have a base speed of 30 feet.", Languages:{start:["Common","Elven"], learn:["Celestial", "Draconic", "Gnoll", "Gnome", "Goblin", "Orc", "Sylvan"]}},
    racial:[{name:"Elven Immunities", description:"Elves are immune to magic sleep effects and gain a +2 racial saving throw bonus against enchantment spells and effects."},
      {name:"Keen Senses", description:"Elves receive a +2 racial bonus on Perception checks."},
      {name:"Elven Magic", description:"Elves receive a +2 racial bonus on caster level checks made to overcome spell resistance. In addition, elves receive a +2 racial bonus on Spellcraft skill checks made to identify the properties of magic items."},
      {name:"Weapon Familiarity", description:"Elves are proficient with longbows (including composite longbows), longswords, rapiers, and shortbows (including composite shortbows), and treat any weapon with the word “elven” in its name as a martial weapon."},
      {name:"Low-Light Vision", description:"Elves can see twice as far as humans in conditions of dim light."},
    ]
  }},
  {id:2,thum:"img",name:"Dwarf",expand:false, standardRacialTraits:{
    base:{abilityScoreRacialBonuses: "+2 Constitution, +2 Wisdom, and –2 Charisma", age:"normal", size:"medium", type:"Humanoid [Dwarf]", speed:"(Slow and Steady) Dwarves have a base speed of 20 feet, but their speed is never modified by armor or encumbrance.", Languages:{start:["Common","Dwarven"], learn:["Giant", "Gnome", "Goblin", "Orc", "Terran", "Undercommon"]}},
    racial:[{name:"Defensive Training", description:"Dwarves gain a +4 dodge bonus to AC against monsters of the giant subtype."},
      {name:"Hardy", description:"Dwarves gain a +4 dodge bonus to AC against monsters of the giant subtype."},
      {name:"Stability", description:"Dwarves gain a +4 racial bonus to their Combat Maneuver Defense when resisting a bull rush or trip attempt while standing on the ground."},
      {name:"Greed", description:"Dwarves gain a +2 racial bonus on Appraise checks made to determine the price of non-magical goods that contain precious metals or gemstones."},
      {name:"Stonecunning", description:"Dwarves gain a +2 bonus on Perception checks to notice unusual stonework, such as traps and hidden doors located in stone walls or floors. They receive a check to notice such features whenever they pass within 10 feet of them, whether or not they are actively looking."},
      {name:"Darkvision", description:"Dwarves can see perfectly in the dark up to 60 feet."},
      {name:"Hatred", description:"Dwarves gain a +1 racial bonus on attack rolls against humanoid creatures of the orc and goblinoid subtypes because of their special training against these hated foes."},
      {name:"Weapon Familiarity", description:"Dwarves are proficient with battleaxes, heavy picks, and warhammers, and treat any weapon with the word “dwarven” in its name as a martial weapon."},
    ]
  }},
]

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
        abilityScoreGenerationMethod:"",
        statArrayToAssign:[],
      });
    } else if (action.type === actions.TOGGLE_STEP){
      return Object.assign({}, state, {
        currentStep:action.index,
        disabledNext:action.disabledNext, 
        disabledPrev:action.disabledPrev, 
      })
    } else if (action.type === actions.LOAD_RACES){
      return Object.assign({}, state, {
        racesArray:races,
      });
    } else if (action.type === actions.SET_STEP){
      return Object.assign({}, state, {
        currentStep:action.index,
        disabledNext:action.disabledNext, 
        disabledPrev:action.disabledPrev,         
      })
    } else if (action.type === actions.TOGGLE_RACE_EXPAND){
      const race = state.racesArray.find(r => r.id === action.index);
      const expand = race.expand;
      // THIS WORKS TO ENABLE THE CLICKED RACE 
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
/*      console.log("looking for value: "+action.value);

      console.log(state.statArrayToAssign.findIndex(function(element){
          console.log(element.value);
          return element.value == action.value;
        }));*/
      const index = state.statArrayToAssign.findIndex(function(element){
          return element.value == action.value;
        });
      return Object.assign({}, state, {
        statArrayToAssign:[...state.statArrayToAssign.slice(0,index),
          ...state.statArrayToAssign.slice(index+1)]
      })
    }
    return state;
};