import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, Fields, SubmissionError, focus, formValueSelector, change } from 'redux-form';
import { capitalizeFirstLetter, arrayToSentence, statIndex } from '../utility/helperFunctions';

import { setSelections } from '../actions/index';

const validate = values => {
	const errors = {}
	console.log(this.refs)
	if(!values.selections){
		errors.selections = "Required"
	}
	
	return errors
}

export class SelectionFormRace extends React.Component{
	hideSelections(){
		this.props.dispatch(setSelections(""));
	}

	render(){
		const race = "";
		const aasimarHeritages = require('../data/aasimarHeritages');
		const submitting = this.props.submitting;
		const onSubmitForm = (values) => {
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
					<form onSubmit={this.props.handleSubmit(onSubmitForm) }>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
						<h4>Select the one of the following options:</h4>
					{/* I would love to be able to have cards here and make it work with the form*/}
						<Field name="selectionsHeritage" ref="selectionsHeritage" component={RadioGroup} label="Aasimar Heritage: " options={[
							    { title: 'Traditional (wis and cha)', value: 'traditional' },
								{ title: 'Agathion-Blooded (con and cha)', value: 'dexterity' },
								{ title: 'Angel-Blooded (str and cha)', value: 'constitution' },
								{ title: 'Archon-Blooded (con and wis)', value: 'intelligence' },
								{ title: 'Azata-Blooded (dex and cha)', value: 'wisdom' },
								{ title: 'Garuda-Blooded (dex and wis)', value: 'charisma' },
								{ title: 'Peri-Blooded (int and cha)', value: 'charisma' }
							]} />
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>
				)
			case "Gnome": 
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitForm) }>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
						<h4>Select the following options:</h4>
						<Field name="selectionsObsessive" ref="selectionsObsessive" component={RenderInput} label="Input a craft or profession skill:"/>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>
					)
			case "Half Elf": 
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitForm) }>
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
							]} />
							<!  TODO!  select for spell focus as a free feat. 
						<Field name="selectionsMultitalented" component={RenderInput} label="What is your second favored class?" />
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>	
				)
			case "Half Orc":
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitForm) }>
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
						]}/>
						<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
						<button type="submit" disabled={submitting}>Submit</button>
					</form>	
				)
			case "Human":
				return(
					<form onSubmit={this.props.handleSubmit(onSubmitForm) }>
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
						]}/>
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