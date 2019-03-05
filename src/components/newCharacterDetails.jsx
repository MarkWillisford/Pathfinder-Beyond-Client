import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus } from 'redux-form';
import { CardDeity } from './cardDeity';

import { toggleDetailsExpand } from '../actions/index';
import { submitDetailsToState } from '../actions/index';
import { capitalizeFirstLetter } from '../utility/helperFunctions';

import './newCharacterDetails.css';

export class NewCharacterDetails extends React.Component{
	submitHandler(values) {
	    console.log(values);
	    this.props.dispatch(submitDetailsToState(values));
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

	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		const expand = this.props.expand;
		const deity = this.props.charDetails ? this.props.charDetails.deity : null;
		const alignmentRestrictions = this.props.charDetails ? ( 
			this.props.charDetails.alignmentRestrictions ? this.props.charDetails.alignmentRestrictions : null
			) : null;
		// this constant is just an abstraction for the moment, in the future this will be an editable variable
		// const numberOfTraits = 3;

		// if help is true, that screen is displayed
		if(help){
			return ( 
				<div className="detailsHelp">
					<h2>Character Details</h2>
					<p>In this step, you will flesh your character out as a person. You’ll need to decide your character’s appearance and personality. Choose your character’s alignment (the moral compass that guides his or her decisions) and ideals. Identify the things your character holds most dear, called bonds, and the flaws that could one day undermine him or her.</p>
				</div>
			);
		} else if(!complete){
			return (
				<form onSubmit={this.props.handleSubmit(this.submitHandler.bind(this))}>
			        <div className="newCharacterDetails">
				        <h1>Character Details</h1>
				        <div><h2>Traits</h2>
				        <button onClick={this.handleToggle.bind(this, "0")}>Expand</button></div>
				        {expand[0].expand && <DisplayTraits />}

				        <div><h2>Character Details</h2><p>Alignment and faith</p>
				        <button onClick={this.handleToggle.bind(this, "1")}>Expand</button></div>
				        {expand[1].expand && <DisplayCharacterDetails deity={deity} alignmentRestrictions={alignmentRestrictions}/>}

				        <div><h2>Physical Characteristics</h2><p>Hair, skin, eyes, height, weight, age, and gender</p>
				        <button onClick={this.handleToggle.bind(this, "2")}>Expand</button></div>
				        {expand[2].expand && <DisplayPhysicalCharacteristics />}				        

				        <div><h2>Personality Characteristics</h2><p>Personality traits, ideals, and flaws</p>
				        <button onClick={this.handleToggle.bind(this, "3")}>Expand</button></div>
				        {expand[3].expand && <DisplayPersonalityCharacteristics />}				        

				        <div><h2>Extras and Notes</h2><p>Organizations, allies, enemies, backstory, and other notes</p>
				        <button onClick={this.handleToggle.bind(this, "4")}>Expand</button></div>
				        {expand[4].expand && <DisplayExtras />}				        
			        </div>
			    	<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
				</form>
		    );
		} else {
			return(
		        <div className="newCharacterDetails">
		        	<h1>Character Details - done</h1>	
		        </div>			
			);
		}	
	}
}

function DisplayTraits(){
	const traitsList = require('../data/traits');

	let traitBasicTypes = ["Combat", "Faith", "Magic", "Social"];
	let traitTypes = ["Race", "Regional", "Religion"];
	let traitsToDisplay=[];
	let index = 0;
	let count = 0;
	// these two loops get five of each of the above types and basic types to display
	for(let i=0;i<traitBasicTypes.length;i++){
		while(count < 5){
			if(traitsList[index].Type === "Basic"){
				if(traitsList[index].Category === traitBasicTypes[i]){
					traitsToDisplay.push(traitsList[index]);
					count++;
				}
			}
			index++
		};
		count = 0;		
	}
	for(let i=0;i<traitTypes.length;i++){
		while(count < 5){
			if(traitsList[index].Type === traitTypes[i]){
				traitsToDisplay.push(traitsList[index]);
				count++;
			}
			index++
		};
		count = 0;		
	}

	return(
		<div>
        	<p>A character trait isn’t just another kind of power you can add on to your character — 
        	it’s a way to quantify (and encourage) building a character background that fits into your 
        	campaign world. Think of character traits as “story seeds” for your background; after you 
        	pick your traits, you’ll have a point of inspiration from which to build your character’s 
        	personality and history. Alternatively, if you’ve already got a background in your head or 
        	written down for your character, you can view picking his traits as a way to quantify that 
        	background.</p>
        	<p><strong>Combat</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Combat"/> }
        	<p><strong>Faith</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Faith"/> }
        	<p><strong>Magic</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Magic"/> }
        	<p><strong>Social</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Social"/> }
        	<p><strong>Campaign</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Campaign"/> }
        	<p><strong>Race</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Race"/> }
        	<p><strong>Regional</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Regional"/> }
        	<p><strong>Religion</strong></p>
        	{<DisplayTraitOptions traitsToDisplay={traitsToDisplay} type="Religion"/> }
    	</div>
	)
}

function DisplayTraitOptions(props){
	let type = props.type;
	let array = [];
	for(let i=0;i<props.traitsToDisplay.length;i++){
		if(props.traitsToDisplay[i].Type == type || props.traitsToDisplay[i].Category == type){
			array.push( { title: props.traitsToDisplay[i].Name, value: props.traitsToDisplay[i].Name } );
		}
	}
	return(
		<Field name={type} component={RadioGroup} options={array} />
	)
}

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

function DisplayCharacterDetails(props){
	const deities = require('../data/deities');
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
}

function DisplayPhysicalCharacteristics(){
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
}

function DisplayPersonalityCharacteristics(){
	const personalityCharacteristics = ["ideals", "flaws"]
	return(
		<div>
			<Field component={RenderTextarea} name={"personalityTraits"} label={"Personality traits"} key={0} />
			{personalityCharacteristics.map((item, index) => {
				return (<Field component={RenderTextarea} name={item} label={capitalizeFirstLetter(item)} key={index+1} />);
			})}			
		</div>
	)
}

function DisplayExtras(){
	const extras = ["organizations", "allies", "enemies", "backstory", "other"]
	return(
		<div>
			{extras.map((item, index) => {
				return (<Field component={RenderTextarea} name={item} label={capitalizeFirstLetter(item)} key={index} />);
			})}			
		</div>
	)
}

const validate = values => {
	const errors = {}

	if(!values.alignments){
		errors.alignments = "Required"
	}
	if(!values.Age){
		errors.Age = "Required"
	}
	if(!values.gender){
		errors.gender = "Required"
	}
	return errors
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[4].complete,
	help:state.characterReducer.help,
	expand:state.characterReducer.detailsExpand,
	charDetails:state.characterReducer.newCharacter.details,
});

NewCharacterDetails = reduxForm({
    form: 'detailsForm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('detailsForm', Object.keys(errors)[0])),
    validate
})(NewCharacterDetails)

export default connect(mapStateToProps)(NewCharacterDetails)