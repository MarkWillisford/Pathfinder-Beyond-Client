import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, formValueSelector, change } from 'redux-form';
import {submitPreferencesToState} from '../actions/index';

import './newCharacterPreferences.css';
// for testing
import showResults from './showResults';

const validate = values => {
	const errors = {}

	if(!values.advancementSelecter){
		errors.advancementSelecter = "Required"
	}
	if(!values.hpSelecter){
		errors.hpSelecter = "Required"
	}
	/*if(!values.encumberence){
		errors.encumberence = "Required"
	}
	if(!values.coinWeight){
		errors.coinWeight = "Required"
	}
	if(!values.monsterRacesAllowed){
		errors.monsterRacesAllowed = "Required"
	}
	if(!values.templateRuleSelecter){
		errors.templateRuleSelecter = "Required"
	}*/

	return errors
}

export class NewCharacterPreferencesForm extends React.Component{
	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		const submitting = this.props.submitting;
		const onSubmitForm = (values) => {
			this.props.dispatch(submitPreferencesToState(values));
		}

		const createRenderer = render => ({ input, meta, label, options, ...rest }) => 
			<div>
				<label>{label}</label>
				{render(input, label, rest, options)}
				{meta.touched && meta.error && <span>{meta.error}</span>}
			</div>

		const RenderSelect = createRenderer((input, label, { children }) => 
			<select { ... input}>
			{children}
			</select>			
		)
		const RenderRadio = createRenderer((input, label, value) => 
			<input type="radio" value={value} { ... input}/>
		)
/*		const RadioGroup = createRenderer((input, label, options) => 	
			{options.map(o => <label key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</label>)}
		)*/
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


		// if help is true, that screen is displayed
		if(help){
			return ( 
				<div className="preferencesHelp">
					<h2>The Basics</h2>
					<p>The first step in any roleplaying game is to imagine and then create a character.</p>
					<p>You choose a race, such as Human or Gnome, and a class, such as paladin or sorcerer. You also create the personality, looks and backstory of the character. Once finished, it is this character that will explore and adventure within the story world your DM is running.</p>
					<p>Before you go much further, think a bit about the kind of adventurer you want to play. You might be a heroic Paladin, fighting the evils of the world, a flamboyant half-orc sorcerer, or a staunchy tribal fighter, dedicated to protecting its party. Once you have a character concept in mind, follow the steps lain out here in order, making choices that reflect the character you want to build. The only really important thing is that you come to the table with a character you're excited to play.</p>
					<h3>Preferences</h3>
					<p>The first step includes various preferences for your character. Most of these are determined by your DM so check with them if you have any questions.</p>
				</div>
			);
		} 
		// else check for complete,
		else if(!complete){
			return (
				<form onSubmit={this.props.handleSubmit(onSubmitForm) }>
					<h1>Character Basics</h1>
					<div>
						<Field name="advancementSelecter" label="How will this character advance?" component={RenderSelect}>
							<option />
			        		<option value="slow">Slow</option>
			        		<option value="normal">Normal</option>
			        		<option value="fast">Fast</option>
			        		<option value="story">Story</option>			
						</Field>
						<Field name="hpSelecter" label="How will hit points be handled?" component={RenderSelect}>
							<option />
			        		<option value="auto">Roller</option>
			        		<option value="avg">Average</option>
			        		<option value="max">Max</option>
			        		<option value="manual">Manual</option>
			        		<option value="optional">Optional</option>		
						</Field>
{/*						<Field name="encumberence" component={RadioGroup} label="Will this character use the optional encumberence rules?" options={[
						    { title: 'Yes', value: 'yes' },	// Why do I have to click this twice???
						    { title: 'No', value: 'no' }
						]} />
						<Field name="coinWeight" component={RadioGroup} label="Should we track coin weight?" options={[
						    { title: 'Yes', value: 'yes' },
						    { title: 'No', value: 'no' }
						]} />
						<Field name="monsterRacesAllowed" component={RadioGroup} label="Are Monster races allowed?" options={[
						    { title: 'Yes', value: 'yes' },
						    { title: 'No', value: 'no' }
						]} />
						<label></label>
						<Field name="templateRuleSelecter" label="What rules govern the use of templates?" component={RenderSelect}>
							<option />
			        		<option value="none">None</option>
			        		<option value="level">Level</option>
			        		<option value="crRefunds">CR Refunds</option>	
						</Field>*/}
					</div>
					<button type="submit" disabled={submitting}>Submit</button>
				</form>
		    );
		} else {
			return(
		        <div className="newCharacterPerferances">
		        	<h1>Character Basics - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[0].complete,
	help:state.characterReducer.help,
});

NewCharacterPreferencesForm = reduxForm({
	form:'characterPreferencesForm',

    validate
})(NewCharacterPreferencesForm)

export default connect(mapStateToProps)(NewCharacterPreferencesForm);