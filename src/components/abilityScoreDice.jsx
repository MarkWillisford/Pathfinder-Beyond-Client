import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, formValueSelector, change } from 'redux-form';

import { setAvailableStats } from '../actions/index';

/*onChange={()=> this.handleClick(this.refs.abilityScoreGenerationMethod.value)}*/
export class AbilityScoreDice extends React.Component {
	constructor(props){
		super(props);
		this.state = { statArray:[], availableNumbers:[], };

		this.changeSelectDisplay = this.changeSelectDisplay.bind(this);
	}
/*	let dice = 0;
	let statArray = [];*/
    onSubmit(values) {

    }

	changeSelectDisplay(name, value){
		console.log("Here");
		this.props.change(name, value);
	}

    rollDice(event){
    	let dice = event.target.value
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
			statArray.push(number);		// I don't think I need the index here!
		}
		statArray.sort(function(a,b){ return b - a;});
		this.setState((state) => {
		  	return { statArray: statArray };
		}, function(){
			console.log(this.state);	// for doublechecking . . .     Okay now I have an array that I 
					// can access in other elements without accessing the store. Next step is to set the
					// 6 select statements to display off of this. 
			this.setState((state) => {
				return { availableNumbers:statArray };
			}, function(){
				console.log(this.state); 
			});
		})
		/*this.props.dispatch(setAvailableStats(statArray));*/		

    }

    getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	handleNumbersChange(event){
		const missingNumber = event.target.value;
		const availableNumbersCopy = [...this.state.statArray];
		const name = event.target.name;
		console.log(name);
		const index = availableNumbersCopy.findIndex(i => i == missingNumber);
/*		console.log("missing number is: " + missingNumber);
		console.log("array is: ");
		console.log(availableNumbersCopy);
		console.log("index is: " + index);*/
		availableNumbersCopy.splice(index, 1);
		this.setState((state) => {
			return { availableNumbers:availableNumbersCopy };
		}, function(){
			//console.log(this.state); 
		});
		const options = this.state.availableNumbers.map(num => 
			<option value={num}>{num}</option>
		)
		this.changeSelectDisplay("dexteritySelecter", missingNumber);

	}

	render(){
		const diceOptions = ["3d6","4d6"];
		const createRenderer = render => ({ input, meta, label, ...rest }) => 
			<div>
			<label>{label}</label>
			{render(input, label, rest)}
			</div>

		const RenderInput = createRenderer((input, label) => 
			<input { ... input} placeholder={label}/>			
		)
		const RenderSelect = createRenderer((input, label, { children }) => 
			<select { ... input}>
			{children}
			</select>			
		)

		return (
			<form onSubmit={
				this.props.handleSubmit(values=>this.onSubmit(values)
			)}>
				<Field name="diceSelecter" id="diceSelecter" label="How many dice do you get to roll?" component={RenderSelect} onChange={this.rollDice.bind(this)}>
					<option />
					{diceOptions.map(option => 
						<option key={option} value={option}>
							{option}
						</option>
					)}					
				</Field>			
				<Field name="strengthSelecter" id="strengthSelecter" label="Strength" component={RenderSelect} onChange={this.handleNumbersChange.bind(this)}>
					<option value="-1">--</option>
					{this.state.availableNumbers.map((num, index) => (
						<option key={index} value={num}>
							{num}
						</option>
					))}
				</Field>


<div>
					<div>
						<label htmlFor="dexteritySelecter">Dexterity</label>
						<Field name="dexteritySelecter" id="dexteritySelecter" type="input" component="select">
							<option value="-1">--</option>
						</Field>
					</div>
					<div>
						<label htmlFor="constitutionSelecter">Constitution</label>
						<Field name="constitutionSelecter" id="constitutionSelecter" type="input" component="select">
							<option value="-1">--</option>
						</Field>
					</div>
					<div>
						<label htmlFor="intelligenceSelecter">Intelligence</label>
						<Field name="intelligenceSelecter" id="intelligenceSelecter" type="input" component="select">
							<option value="-1">--</option>
						</Field>
					</div>
					<div>
						<label htmlFor="wisdomSelecter">Wisdom</label>
						<Field name="wisdomSelecter" id="wisdomSelecter" type="input" component="select">
							<option value="-1">--</option>
						</Field>
					</div>
					<div>
						<label htmlFor="charismaSelecter">Charisma</label>
						<Field name="charismaSelecter" id="charismaSelecter" type="input" component="select">
							<option value="-1">--</option>
						</Field>
					</div>
				</div>

				<div>
					<button type="submit">Next >> </button>
				</div>
			</form>

		)

	}
}

const selector = formValueSelector('diceForm')
AbilityScoreDice = connect(state => {
		const { diceSelecter, strengthSelecter, dexteritySelecter } = selector(state, 'diceSelecter', 'strengthSelecter', 'dexteritySelecter')
		return {
			diceSelecter, 
			strengthSelecter, 
			dexteritySelecter,
		}
	}
)(AbilityScoreDice)

export default reduxForm({
    form: 'diceForm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('dice', Object.keys(errors)[0]))
})(AbilityScoreDice)

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[3].complete,
	statArrayToAssign:state.characterReducer.statArrayToAssign,
})