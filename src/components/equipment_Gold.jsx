import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus } from 'redux-form';
import EquipmentSelection from './equipment_Selection';

import { goldGenerationMethod } from '../actions/index';
import { setGold } from '../actions/index';

import './equipment_Gold.css';

export class EquipmentGold extends React.Component {
	handleGold(text){
		// set the state.goldGenerationMethod to text
		this.props.dispatch(goldGenerationMethod(text));		
	};

	render(){
		const className = this.props.className ? this.props.className : "cool default class";
		const wealth = this.props.wealth ? this.props.wealth : { "number":4, "type":6 } ;
		const goldMethod = this.props.goldMethod;
		const gold = this.props.gold;

		return (
			<div>
				<p>As a {className} you have {wealth.number}d{wealth.type} gold to spend.</p>
				<p>How are should we determine starting gold?</p>
				<select ref="goldGenerationMethod" onChange={()=> this.handleGold(this.refs.goldGenerationMethod.value)}>
	        		<option value="0">Select how to generate scores</option>
	        		<option value="roll">Roll</option>
	        		<option value="average">Average</option>
	        		<option value="manual">Manual</option>
	        	</select>
	        	<div className="goldGeneration">
	        		<GoldGeneration method={ goldMethod } wealth={ wealth } dispatch={this.props.dispatch} gold={ gold }/>
	        	</div>
	        	<div className="equipmentSelection">
	        		<EquipmentSelection />
	        	</div>

        	</div>
		)
	}
}

function GoldGeneration(props){
	let goldMethod = props.method;
	let gold = props.gold;
	if(!gold){
		switch(goldMethod){
			case "roll": 
				return (<RollGold wealth={props.wealth} dispatch={props.dispatch}/>);
			case "average": 
				return (<AverageGold wealth={props.wealth} dispatch={props.dispatch}/>);
			case "manual": 
				return (<ManualGold dispatch={props.dispatch}/>);
			default:
				return null;
		}
	} else {
		return ( null );
	}
}

class RollGold extends React.Component{
	handleClick(){
		let gold = 0;
		for(let i=0;i<this.props.wealth.number;i++){
			let num = Math.floor(Math.random()*(this.props.wealth.type-1+1)+1);
			gold += num;
		}
		gold = gold*10;
		this.props.dispatch(setGold(gold));
	}

	render(){
		return(
			<button onClick={()=>this.handleClick()}>Roll {this.props.wealth.number}d{this.props.wealth.type}</button>
		);
	}
}

class AverageGold extends React.Component{
	handleClick(avg){
		this.props.dispatch(setGold(avg));
	}

	render(){
		const avg = this.props.wealth.number * (this.props.wealth.type+1) / 2 * 10;
		return(
			<div>
				<p>Average gold is { avg }</p><button onClick={()=>this.handleClick(avg)}>Accept</button>
			</div>
		);
	}
}

class ManualGold extends React.Component{
	onSubmit(values){
    	this.props.dispatch(setGold(values.goldInput));
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

		return(
			<div>
				<form onSubmit={ this.props.handleSubmit(values=>this.onSubmit(values)) }> 		
					<Field 
						name="goldInput" 
						id="goldInput" 
						label="gold" 
						component={RenderInput}>
					</Field>
					<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
				</form>
			</div>
		)
	}
}

ManualGold = reduxForm({
    form: 'manualForm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('manual', Object.keys(errors)[0]))
})(ManualGold)

const mapStateToProps = state => ({
	className:state.characterReducer.newCharacter.charClass.name,
	wealth:state.characterReducer.newCharacter.charClass.classFeatures.wealth,
	goldMethod:state.characterReducer.newCharacter.goldMethod,
	gold:state.characterReducer.newCharacter.gold
})

export default connect(mapStateToProps)(EquipmentGold);