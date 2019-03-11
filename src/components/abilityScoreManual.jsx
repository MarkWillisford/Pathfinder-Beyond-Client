import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus } from 'redux-form';

import { setStepToComplete } from '../actions/index';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { createBonus } from '../utility/statObjectFactories'

export class AbilityScoreManual extends React.Component {
    onSubmit(values) {
    	// at this point, the ability scores are already saved in the store. We just need to toggle the 
    	// step.complete to rerender.
    	this.props.dispatch(setStepToComplete(3));
    }

	AbilityScoreSelectedCallBack(event){
		// Get the name of the ability as a string by finding the name of the select element, splitting
		// on capital letters (the S in strength'S'electer) and taking only the first string in the result
		let ability = event.target.name.split(/(?=[A-Z])/)[0];
		let value = event.target.value;
		// this.props.dispatch(submitAbilityScoreToState( ability, "base", value ));	

		let bonus = createBonus({ 
			name:"character base", 
			source:"character base", 
			stat:ability, 
			type:"base", 
			duration:-1, 
			amount:value });
		this.props.dispatch(addBonus(bonus));
		this.props.dispatch(sumBonus(bonus));
	}

	render(){
		return (
			<form onSubmit={ this.props.handleSubmit(values=>this.onSubmit(values) )}> 		
				<Field 
					name="strengthSelecter" 
					id="strengthSelecter" 
					label="strength" 
					component={RenderInput}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="dexteritySelecter" 
					id="dexteritySelecter" 
					label="dexterity" 
					component={RenderInput}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="constitutionSelecter" 
					id="constitutionSelecter" 
					label="constitution" 
					component={RenderInput}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="intelligenceSelecter" 
					id="intelligenceSelecter" 
					label="intelligence"
					component={RenderInput}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="wisdomSelecter" 
					id="wisdomSelecter" 
					label="wisdom"
					component={RenderInput}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<Field 
					name="charismaSelecter" 
					id="charismaSelecter" 
					label="charisma"
					component={RenderInput}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>
				</Field>
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		)
	}
}

const createRenderer = render => ({ input, meta: {touched, error}, label, ...rest }) => 
<div>
<label>{label}</label>
{render(input, label, rest)}			
{touched && (error && <p className="help is-danger">{error}</p>)}
</div>

const RenderInput = createRenderer((input, label) => 
<input { ... input} placeholder={label}></input>			
)

const validate = values => {
	const errors = {}

	if(!values.strengthSelecter){
		errors.strengthSelecter = "Required"
	} else if(isNaN(Number(values.strengthSelecter))){
		errors.strengthSelecter = 'Must be a number'
	}
	if(!values.dexteritySelecter){
		errors.dexteritySelecter = "Required"
	} else if(isNaN(Number(values.dexteritySelecter))){
		errors.dexteritySelecter = 'Must be a number'
	}
	if(!values.constitutionSelecter){
		errors.constitutionSelecter = "Required"
	} else if(isNaN(Number(values.constitutionSelecter))){
		errors.constitutionSelecter = 'Must be a number'
	}
	if(!values.intelligenceSelecter){
		errors.intelligenceSelecter = "Required"
	} else if(isNaN(Number(values.intelligenceSelecter))){
		errors.intelligenceSelecter = 'Must be a number'
	}
	if(!values.wisdomSelecter){
		errors.wisdomSelecter = "Required"
	} else if(isNaN(Number(values.wisdomSelecter))){
		errors.wisdomSelecter = 'Must be a number'
	}
	if(!values.charismaSelecter){
		errors.charismaSelecter = "Required"
	} else if(isNaN(Number(values.charismaSelecter))){
		errors.charismaSelecter = 'Must be a number'
	}
	return errors
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[3].complete,
})

AbilityScoreManual = reduxForm({
    form: 'manualForm',
/*     onSubmitFail: (errors, dispatch) =>
        dispatch(focus('manual', Object.keys(errors)[0])), */
    validate
})(AbilityScoreManual)

export default connect(mapStateToProps)(AbilityScoreManual);