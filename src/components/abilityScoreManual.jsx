import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, formValueSelector, change } from 'redux-form';
import { DynamicSelect } from './dynamicSelect';

import { setAvailableStats } from '../actions/index';
import { saveAbilityScoreOptions } from '../actions/index';

export class AbilityScoreManual extends React.Component {
    onSubmit(values) {
    	console.log(values);
    	// This is our form "Output"
    }

	AbilityScoreSelectedCallBack(caller, ability){
		let options = caller.state.allOptions;
		caller.props.dispatch(saveAbilityScoreOptions(options));
	}

	render(){
		const createRenderer = render => ({ input, meta, label, ...rest }) => 
			<div>
			<label>{label}</label>
			{render(input, label, rest)}
			</div>

		const RenderInput = createRenderer((input, label) => 
			<input { ... input} placeholder={label}></input>			
		)

		return (
			<form onSubmit={ this.props.handleSubmit(values=>this.onSubmit(values) )}> 		
				<Field 
					name="strengthSelecter" 
					id="strengthSelecter" 
					label="strength" 
					component={RenderInput}
				</Field>
				<Field 
					name="dexteritySelecter" 
					id="dexteritySelecter" 
					label="dexterity" 
					component={RenderInput}>
				</Field>
				<Field 
					name="constitutionSelecter" 
					id="constitutionSelecter" 
					label="constitution" 
					component={RenderInput}>
				</Field>
				<Field 
					name="intelligenceSelecter" 
					id="intelligenceSelecter" 
					label="intelligence"
					component={RenderInput}>
				</Field>
				<Field 
					name="wisdomSelecter" 
					id="wisdomSelecter" 
					label="wisdom"
					component={RenderInput}>
				</Field>
				<Field 
					name="charismaSelecter" 
					id="charismaSelecter" 
					label="charisma"
					component={RenderInput}>
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
})

AbilityScoreManual = reduxForm({
    form: 'manualForm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('manual', Object.keys(errors)[0]))
})(AbilityScoreManual)

export default connect(mapStateToProps)(AbilityScoreManual);