import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field } from 'redux-form';
import {submitPreferencesToState} from '../actions/index';
import CharacterReview from './characterReview2';
import { resetCompletedStep } from '../actions/index';

import './newCharacterPreferences.css';

const validate = values => {
	const errors = {}

	if(!values.advancementSelecter){
		errors.advancementSelecter = "Required"
	}
	if(!values.hpSelecter){
		errors.hpSelecter = "Required"
  }
  if(!values.characterName){
		errors.characterName = "Required"
  }

	return errors
}

export class NewCharacterPreferencesForm extends React.Component{
  dispatchResetCompletedStep(){
    this.props.dispatch(resetCompletedStep(0));
  }

	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		const submitting = this.props.submitting;
		const onSubmitForm = (values) => {
			this.props.dispatch(submitPreferencesToState(values));
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
					<div className={"characterBasicsInputDiv"}>
            <Field component={RenderTextarea} name={"characterName"} label={"Character name"} key={0}/>
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
					</div>
					<button type="submit" disabled={submitting}>Submit</button>
				</form>
		    );
		} else {
			return(
        <div className="newCharacterPerferances">
          <CharacterReview resetCallback={()=>this.dispatchResetCompletedStep()} page={"Basics"}/>
        </div>			
			);
		}		
	}
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

const RenderTextarea = createRenderer((input, label, value) =>
  <input type="textarea" { ... input} className="characterInputBox"/>
)

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[0].complete,
  help:state.characterReducer.help,
});

NewCharacterPreferencesForm = reduxForm({
	form:'characterPreferencesForm',

    validate
})(NewCharacterPreferencesForm)

export default connect(mapStateToProps)(NewCharacterPreferencesForm);