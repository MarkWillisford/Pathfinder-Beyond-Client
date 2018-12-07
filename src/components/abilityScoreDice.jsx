import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, formValueSelector, change } from 'redux-form';
import { DynamicSelect } from './dynamicSelect';

import { setAvailableStats } from '../actions/index';
import { saveAbilityScoreOptions } from '../actions/index';
import { submitAbilityScoreToState } from '../actions/index';
import { setStepToComplete } from '../actions/index';

/*onChange={()=> this.handleClick(this.refs.abilityScoreGenerationMethod.value)}*/
export class AbilityScoreDice extends React.Component {
	constructor(props){
		super(props);
		this.state = { allOptions:[] };
	}

    onSubmit(values) {
    	// at this point, the ability scores are already saved in the store. We just need to toggle the 
    	// step.complete to rerender.
    	this.props.dispatch(setStepToComplete(3));
    }

    rollDice(event){
    	event.preventDefault();
    	let dice = event.target.value // This needs the value of the diceSelecter select
    	dice = this.props.diceOptions;

    	dice = parseInt(dice.substring(0,1));
    	let statArray = [];
    	for(let a=0;a<6;a++){
			let number = 0;
			let lowest = 18;
			for(let i=0;i<dice;i++){
				let die = this.getRandomInt(1,6);
				number = number + die;
				if (die <= lowest){
					lowest = die;
				}
			}
			if(dice == 4){
				number = number - lowest;
			}
			statArray.push(number);
		}
		// lets sort them for display purposes. 
		statArray.sort(function(a,b){ return b - a;});
		this.setState({
      		allOptions: statArray.map((item, index) => ({id: index.toString(), value: item})), 
    	});
    	this.SaveAbilityScoreOptions(this);
    }

    getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	AbilityScoreSelectedCallBack(event){
		// get the number selected 
		let value = 0;
		if(event.target.value){
			value = this.state.allOptions[event.target.value].value;
		};
		// Get the name of the ability as a string by finding the name of the select element, splitting
		// on capital letters (the S in strength'S'electer) and taking only the first string in the result
		let ability = event.target.name.split(/(?=[A-Z])/)[0];
		this.props.dispatch(submitAbilityScoreToState( ability, "base", value ));	
	}

	SaveAbilityScoreOptions(caller){
		let options = caller.state.allOptions;
		caller.props.dispatch(saveAbilityScoreOptions(options));		
	}

	render(){
		const diceOptions = ["3d6","4d6"];
		const createRenderer = render => ({ input, meta, label, ...rest }) => 
			<div>
			<label>{label}</label>
			{render(input, label, rest)}
			</div>

		const RenderSelect = createRenderer((input, label, { children }) => 
			<select { ... input}>
			{children}
			</select>
		)

		return (
			<form onSubmit={ this.props.handleSubmit(values=>this.onSubmit(values) )}> 
				<Field name="diceSelecter" id="diceSelecter" label="How many dice do you get to roll?" component={RenderSelect}>
					<option />
					{diceOptions.map(option => 
						<option key={option} value={option}>
							{option}
						</option>
					)}
				</Field>
				<button onClick={this.rollDice.bind(this)} disabled={!this.props.diceOptions}>Roll</button>			
				<Field 
					name="strengthSelecter" 
					id="strengthSelecter" 
					label="strength" 
					options={this.state.allOptions}
					unavaliableOptions={this.props.unavaliableOptions}
					component={DynamicSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="dexteritySelecter" 
					id="dexteritySelecter" 
					label="dexterity" 
					options={this.state.allOptions}
					unavaliableOptions={this.props.unavaliableOptions}
					component={DynamicSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="constitutionSelecter" 
					id="constitutionSelecter" 
					label="constitution" 
					options={this.state.allOptions}
					unavaliableOptions={this.props.unavaliableOptions}
					component={DynamicSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="intelligenceSelecter" 
					id="intelligenceSelecter" 
					label="intelligence"
					options={this.state.allOptions}
					unavaliableOptions={this.props.unavaliableOptions}
					component={DynamicSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="wisdomSelecter" 
					id="wisdomSelecter" 
					label="wisdom"
					options={this.state.allOptions}
					unavaliableOptions={this.props.unavaliableOptions}
					component={DynamicSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="charismaSelecter" 
					id="charismaSelecter" 
					label="charisma"
					options={this.state.allOptions}
					unavaliableOptions={this.props.unavaliableOptions}
					component={DynamicSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>

				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		)
	}
}

const dynamicFields = ["strengthSelecter", "dexteritySelecter", "constitutionSelecter", 
					"intelligenceSelecter", "wisdomSelecter", "charismaSelecter"];
const selector = formValueSelector('diceForm');

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[3].complete,
	unavaliableOptions: dynamicFields.map(f => selector(state, f)).filter(Boolean), //?????
	baseStrength: selector(state, "strengthSelecter"),
	diceOptions: selector(state, "diceSelecter")
})

AbilityScoreDice = reduxForm({
    form: 'diceForm',
/*    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('dice', Object.keys(errors)[0]))*/
})(AbilityScoreDice)

export default connect(mapStateToProps)(AbilityScoreDice);