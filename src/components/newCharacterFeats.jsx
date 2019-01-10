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
			return (
				<div className="">
					<h2>Selecting Feats</h2>
					<p>Some abilities are not tied to your race, class, or skill-things like particularly quick reflexes that allow you to react to danger more swiftly, the ability to craft magic items, the training to deliver powerful strikes with melee weapons, or the knack for deflecting arrows fired at you. These abilities are represented as feats. While some feats are more useful to certain types of characters than others, and many of them have special prerequisites that must be met before they are selected, as a general rule feats represent abilities outside of the normal scope of your character’s race and class. Many of them alter or enhance class abilities or soften class restrictions, while others might apply bonuses to your statistics or grant you the ability to take actions otherwise prohibited to you. By selecting feats, you can customize and adapt your character to be uniquely yours.</p>
				</div>
			);
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