import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus } from 'redux-form';

import { setStepToComplete } from '../actions/index';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { saveTempScore, resetTempScore } from '../actions/index';
import { createBonus } from '../utility/statObjectFactories'

export class AbilityScoreManual extends React.Component {
    onSubmit(values) {
      let tempAbilityScores = this.props.tempAbilityScores;
      const arrayOfValues = Object.keys(tempAbilityScores);
      for(let i=0;i<arrayOfValues.length;i++){
        let ability = arrayOfValues[i].split(/(?=[A-Z])/)[0];
        let value = tempAbilityScores[arrayOfValues[i]];

        let bonus = createBonus({ 
          name:"character base", 
          source:"character base", 
          stat:ability, 
          type:"base", 
          duration:-1, 
          amount:Number(value) });
        this.props.dispatch(addBonus(bonus));
        this.props.dispatch(sumBonus(bonus));
      }
      this.props.dispatch(setStepToComplete(3));
      this.props.dispatch(resetTempScore());
    }

	AbilityScoreSelectedCallBack(event){
		// Get the name of the ability as a string by finding the name of the select element, splitting
		// on capital letters (the S in strength'S'electer) and taking only the first string in the result
		let ability = event.target.name.split(/(?=[A-Z])/)[0];
    let value = event.target.value;
    // now we have the value of the selection, we need to save it in a place where we can access it by the tables 
    // below yet not save it to the character until they hit submit
    this.props.dispatch(saveTempScore(ability, value));
	}

	render(){
		return (
			<form onSubmit={ this.props.handleSubmit(values=>this.onSubmit(values) )}> 		
        <Field name="strengthSelecter" label="strength" component={RenderSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>>
          <option />
            <option value="18">18</option>
            <option value="17">17</option>
            <option value="16">16</option>
            <option value="15">15</option>			
            <option value="14">14</option>	
            <option value="13">13</option>
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
        </Field>
        <Field name="dexteritySelecter" label="dexterity" component={RenderSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>>
          <option />
            <option value="18">18</option>
            <option value="17">17</option>
            <option value="16">16</option>
            <option value="15">15</option>			
            <option value="14">14</option>	
            <option value="13">13</option>
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
        </Field>
        <Field name="constitutionSelecter" label="constitution" component={RenderSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>>
          <option />
            <option value="18">18</option>
            <option value="17">17</option>
            <option value="16">16</option>
            <option value="15">15</option>			
            <option value="14">14</option>	
            <option value="13">13</option>
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
        </Field>
        <Field name="intelligenceSelecter" label="intelligence" component={RenderSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>>
          <option />
            <option value="18">18</option>
            <option value="17">17</option>
            <option value="16">16</option>
            <option value="15">15</option>			
            <option value="14">14</option>	
            <option value="13">13</option>
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
        </Field>
        <Field name="wisdomSelecter" label="wisdom" component={RenderSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>>
          <option />
            <option value="18">18</option>
            <option value="17">17</option>
            <option value="16">16</option>
            <option value="15">15</option>			
            <option value="14">14</option>	
            <option value="13">13</option>
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
        </Field>
        <Field name="charismaSelecter" label="charisma" component={RenderSelect}
					onChange={this.AbilityScoreSelectedCallBack.bind(this)}>>
          <option />
            <option value="18">18</option>
            <option value="17">17</option>
            <option value="16">16</option>
            <option value="15">15</option>			
            <option value="14">14</option>	
            <option value="13">13</option>
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
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

const RenderSelect = createRenderer((input, label, { children }) => 
  <select { ... input}>
  {children}
  </select>			
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
  tempAbilityScores: state.characterReducer.abilityScoreTemp,  
})

AbilityScoreManual = reduxForm({
    form: 'manualForm',
    validate
})(AbilityScoreManual)

export default connect(mapStateToProps)(AbilityScoreManual);