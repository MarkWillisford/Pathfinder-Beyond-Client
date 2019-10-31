import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field } from 'redux-form';

import { submitClassToState } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { submitFavoredEnemy } from '../../actions/index';
import { createBonus } from '../../utility/statObjectFactories';
import { capitalizeFirstLetter } from '../../utility/helperFunctions';

const validate = values => {
	const errors = {}

	if(!values.selections){
		errors.selections = "Required"
	}
	
	return errors
}

export class ClassSelectionsRanger extends React.Component{
	addClass(favoredEnemy){
		for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
			if( this.props.classesArray[i].name==="ranger" ){
				
        for(let j=1;j<5;j++){
          let bonus = createBonus({ 
            name:"class"+ capitalizeFirstLetter(this.props.classesArray[i].classFeatures.table[0][j]), 
            source:"class", 
            stat:this.props.classesArray[i].classFeatures.table[0][j], 
            type:"untyped", 
            duration:-1, 
            amount:this.props.classesArray[i].classFeatures.table[1][j] });
          this.props.dispatch(addBonus(bonus));
          this.props.dispatch(sumBonus(bonus));
        }
                this.props.dispatch(submitClassToState(this.props.classesArray[i]));
                this.props.dispatch(submitFavoredEnemy(favoredEnemy));
			}
		}		
    }
    
	render(){
        const favoredEnemies = require('../../data/rangerFavoredEnemy');
		const submitting = this.props.submitting;
		const onSubmitForm = (values) => {
            this.addClass(values.selections);
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
        
        return (
            <form onSubmit={this.props.handleSubmit(onSubmitForm) }>
                <p>At 1st level, a ranger selects a creature type from the ranger favored enemies table. He gains a +2 bonus on Bluff, Knowledge, Perception, Sense Motive, and Survival checks against creatures of his selected type. Likewise, he gets a +2 bonus on weapon attack and damage rolls against them. A ranger may make Knowledge skill checks untrained when attempting to identify these creatures.</p>
                <button type="submit" disabled={submitting}>Submit</button>
                <Field name="selections" component={RadioGroup} label="" options=
                    { favoredEnemies.map((option) => ({ title: option, value: option })) }
                />
                <button type="submit" disabled={submitting}>Submit</button>
            </form>
        )
	}
}

const mapStateToProps = state => ({
	classesArray:state.protectedData.charClasses,
});

ClassSelectionsRanger = reduxForm({
	form:'ClassSelectionsRanger',

    validate
})(ClassSelectionsRanger)

export default connect(mapStateToProps)(ClassSelectionsRanger);