import * as actions from '../actions';
import { createStat } from '../utility/statObjectFactories'


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
const newCharacter = {
  "characterStats":[],
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
  },
  featSlots:[
    { "type":"any",
      "selection":null
    }
  ],
  traitSlots:[
    { "type":"any",
      "selection":null
    },
    { "type":"any",
      "selection":null
    }
  ]
};
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
  creationSteps:creationSteps,
  help:false, 
  currentStep:0,
  disabledNext: false,
  disabledPrev: true,
  // the actual character object that will be converted and saved in memory
  newCharacter:newCharacter,
  abilityScoreGenerationMethod:"",
  statArrayToAssign:[],
  detailsExpand:[
    {id:0, name:"detailsTraitsExpand", expand:false},
    {id:1, name:"detailsCharacterDetailsExpand", expand:false},
    {id:2, name:"detailsPhysicalExpand", expand:false},
    {id:3, name:"detailsPersonalityExpand", expand:false},
    {id:4, name:"detailsExtrasExpand", expand:false},
  ],
};
function setSum(stat){
  let total = 0;
  let arrayOfHighestBonuses = [ ];
  for(let i=0; i<stat.bonuses.length; i++){
    let typeToFind = stat.bonuses[i].type;
      // **************  This is all if normal non-stacking bonuses are used *********
      // ****  If the bonus is dodge or untyped then we need to skip part of this ****
    if(typeToFind != 'dodge' && typeToFind != 'untyped' && typeToFind != 'rank'){    
      let found = false;
      let replace = false;
      let foundAt = null;
      // checking current 'highest' bonuses
      for(let j=0; j<arrayOfHighestBonuses.length; j++){
        if(arrayOfHighestBonuses[j].type == typeToFind){
          // if so, compare and keep only the largest
          if(stat.bonuses[i].amount > arrayOfHighestBonuses[j].amount){
             console.log('new bonus is larger')
            found = true;
            replace = true;
            foundAt = j;
          } else {
            console.log("we found one, but it is already larger") ;
            found = true;
            replace = false;
          };
        };
      };
      if(found && replace){
        // we found it and we want to replace it
        total = total - parseInt(arrayOfHighestBonuses[foundAt].amount, 10);
        total = total + parseInt(stat.bonuses[i].amount, 10);
        arrayOfHighestBonuses[foundAt] = stat.bonuses[i];
      } else if(!found){
        // if not, add this bonus to the array and be done
        // 'no matching type found. adding first now'
        arrayOfHighestBonuses.push(stat.bonuses[i]);
        total = total + parseInt(stat.bonuses[i].amount, 10);
      };
    } else { 
      // this means that the type is dodge, untyped, or ranks
      let found = false;
      // checking array of highest bonuses
      for(let j=0; j<arrayOfHighestBonuses.length; j++){
        if(arrayOfHighestBonuses[j].type == typeToFind){
          arrayOfHighestBonuses[j].sum += stat.bonuses[i].amount;
          arrayOfHighestBonuses[j].bonuses.push(stat.bonuses[i]);
          found = true;
        };
      };

      if(!found){
        arrayOfHighestBonuses.push({bonuses: [stat.bonuses[i]]});
        total = total + parseInt(stat.bonuses[i].amount, 10);
      };
    }; 
  };  // end of for loop - array of current bonuses

  let sum = { "total": total, "bonuses": arrayOfHighestBonuses };
  return sum;
}

export const characterReducer = (state=initialState, action) => {
  let indexOfStep = null;
  let race = null;
  let step = null;
  let charClass = null;
  let expand = null;
  // refactor to switch case
  // return ...state,
  //    changes: action.changes,
  switch(action.type){
    case actions.LOAD_CHARACTER:
      return{
        ...state,
        char:action.char
      }
    /* case actions.LOAD_CREATION_STEPS:
      return { 
        ...state,
        creationSteps:creationSteps,
        help:false,
        currentStep:0,
        disabledNext: false,
        disabledPrev: true,
        // the actual character object that will be converted and saved in memory
        newCharacter:newCharacter,
        abilityScoreGenerationMethod:"",
        statArrayToAssign:[],
        detailsExpand:[
          {id:0, name:"detailsTraitsExpand", expand:false},
          {id:1, name:"detailsCharacterDetailsExpand", expand:false},
          {id:2, name:"detailsPhysicalExpand", expand:false},
          {id:3, name:"detailsPersonalityExpand", expand:false},
          {id:4, name:"detailsExtrasExpand", expand:false},
        ],
      }; */
    case actions.TOGGLE_STEP:
      return {
        ...state,
        currentStep:action.index,
        disabledNext:action.disabledNext, 
        disabledPrev:action.disabledPrev, 
      }
    case actions.LOAD_RACES:
      return {
        ...state,
        racesArray:action.races,
      };
    case actions.SET_STEP:
      return {
        ...state,
        currentStep:action.index,
        disabledNext:action.disabledNext, 
        disabledPrev:action.disabledPrev,         
      }
    case actions.TOGGLE_RACE_EXPAND:
      race = state.racesArray.find(r => r.id === action.index);// @todo could be null
      expand = race.expand;
      return { 
        ...state, 
        racesArray:[ ...state.racesArray.filter(r => r.id < race.id), 
          { ...race, expand:!expand }, 
          ...state.racesArray.filter(r => r.id > race.id) 
        ] 
      };
    case actions.ABILITY_SCORE_GENERATION_METHOD:
      return {
        ...state,
        abilityScoreGenerationMethod:action.name,
      }
    case actions.SET_AVAILABLE_STATS:
      return {
        ...state,
        statArrayToAssign:action.statArray,
      }
    case actions.ASSIGN_SCORE:
      const index = state.statArrayToAssign.findIndex(function(element){
          return element.value == action.value;
        });
      return {
        ...state,
        statArrayToAssign:[...state.statArrayToAssign.slice(0,index),
          ...state.statArrayToAssign.slice(index+1)]
      }
    case actions.SUBMIT_PREFERENCES_TO_STATE:
      indexOfStep = 0;
      step = state.creationSteps[indexOfStep];
      return {
        ...state,
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
      }
    case actions.TOGGLE_HELP:
      return {
        ...state,
        help:!state.help,
      } 
    case actions.SUBMIT_RACE_TO_STATE:
      race = action.index;
      indexOfStep = 1;
      step = state.creationSteps[indexOfStep];
      return {
        ...state,
        // first set the completed tag for step 1 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ], newCharacter:{ ...state.newCharacter,
          // add the values to the state
          race:race,
        }
      }
    case actions.SUBMIT_AASIMAR_RACE_TO_STATE:
      race = action.race;

      indexOfStep = 1;
      step = state.creationSteps[indexOfStep];
      return {
        ...state,
        // first set the completed tag for step 1 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ], newCharacter:{ ...state.newCharacter,
          // add the values to the state
          race:race,
        }
      }
    case actions.SUBMIT_CLASS_TO_STATE:
      charClass = action.index;
      indexOfStep = 2;  // Class
      step = state.creationSteps[indexOfStep];
      return {
        ...state,
        // first set the completed tag for step 2 to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ], newCharacter:{ ...state.newCharacter,
          // add the values to the state
          charClass:charClass,
        }
      }
    case actions.SUBMIT_ABILITY_SCORES_TO_STATE:
      return{
        ...state,
        newCharacter:{
          ...state.newCharacter,
          [action.ability]:{
            ...state.newCharacter[action.ability], [action.bonusType]:action.bonus
          }
        }
      }
    case actions.SUBMIT_SKILLS_TO_STATE:
      return{
        ...state,
        newCharacter:{
          ...state.newCharacter,
          skills:{ 
            ...state.newCharacter.skills,
            [action.skill]:{
              ...state.newCharacter[action.skill], [action.bonusType]:action.bonus
            }
          }
        }           
      }
    case actions.TOGGLE_CLASS_EXPAND:
      charClass = state.classesArray.find(r => r.id === action.index);
      expand = charClass.expand;
      // THIS WORKS TO ENABLE THE CLICKED RACE 
      return { ...state, 
        classesArray:[ ...state.classesArray.filter(r => r.id < charClass.id), 
          { ...charClass, expand:!expand }, 
          ...state.classesArray.filter(r => r.id > charClass.id) 
        ] 
      };
    case actions.LOAD_CLASSES:
      return {
        ...state,
        classesArray:action.classes,
      };
    case actions.LOAD_TRAITS:
      return {
        ...state,
        traitsArray:action.traits,
      };
    case actions.TOGGLE_DETAILS_EXPAND:
      const detail = state.detailsExpand.find(r => r.id == action.index);
      expand = detail.expand;
      return { ...state, 
        detailsExpand:[ ...state.detailsExpand.filter(r => r.id < detail.id), 
          { ...detail, expand:!expand }, 
          ...state.detailsExpand.filter(r => r.id > detail.id) 
        ] 
      }
    case actions.SAVE_ABILITY_SCORE_OPTIONS:
      return {
        ...state,
        abilityScoreOptions:action.options,
      };
    case actions.SUBMIT_DETAILS_TO_STATE:
      indexOfStep = 4;
      step = state.creationSteps[indexOfStep];
      return {
        ...state,
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
            deity:action.values.faith,
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
      }
    case actions.SET_STEP_TO_COMPLETE:
      indexOfStep = action.step;
      step = state.creationSteps[indexOfStep];
      return {
        ...state,
        // first set the completed tag for step to true
        creationSteps:[...state.creationSteps.filter(c => c.id < indexOfStep),
          { ...step, complete:true},
          ...state.creationSteps.filter(c => c.id > indexOfStep)
        ]
      }
    case actions.EQUIPMENT_GENERATION_METHOD:
      return {
        ...state,
        equipmentGenerationMethod:action.value,
      }
    case actions.GOLD_GENERATION_METHOD:
      return {
        ...state,
        newCharacter:{...state.newCharacter, goldMethod:action.text,
        }
      }
    case actions.SET_GOLD:
      return {
        ...state,
        newCharacter:{...state.newCharacter, gold:action.value, availableGold:action.value,
        }
      }
    case actions.ADD_ITEM_TO_CHARACTER:
      if(!state.newCharacter.gear){
          return {
            ...state,
            newCharacter:{...state.newCharacter, gear:[action.item]
          }
        }
      } else {
        return {
          ...state,
          newCharacter:{...state.newCharacter, gear:[...state.newCharacter.gear, action.item]
          }
        }       
      }
    case actions.REMOVE_ITEM_FROM_CHARACTER:
      let indexOfItem = null;
      for(let i=0;i<state.newCharacter.gear.length;i++){
        if(state.newCharacter.gear[i] === action.item){
          indexOfItem = i;
        }
      }
      if(indexOfItem != undefined || indexOfItem != null){
        return {
          ...state,
          newCharacter:{...state.newCharacter, gear:[...state.newCharacter.gear.slice(0, indexOfItem),
                        ...state.newCharacter.gear.slice(indexOfItem + 1)]}
        };
      }
    break;
    case actions.SPEND_GOLD:
      let newGold = state.newCharacter.availableGold - action.cost;
      return {
        ...state,
        newCharacter:{...state.newCharacter, availableGold:newGold,
        }
      }
    case actions.SET_EXPANDED_FEAT_CATEGORY:
      return {
        ...state,
        expanded:{...state.expanded, featCategory:action.name}
      }
    case actions.SET_EXPANDED_TRAIT_CATEGORY:
      return {
        ...state,
        expanded:{...state.expanded, traitCategory:action.name}
      }
    case actions.SET_EXPANDED_FEAT:
      return {
        ...state,
        expanded:{...state.expanded, feat:action.name}
      }
    case actions.SET_EXPANDED_RACE:
      return {
        ...state,
        expanded:{...state.expanded, race:action.name}
      }
    case actions.SET_EXPANDED_CLASS:
      return {
        ...state,
        expanded:{...state.expanded, charClass:action.name}
      }
    case actions.SUBMIT_TRAIT_TO_STATE:
      foundAt = null;
      for(let i = 0;i<state.newCharacter.traitSlots.length; i++){
        if(!state.newCharacter.traitSlots[i].selection){
          foundAt = i;
          break;
        }
      }
      let newTrait = state.newCharacter.traitSlots;
      return {
        ...state,
        newCharacter:{...state.newCharacter, traitSlots:
          newTrait.map((content, i) => i === foundAt ? {...content, selection:action.trait } : content )
        }
      }  
    case actions.SUBMIT_FEAT_TO_STATE:
      foundAt = null;
      for(let i = 0;i<state.newCharacter.featSlots.length; i++){
        if(!state.newCharacter.featSlots[i].selection){
          foundAt = i;
          break;
        }
      }
      let newFeat = state.newCharacter.featSlots;
      return {
        ...state,
        newCharacter:{...state.newCharacter, featSlots:
          newFeat.map((content, i) => i === foundAt ? {...content, selection:action.feat } : content )
        }
      }    
    case actions.ADD_BONUS:
      // flags
      let statToAddBonusTo = action.bonus.stat;
      let found = false;
      let foundAt = null;
      // look through the bonus array for the bonus stat
      for(let i=0;i<state.newCharacter.characterStats.length;i++){
        if(state.newCharacter.characterStats[i].name === statToAddBonusTo){
          found = true;
          foundAt = i;
        }
      }
      // Not found so we need a new stat created.
      if(!found){
        return {
          ...state,
          newCharacter:{...state.newCharacter, characterStats:[
            ...state.newCharacter.characterStats, createStat({
              name:statToAddBonusTo,
              flag:true,
              bonuses:[action.bonus]
            })]
          }
        }
      } else {
        // found, so add it to the correct bonuses array
        let bonuses = state.newCharacter.characterStats[foundAt].bonuses;
        return{
          ...state,
          newCharacter:{
            ...state.newCharacter,
            characterStats: state.newCharacter.characterStats.map(
              (content, i) => i === foundAt ? {...content, 
                bonuses:[...bonuses, action.bonus]} : content
            )
          },
        }
      }
    case actions.SUM_BONUS:
      // flags
      statToAddBonusTo = action.bonus.stat;
      found = false;
      foundAt = null;
      // look through the bonus array for the bonus stat
      for(let i=0;i<state.newCharacter.characterStats.length;i++){
        if(state.newCharacter.characterStats[i].name === statToAddBonusTo){
          found = true;
          foundAt = i;
        }
      }
      if(found){
        return{
          ...state,
          newCharacter:{
            ...state.newCharacter,
            characterStats: state.newCharacter.characterStats.map(
              (content, i) => i === foundAt ? {...content, 
                sum:setSum(state.newCharacter.characterStats[foundAt])} : content
            )
          },
        }
      }
    break;
    case actions.SET_SELECTIONS:
      return {
        ...state,
        selections:action.race
      }
    case actions.SUBMIT_FAVORED_CLASS_TO_STATE:
      if(!state.newCharacter.favoredClass){
        return {
          ...state,
          newCharacter:{...state.newCharacter, favoredClass:[action.favoredClass]}
        }
      } else {
        return {
          ...state,
          newCharacter:{...state.newCharacter, favoredClass:[...state.newCharacter.favoredClass, action.favoredClass]}
        }    
      }
    case actions.SET_CLASS_SELECTIONS_VIEW:
      if(!state.classSelectionsView){
        return {
          ...state,
          classSelectionsView:[action.charClass]
        }
      } else {
        return {
          ...state,
          classSelectionsView:[...state.classSelectionsView, action.charClass]
        }    
      }
    case actions.SUBMIT_FAVORED_ENEMY:
      let tableLevel = state.newCharacter.charClass.classFeatures.table[1];
      let levelSpecial = state.newCharacter.charClass.classFeatures.table[1][5];
      let favoredEnemy = state.newCharacter.charClass.classFeatures.table[1][5][0];
      return {
        ...state,
        newCharacter:{...state.newCharacter, charClass:{
          ...state.newCharacter.charClass, classFeatures:{
            ...state.newCharacter.charClass.classFeatures, table:[
              ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] === "level"),
                [...tableLevel.filter(d => typeof d === "string"), 
                  [...levelSpecial.filter(o => o.name < "favored enemy"), 
                    {...favoredEnemy, specialty: action.favoredEnemy},
                  ...levelSpecial.filter(o => o.name > "favored enemy")]],
                ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] > 1)
            ]
          }
        }}
      }
    case actions.SUBMIT_NATURE_BOND:
    console.log(action.bond);
      tableLevel = state.newCharacter.charClass.classFeatures.table[1];
      levelSpecial = state.newCharacter.charClass.classFeatures.table[1][5];
      foundAt = null;
      for(let i=0;i<levelSpecial.length;i++){
        if(levelSpecial[i].name === "nature bond"){
          console.log("found it at ");
          console.log(i);
          console.log("should be 3");
          foundAt = i;
        }
      }
      return {
        ...state,
        newCharacter:{...state.newCharacter, charClass:{
          ...state.newCharacter.charClass, classFeatures:{
            ...state.newCharacter.charClass.classFeatures, table:[
              ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] === "level"),
                tableLevel.map((content, i) => i === 5 ? 
                  levelSpecial.map((content2, j) => j === foundAt ? {...content2, specialty: action.bond } : content2 ) : content),
                ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] > 1)
            ]
          }
        }}
      }
    case actions.SET_GENERIC_EXPAND:
      return {
        ...state,
        expand:action.name
      }
    case actions.SET_AVAILABLE_DOMAINS:
      return {
        ...state,
        availableDomains:action.domains
      }
    case actions.SUBMIT_DOMAIN:
       tableLevel = state.newCharacter.charClass.classFeatures.table[1];
      levelSpecial = state.newCharacter.charClass.classFeatures.table[1][5];
      foundAt = null;
      for(let i=0;i<levelSpecial.length;i++){
        if(levelSpecial[i].name === "domains"){
          foundAt = i;
        }
      } 
      return {
        ...state,
        newCharacter:{...state.newCharacter, charClass:{
          ...state.newCharacter.charClass, classFeatures:{
            ...state.newCharacter.charClass.classFeatures, table:[
              ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] === "level"),
                tableLevel.map((content, i) => i === 5 ? 
                  levelSpecial.map((content2, j) => j === foundAt ? {...content2, specialty: action.domain } : content2 ) : content),
                ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] > 1)
            ]
          }
        }}
      }  
    case actions.SET_DEITY:
      return {
        ...state,
        clericDetails:{deity:action.deity}
      }
    case actions.SET_DOMAIN:
      if(!state.clericDetails.domains){
        return {
          ...state,
          clericDetails:{...state.clericDetails, domains:[action.domain]}
        }
      } else {
        return {
          ...state,
          clericDetails:{ ...state.clericDetails, 
            domains:[...state.clericDetails.domains, action.domain]}
        }
      }
    case actions.SET_BLOODLINE:
      return {
        ...state,
        sorcererDetails:{...state.sorcererDetails, bloodline:[action.bloodline], spells:[[],[]]},
        
      }
    case actions.SET_SPELLS:
      const level = action.asLevel;
      let spellsArray = state.sorcererDetails.spells
      if(!state.sorcererDetails.spells){
        return {
          ...state,
          sorcererDetails:{
            ...state.sorcererDetails, spells:[
              (level === 0) ? ([action.spell],[]) : ([ ],[action.spell])
            ]
          }
        } 
      } else {
        return { 
          ...state,
          sorcererDetails:{ 
            ...state.sorcererDetails, spells:[
              ...spellsArray.map((content, i) => i === level ? [...content, action.spell] : content)]}
        }
      } 
    case actions.SUBMIT_SORCERER_DETAILS:
      tableLevel = state.newCharacter.charClass.classFeatures.table[1];
      levelSpecial = state.newCharacter.charClass.classFeatures.table[1][5];
      let spellsKnown = state.newCharacter.charClass.classFeatures.table[1][7];
      let bloodlineFoundAt = null;
      let power = action.details.bloodline[0].bloodlinePowers.list.filter(p=>(p.level === 1))[0];
      foundAt = null;
      for(let i=0;i<levelSpecial.length;i++){
        if(levelSpecial[i].name === "bloodline"){
          bloodlineFoundAt = i;
        }
      } 
      for(let i=0;i<levelSpecial.length;i++){
        if(levelSpecial[i].name === "bloodline power"){
          foundAt = i;
        }
      } 
      return {
        ...state,
         newCharacter:{...state.newCharacter, charClass:{
          ...state.newCharacter.charClass, classFeatures:{
            ...state.newCharacter.charClass.classFeatures, table:[
              ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] === "level"),
                tableLevel.map((content, i) => i === 5 ? 
                  levelSpecial.map((content2, j) => j === bloodlineFoundAt ? {...content2, specialty: action.details.bloodline[0] } : (
                    j === foundAt ? {...content2, specialty: power } : content2
                  )) : (
                    i === 7 ? {...spellsKnown, specialty: action.details.spells} : content
                  )),
                ...state.newCharacter.charClass.classFeatures.table.filter(r => r[0] > 1)
            ]
          }
        }} 
      }  
    case actions.ADD_FEAT_SLOT:
      return {
        ...state,
        newCharacter:{...state.newCharacter, featSlots:[
          ...state.newCharacter.featSlots, { type: action.category, selection:null }
        ]}
      }
    case actions.SUBMIT_DEITY:
      if(state.newCharacter.details){
        return {
          ...state,
          newCharacter:{...state.newCharacter, details:{
            ...state.newCharacter.details, deity:action.deity, ...state.newCharacter.details
          }}
        }          
      } else {
        return {
          ...state,
          newCharacter:{...state.newCharacter, details:{
            deity:action.deity
          }}
        }    
      }
    case actions.SUBMIT_ALIGNMENT_RESTRICTIONS:
      if(state.newCharacter.details){
        return {
          ...state,
          newCharacter:{...state.newCharacter, details:{
            ...state.newCharacter.details, alignmentRestrictions:action.alignmentRestrictions, ...state.newCharacter.details
          }}
        }          
      } else {
        return {
          ...state,
          newCharacter:{...state.newCharacter, details:{
            alignmentRestrictions:action.alignmentRestrictions
          }}
        }    
      }
    case actions.SET_TRAITS_TO_COMPLETE:
      if(state.newCharacter.details){
        return {
          ...state,
          newCharacter:{...state.newCharacter, details:{
            ...state.newCharacter.details, traitsCompleted:true
          }}
        }          
      } else {
        return {
          ...state,
          newCharacter:{...state.newCharacter, details:{
            traitsCompleted:true
          }}
        }    
      }




    default:
      console.warn(`unhandled action: ${action.type}`);
      return state
  }
};