import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, Fields, SubmissionError, focus, formValueSelector, change } from 'redux-form';
import { capitalizeFirstLetter, arrayToSentence, statIndex } from '../utility/helperFunctions';

import { setSelections } from '../actions/index';
// validation
const required = value => value ? undefined : "Required";
const isCraftOrProfession = value => 
	(value && (/craft\s\(.+\)/i.test(value) || /profession\s\(.+\)/i.test(value) )) ? undefined : "this must be in the following pattern; craft or profession (detail)";
const validate = values => {
	const errors = {}

	return errors
}

export class SelectionFormRace extends React.Component{
	hideSelections(){
		this.props.dispatch(setSelections(""));
	}

	render(){
		const race = "";
		const submitting = this.props.submitting;
		const onSubmitFormAasimar = (values) => {
			console.log(values);
			const selectionsHeritage = values.selectionsHeritage;
			console.log(selectionsHeritage);
			// #TODO
			//this.props.dispatch(setSelections(""));
		};
		const onSubmitFormGnome = (values) => {
			console.log(values);
			// this must be in one of the following two formats
			// Craft (xyz) or Profession (abc)
			const selectionsObsessive = values.selectionsObsessive;
			console.log(selectionsObsessive);
			if(!selectionsObsessive){

			} 

			//this.props.dispatch(setSelections(""));
		};
		const onSubmitFormHalfElf = (values) => {
			console.log("doing a cool thing");
			console.log(values);
			this.props.dispatch(setSelections(""));
		};
		const onSubmitFormHalfOrc = (values) => {
			console.log("doing a cool thing");
			console.log(values);
			this.props.dispatch(setSelections(""));
		};
		const onSubmitFormHuman = (values) => {
			console.log("doing a cool thing");
			console.log(values);
			this.props.dispatch(setSelections(""));
		};

		const createRenderer = render => ({ input, meta, label, options, ...rest }) => 
			<div>
				<label>{label}</label>
				{render(input, label, rest, options)}
				{meta.touched && meta.error && <span>{meta.error}</span>}
			</div>
		const RenderRadio = createRenderer((input, label, value) => 
			<input type="radio" value={value} { ... input}/>
		)
		class RadioGroup extends React.Component {
		    render() {
		        const { input, meta, options, label } = this.props
		        const hasError = meta.touched && meta.error;

		        return (
		            <div>
						<label>{label}</label>
		                {options.map(o => <label key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</label>)}
		                {hasError && <span className="error">{meta.error}</span>}
		            </div>
		        );
		    }
		}
		const RenderInput = createRenderer((input, label, value) => 
			<input value={value} { ... input}/>
		)
		// find out what selections to display, 
		// This could be abstracted, but is hardcoded for now
		switch(this.props.name){
			case "Aasimar":
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitFormAasimar) }>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
						<h4>Select the one of the following options:</h4>
					{/* I would love to be able to have cards here and make it work with the form*/}
						<Field name="selectionsHeritage" ref="selectionsHeritage" component={RadioGroup} label="Aasimar Heritage: " options={[
							    { title: 'Traditional (wis and cha)', value: 'traditional' },
								{ title: 'Agathion-Blooded (con and cha)', value: 'agathion' },
								{ title: 'Angel-Blooded (str and cha)', value: 'angel' },
								{ title: 'Archon-Blooded (con and wis)', value: 'archon' },
								{ title: 'Azata-Blooded (dex and cha)', value: 'azata' },
								{ title: 'Garuda-Blooded (dex and wis)', value: 'garuda' },
								{ title: 'Peri-Blooded (int and cha)', value: 'peri' }
							]} validate={[required]}/>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>
				)
			case "Gnome": 
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitFormGnome) }>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
						<h4>Select the following options:</h4>
						<Field name="selectionsObsessive" ref="selectionsObsessive" component={RenderInput} 
							label="Input a craft or profession skill:" validate={[required, isCraftOrProfession]}/>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>
					)
			case "Half Elf": 
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitFormHalfElf) }>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
						<h4>Select the following options:</h4>
						<Field name="selectionsAbilityScores" ref="selectionsAbilityScores" component={RadioGroup} label="Ability Score Bonus:" options={[
							    { title: 'Strength', value: 'strength' },
								{ title: 'Dexterity', value: 'dexterity' },
								{ title: 'Constitution', value: 'constitution' },
								{ title: 'Intelligence', value: 'intelligence' },
								{ title: 'Wisdom', value: 'wisdom' },
								{ title: 'Charisma', value: 'charisma' }
							]} validate={[required]}/>
						<Field name="selectionsSkillFocus" ref="selectionsSkillFocus" component={RadioGroup} label="What skill would you like your focus in?" options={[
							    { title: 'Acrobatics', value: 'acrobatics' },
								{ title: 'Appraise', value: 'appraise' },
								{ title: 'Buff', value: 'buff' },
								{ title: 'Climb', value: 'climb' },
								{ title: 'Craft', value: 'craft' },
								{ title: 'Diplomacy', value: 'diplomacy' },
								{ title: 'Disable Device', value: 'disableDevice' },
								{ title: 'Disguise', value: 'disguise' },
								{ title: 'Escape Artist', value: 'escapeArtist' },
								{ title: 'Fly', value: 'fly' },
								{ title: 'Handle Animal', value: 'handleAnimal' },
								{ title: 'Heal', value: 'heal' },
								{ title: 'Intimidate', value: 'intimidate' },
								{ title: 'Knowledge (Arcana)', value: 'knowledge (arcana)' },
								{ title: 'Knowledge (Dungeoneering)', value: 'knowledge (dungeoneering)' },
								{ title: 'Knowledge (Engineering)', value: 'knowledge (engineering)' },
								{ title: 'Knowledge (Geography)', value: 'knowledge (geography)' },
								{ title: 'Knowledge (History)', value: 'knowledge (history)' },
								{ title: 'Knowledge (Local)', value: 'knowledge (local)' },
								{ title: 'Knowledge (Nature)', value: 'knowledge (nature)' },
								{ title: 'Knowledge (Nobility)', value: 'knowledge (nobility)' },
								{ title: 'Knowledge (Planes)', value: 'knowledge (planes)' },
								{ title: 'Knowledge (Religion)', value: 'knowledge (religion)' },
								{ title: 'Linguistics', value: 'linguistics' },
								{ title: 'Perception', value: 'perception' },
								{ title: 'Perform', value: 'perform' },
								{ title: 'Profession', value: 'profession' },
								{ title: 'Ride', value: 'ride' },
								{ title: 'Sense Motive', value: 'senseMotive' },
								{ title: 'Sleight of Hand', value: 'sleightOfHand' },
								{ title: 'Spellcraft', value: 'spellcraft' },
								{ title: 'Stealth', value: 'stealth' },
								{ title: 'Survival', value: 'survival' },
								{ title: 'Swim', value: 'swim' },
								{ title: 'Use Magic Device', value: 'useMagicDevice' }
							]} validate={[required]}/>
						<Field name="selectionsMultitalented" component={RenderInput} label="What is your second favored class?" 
							validate={[required]}/>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>	
				)
			case "Half Orc":
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitFormHalfOrc) }>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
						<h4>Select the following options:</h4>
						<Field name="selectionsAbilityScores" ref="selectionsAbilityScores" component={RadioGroup} label="Ability Score Bonus:" options={[
							{ title: 'Strength', value: 'strength' },
							{ title: 'Dexterity', value: 'dexterity' },
							{ title: 'Constitution', value: 'constitution' },
							{ title: 'Intelligence', value: 'intelligence' },
							{ title: 'Wisdom', value: 'wisdom' },
							{ title: 'Charisma', value: 'charisma' }
						]} validate={[required]}/>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>	
				)
			case "Human":
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitFormHuman) }>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
						<h4>Select the following options:</h4>
						<Field name="selectionsAbilityScores" ref="selectionsAbilityScores" component={RadioGroup} label="Ability Score Bonus:" options={[
							{ title: 'Strength', value: 'strength' },
							{ title: 'Dexterity', value: 'dexterity' },
							{ title: 'Constitution', value: 'constitution' },
							{ title: 'Intelligence', value: 'intelligence' },
							{ title: 'Wisdom', value: 'wisdom' },
							{ title: 'Charisma', value: 'charisma' }
						]} validate={[required]}/>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>
				)
			default:
				return null;			
		};
	}	
}

const mapStateToProps = state => ({
	
});

SelectionFormRace = reduxForm({
	form:'SelectionFormRace',

    validate
})(SelectionFormRace)

export default connect(mapStateToProps)(SelectionFormRace);