import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus } from 'redux-form';

import { toggleDetailsExpand } from '../actions/index';
import { submitDetailsToState } from '../actions/index';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { fetchProtectedData } from '../actions/protectedData';
import { fetchProtectedSubData } from '../actions/protectedData';
import CharacterReview from './characterReview2';
import { resetCompletedStep, removeTraitFromState } from '../actions/index';
import { setTraitFilter, clearTraitFilter } from '../actions/index';
import { resetTraitsToComplete } from '../actions/index';
import CardTrait from './cardTrait';

import './newCharacterDetails.css';
/* import CardTraitCategory from './cardTraitCategory'; */

export class NewCharacterDetails extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchProtectedData("deities"));
    this.props.dispatch(fetchProtectedSubData("traits"));
  }

  dispatchResetCompletedStep(){
    this.props.dispatch(resetCompletedStep(4));
    this.props.dispatch(clearTraitFilter());

    let traits = this.props.traits;
    let traitsToRemove = [];
		for(let i=0;i<traits.length;i++){
			if(traits[i].selection){
				traitsToRemove.push(traits[i].selection)
			}
    }
    for(let i=0; i<traitsToRemove.length;i++){      
      this.props.dispatch(removeTraitFromState(traitsToRemove[i]));
    }
    this.props.dispatch(resetTraitsToComplete()); 
  }

	submitHandler(values) {
		const details = this.props.charDetails;
		const traitsCompleted = details ? (details.traitsCompleted ? (details.traitsCompleted === true ? true : false) : false) : false;

    if(traitsCompleted){
			this.props.dispatch(submitDetailsToState(values));
		} else { 
      console.log("traits not done");
      
		}
	}

	handleToggle(id, event){
		event.preventDefault();
		for(let i=0; i<this.props.expand.length;i++){
			// if this is the clicked element toggle it **OR**
			// if this is not the clicked element and it is expanded, toggle it
			if( (i==id) || (i!=id && this.props.expand[i].expand === true) ){
				this.props.dispatch(toggleDetailsExpand(i));
			}
		}
	}

	getCategoryList(){
    let traitsList = this.props.traitsList ? this.props.traitsList : []; 
		let traitsCategory = [];		// list of categories
    let foundCategory = false;		// flag

		if(traitsList.length > 0){
      for(let i = 0; i<traitsList.length;i++){				// for each trait
        let categoryArray = traitsList[i].Type;			// get the array of category
        if(categoryArray === "Basic"){
          // we need to check the triatsList[i].cateogry instead
          categoryArray = traitsList[i].Category
        }
        
        foundCategory = false;							// make sure the marker is false 
        for(let j=0;j<traitsCategory.length;j++){		// search the list
          if(traitsCategory[j] === categoryArray){		// if the category is found
            foundCategory = true;					// set the marker
          };
        };	
        if(!foundCategory){ 							// if there is no marker, then it is a new category
          traitsCategory.push(categoryArray); 			// add it to the list
        };
      };
    }
		return traitsCategory;
	}

  filterTraits(category){
    if(category === "Hide"){
      this.props.dispatch(clearTraitFilter());
    } else {
      if(category !== "All"){
        this.props.dispatch(setTraitFilter(category));
      } else if(category === "All"){
        this.props.dispatch(setTraitFilter("ShowAll"));
      }
    }
  }

	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		// const expand = this.props.expand;
		const details = this.props.charDetails;
		const selectedDeity = details ? details.deity : null;
		const alignmentRestrictions = details ? ( 
			details.alignmentRestrictions ? details.alignmentRestrictions : null
			) : null;
		const traitsCompleted = details ? (details.traitsCompleted ? (details.traitsCompleted === true ? true : false) : false) : false;
    const deities = this.props.deities;
    const physicalCharacteristics = ["hair", "skin", "eyes", "height", "weight", "age"];
    const personalityCharacteristics = ["ideals", "flaws"];
    const extras = ["organizations", "allies", "enemies", "backstory", "other"];
    const defaultAlignments = ["Chaotic evil", "Chaotic good", "Chaotic neutral",
      "Lawful evil", "Lawful good", "Lawful neutral",
      "Neutral", "Neutral evil", "Neutral good"];
    const possibleAlignments = alignmentRestrictions ? alignmentRestrictions : defaultAlignments;
    
    // Trait variables
    const traitFilter = this.props.traitFilter ? this.props.traitFilter : null;
    const traitsList = this.props.traitsList;
    let traitCategories = (traitsList[0] && traitsList[0].hasOwnProperty("URL")) ? this.getCategoryList() : []; // this.getCategoryList() // 
    let filteredTraitsList = [];

    /* let toExpand = "";
		if(this.props.toExpand){
			if(this.props.toExpand.trait){
				toExpand = this.props.toExpand.trait;
			}
    }	 */

    // filter the feats list based on the filter selected by the user
    if(traitsList[0] && traitsList[0].hasOwnProperty("URL")){
      if(!traitFilter){ // nothing makes it through the filter
        filteredTraitsList = [];
      } else if(traitFilter === "ShowAll"){  // everything makes it through the fileter
        filteredTraitsList = traitsList;
      } else {
        for(let i=0;i<traitsList.length;i++){
          if(traitsList[i].Type === traitFilter || traitsList[i].Category === traitFilter){
            filteredTraitsList.push(traitsList[i]);
          }
        }
      }
    }

    // sort
    filteredTraitsList.sort((a, b) => (a.Name > b.Name) ? (1) : (-1));

		// if help is true, that screen is displayed
		if(help){
			return ( 
				<div className="detailsHelp">
					<h2>Character Details</h2>
					<p>In this step, you will flesh your character out as a person. You’ll need to decide your character’s appearance and personality. Choose your character’s alignment (the moral compass that guides his or her decisions) and ideals. Identify the things your character holds most dear, called bonds, and the flaws that could one day undermine him or her.</p>
				</div>

			);
		} else if( !(this.props.race && this.props.charClass ) ){
			return (
				<div>
					<h3>Please finish your race and class selections before attempting the finer details.</h3> 
				</div>
			)
		} else if(!complete){
			return (
				<div className="newCharacterDetails">
					<h1>Character Details</h1>
					<div><h2>Traits</h2></div>
          <div  className="traitHeader">
            <p>A character trait isn’t just another kind of power you can add on to your character — 
            it’s a way to quantify (and encourage) building a character background that fits into your 
            campaign world. Think of character traits as “story seeds” for your background; after you 
            pick your traits, you’ll have a point of inspiration from which to build your character’s 
            personality and history. Alternatively, if you’ve already got a background in your head or 
            written down for your character, you can view picking his traits as a way to quantify that 
            background.</p>
            <select ref="traitCategorySelection" onChange={() => this.filterTraits(this.refs.traitCategorySelection.value)}>
              <option value="Hide">Hide</option>
              <option value="All">All</option>
              {traitCategories && traitCategories.map((category) =>
                <option key={category} value={category}>{capitalizeFirstLetter(category)}</option>
              )}
            </select>            
          </div>
          <div className="traitDisplay">
            <div className="placeholderForScrolling"></div>
            {filteredTraitsList.map((trait) => 
              <CardTrait key={trait.Name} 
                name={trait.Name} 
                description={trait.Description} 
                id={trait.id}
                category={trait.Category ? trait.Category : trait.Type}
                // we are ignoring trait requirements for this project
                /* reqAlign={trait["Req-Align"]}      
                reqClass={trait["Req-Class"]}
                reqFaith={trait["Req-Faith"]}         
                reqOther={trait["Req-Other"]}
                reqPlace={trait["Req-Place"]}
                reqRace1={trait["Req-Race1"]}
                reqRace2={trait["Req-Race2"]} */
                callback={()=> this.showExpandedTrait(trait.Name)}
                />  
            )}
          </div>
          
          <form onSubmit={this.props.handleSubmit(this.submitHandler.bind(this))}>
            <div><h2>Belief Details</h2><p>Alignment and faith</p>
              <Field name={"alignments"} component={RenderSelect} label={"Alignment"}>
                <option>--</option>
                {possibleAlignments.map((alignment => (
                  <option key={alignment} value={alignment}>{alignment}</option>
                )))}
              </Field>
              {selectedDeity && <Field name="deity" component={RadioGroup} label="Deity" preset={true} options={
                deities.map((deity) => (
                  { title: capitalizeFirstLetter(deity.name), value: deity.name, checked: selectedDeity.name === deity.name ? true : false, 
                  disabled: selectedDeity.name === deity.name ? false : true }
                ))
              } />}
              {!selectedDeity && <Field name="deity" component={RadioGroup} label="Deity" preset={false} options={
                deities.map((deity) => (
                  { title: capitalizeFirstLetter(deity.name), value: deity.name}
                ))
              } />}
            </div>
            <div><h2>Physical Characteristics</h2><p>Hair, skin, eyes, height, weight, age, and gender</p>
              {physicalCharacteristics.map((item, index) => {
                return (<Field name={item} component={RenderInput} label={capitalizeFirstLetter(item)} key={index} />);
              })}
              <Field name="gender" component={RadioGroup} label="Gender" options={[
                  { title: 'Male', value: 'male' },
                  { title: 'Female', value: 'female' }
              ]} />
            </div>
            <div><h2>Personality Characteristics</h2><p>Personality traits, ideals, and flaws</p>
              <Field component={RenderTextarea} name={"personalityTraits"} label={"Personality traits"} key={0} />
              {personalityCharacteristics.map((item, index) => {
                return (<Field component={RenderTextarea} name={item} label={capitalizeFirstLetter(item)} key={index+1} />);
              })}
            </div>
            <div><h2>Extras and Notes</h2><p>Organizations, allies, enemies, backstory, and other notes</p>
              {extras.map((item, index) => {
                return (<Field component={RenderTextarea} name={item} label={capitalizeFirstLetter(item)} key={index} />);
              })}
            </div>
						<button type="submit" disabled={/* this.props.pristine ||  */this.props.submitting || !traitsCompleted}>Submit</button>
					</form>			        
			    </div>
		    );
		} else {
			return(
        <div className="newCharacterDetails">
          <h3>Character Details</h3>
          <button onClick={() => this.dispatchResetCompletedStep()}>Edit</button>
          <CharacterReview />
        </div>			
			);
		}	
	}
}

/* function DisplayTraits(props){
	const traitCategories = props.traitCategories;
	return(
		<div>
      <p>A character trait isn’t just another kind of power you can add on to your character — 
      it’s a way to quantify (and encourage) building a character background that fits into your 
      campaign world. Think of character traits as “story seeds” for your background; after you 
      pick your traits, you’ll have a point of inspiration from which to build your character’s 
      personality and history. Alternatively, if you’ve already got a background in your head or 
      written down for your character, you can view picking his traits as a way to quantify that 
      background.</p>
      <select ref="traitCategorySelection" onChange={() => this.filterTraits(this.refs.traitCategorySelection.value)}>
        <option value="All">All</option>
        {traitCategories && traitCategories.map((category) =>
          <option key={category} value={category}>{capitalizeFirstLetter(category)}</option>
        )}
      </select>			
    </div>
	)
} */

const createRenderer = render => ({ input, meta, label, ...rest }) => 
	<div>
	<label>{label}</label>
	{render(input, label, rest)}
	</div>
const RenderInput = createRenderer((input, label) => 
	<input { ... input} placeholder={label}></input>			
)
const RenderSelect = createRenderer((input, label, { children }) => 
	<select { ... input}>
	{children}
	</select>			
)
const RenderTextarea = createRenderer((input, label, value) =>
	<input type="textarea" { ... input}/>)

class RadioGroup extends React.Component {
    render() {
        const { input, meta, options, label, preset } = this.props
        const hasError = meta.touched && meta.error;

        if(preset){
			return (
				<div>
					<label>{label}</label>
					{options.map(o => <label key={o.value}><input type="radio" {...input} value={o.value} checked={o.checked}
						disabled={o.disabled} /> {o.title}</label>)}
					{hasError && <span className="error">{meta.error}</span>}
				</div>
			);
		} else {
			return (
				<div>
					<label>{label}</label>
					{options.map(o => <label key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</label>)}
					{hasError && <span className="error">{meta.error}</span>}
				</div>
			)
		}
    }
}

/* function DisplayCharacterDetails(props){
	const deities = props.deities; //require('../data/deities');
	const defaultAlignments = ["Chaotic evil", "Chaotic good", "Chaotic neutral",
		"Lawful evil", "Lawful good", "Lawful neutral",
		"Neutral", "Neutral evil", "Neutral good"];
	const possibleAlignments = props.alignmentRestrictions ? props.alignmentRestrictions : defaultAlignments;
	
	return(
		<div>
		<Field name={"alignments"} component={RenderSelect} label={"Alignment"}>
			<option>--</option>
			{possibleAlignments.map((alignment => (
				<option key={alignment} value={alignment}>{alignment}</option>
			)))}
		</Field>
		{props.deity && <Field name="deity" component={RadioGroup} label="Deity" preset={true} options={
			deities.map((deity) => (
				{ title: capitalizeFirstLetter(deity.name), value: deity.name, checked: props.deity.name === deity.name ? true : false, 
				disabled: props.deity.name === deity.name ? false : true }
			))
		} />}
		{!props.deity && <Field name="deity" component={RadioGroup} label="Deity" preset={false} options={
			deities.map((deity) => (
				{ title: capitalizeFirstLetter(deity.name), value: deity.name}
			))
		} />}
		</div>
	)
} */

/* function DisplayPhysicalCharacteristics(){
	const physicalCharacteristics = ["hair", "skin", "eyes", "height", "weight", "age"];
	return(
		<div>
			{physicalCharacteristics.map((item, index) => {
				return (<Field name={item} component={RenderInput} label={capitalizeFirstLetter(item)} key={index} />);
			})}
			<Field name="gender" component={RadioGroup} label="Gender" options={[
			    { title: 'Male', value: 'male' },
			    { title: 'Female', value: 'female' }
			]} />
		</div>
	)
} */

/* function DisplayPersonalityCharacteristics(){
	const personalityCharacteristics = ["ideals", "flaws"]
	return(
		<div>
			<Field component={RenderTextarea} name={"personalityTraits"} label={"Personality traits"} key={0} />
			{personalityCharacteristics.map((item, index) => {
				return (<Field component={RenderTextarea} name={item} label={capitalizeFirstLetter(item)} key={index+1} />);
			})}			
		</div>
	)
} */

/* function DisplayExtras(){
	const extras = ["organizations", "allies", "enemies", "backstory", "other"]
	return(
		<div>
			{extras.map((item, index) => {
				return (<Field component={RenderTextarea} name={item} label={capitalizeFirstLetter(item)} key={index} />);
			})}			
		</div>
	)
} */

/* const validate = values => {
  const errors = {}
  console.log(values);

  if(!values.alignments){    
    errors.alignments = 'Required'
  }

	return errors
}
const warn = values => {
  const warnings = {}
  
  return warnings
} */

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[4].complete,
	race:state.characterReducer.creationSteps[1].complete,
	help:state.characterReducer.help,
	expand:state.characterReducer.detailsExpand,
	charClass:state.characterReducer.creationSteps[2].complete,
	charDetails:state.characterReducer.newCharacter.details,
  deities:state.protectedData.data,
  traitsList:state.protectedData.subData,
  traitFilter:state.characterReducer.traitFilter,
  toExpand:state.characterReducer.expanded, 
  traits:state.characterReducer.newCharacter.traitSlots,
});

NewCharacterDetails = reduxForm({
    form: 'detailsForm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('detailsForm', Object.keys(errors)[0])),
    /* validate,
    warn */
})(NewCharacterDetails)

export default connect(mapStateToProps)(NewCharacterDetails)