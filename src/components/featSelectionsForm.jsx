import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field } from 'redux-form';

import { submitFeatToState } from '../actions/index';
import { setSelections } from '../actions/index';
import { setStepToComplete } from '../actions/index';

const validate = values => {
	const errors = {}

	if(!values.selections){
		errors.selections = "Required"
	}
	
	return errors
}

export class FeatSelectionsForm extends React.Component{
	getFeatDetails(name){
		// this will be an API call, but for now it searches the list and retreaves feat details
		const featsList = this.props.featsList;
		let featToReturn = featsList.find( feat => feat.name === name);
		return featToReturn;
	}

	hideSelections(){
		this.props.dispatch(setSelections(""));
	}

	render(){
		// **************************************
		// form variables, methods and elements:
		// **************************************
		// check to see if there is exactly 1 feat slot object with a selection of "null"
		let remainingSlots = (this.props.feats.filter(f => f.selection === null));
		let lastFeatSelected = false;
		if(remainingSlots.length === 1){
			lastFeatSelected = true;
		};

		const submitting = this.props.submitting;
		const onSubmitForm = (values) => {
			// Okay, Here I need to:
			// 1.) get the feat
			let feat = this.getFeatDetails(this.props.name);
			// 2.) find the field that needs the selected value
			// 3.) set that field from the values prop
			feat.specialization = values.selections;
			this.props.dispatch(setSelections(""));
			this.props.dispatch(submitFeatToState(feat));

			// Finaly if the last feat has been selected, set the step to complete. 
			if(lastFeatSelected){
				this.props.dispatch(setStepToComplete(6));
			}
		};
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

		// **************************************
		// data variables, methods and elements:
		// **************************************
		let feat = this.getFeatDetails(this.props.name);
		//TODO!!  This could be refactored into cards to set up for expansion or details and links
		return(
			<form onSubmit={this.props.handleSubmit(onSubmitForm) }>	
				<h4>Select one of the following options</h4>			
				<Field name="selections" component={RadioGroup} label="" options=
					{ feat.selections.map((option) => ({ title: option, value: option })) }
				/>
				<button type="button" onClick={() => this.hideSelections()}>Cancel</button>
				<button type="submit" disabled={submitting}>Submit</button>
			</form>
		)
	}	
}

const mapStateToProps = state => ({
	feats:state.characterReducer.newCharacter.featSlots,	
  featsList:state.protectedData.data,
});

FeatSelectionsForm = reduxForm({
	form:'FeatSelectionsForm',

    validate
})(FeatSelectionsForm)

export default connect(mapStateToProps)(FeatSelectionsForm);