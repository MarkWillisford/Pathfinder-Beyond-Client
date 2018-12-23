import React from 'react';
import {connect} from 'react-redux';

import CardFeat from './cardFeat';

import './newCharacterFeats.css';

export class NewCharacterFeats extends React.Component{	
	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		const featCategories = ["general"];//, "combat", "critical", "item creation", "metamagic"];

		// first here we must check to ensure that race, class, and ability scores are complete. 
		// If not, we display an error message directing the user to complete those pages before 
		// continuing. 
		if( !(this.props.race && this.props.charClass && this.props.abilityScores) ){
			return ( <h1>NOT READY</h1> )
		} else if(help){
		// if help is true, that screen is displayed
			return ( <h1>HELP</h1> );
		} else if(!complete){
			return (
		        <div className="newCharacterFeats">
		        	<h1>Character Feats - todo</h1>	
		        	{featCategories.map((category) => 
		        		<FeatCategory key={category} name={category} />
		        	)}
			    </div>
		    );
		} else {
			return(
		        <div className="newCharacterFeats">
		        	<h1>Character Feats - done</h1>	
		        </div>			
			);
		};		
	}
}

class FeatCategory extends React.Component{
	handleClick(name){
		this.getDetails(name);
	}

	getDetails(name){
		// currently static, will be an api call
		console.log(name);
		const featsList = require('../data/feats');
		let feat = featsList.find( feat => feat.name === name);
		
		console.log(feat);
	}

	render(){
		const featsList = require('../data/feats');
		let index = 0;
		let featsToDisplay = [];
		console.log(this.props);

		while(featsToDisplay.length < 3){
			if(featsList[index].type.includes(this.props.name)){
				let feat = {
					"name":featsList[index].name,
					"prerequisites":featsList[index].prerequisites_list,
					"description":featsList[index].description,
				};
				featsToDisplay.push(feat);
			}
			index++
		};
		console.log(featsToDisplay);
		return (
			<div>
				<p>say hi</p>
				{featsToDisplay.map(({name, prerequisites, description}) => 
					<CardFeat key={name} name={name} prerequisites={prerequisites} description={description} 
					callback={()=> this.handleClick(name)} expand={false}/>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[6].complete,
	help:state.characterReducer.help,
	race:state.characterReducer.creationSteps[1].complete,
	charClass:state.characterReducer.creationSteps[2].complete,
	abilityScores:state.characterReducer.creationSteps[3].complete,
});

export default connect(mapStateToProps)(NewCharacterFeats);





//onClick={()=> this.showFeatsInCategory(category)}