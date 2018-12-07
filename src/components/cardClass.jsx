import React from 'react';
import { capitalizeFirstLetter, arrayToSentence } from '../utility/helperFunctions';
import { toggleFeatureExpand } from '../actions/index';

export default class CardClass extends React.Component{
	render(){
		return(
			<div className="cardClass">
				<div className="classDiv" >
					{this.props.thum}
					<h2>{capitalizeFirstLetter(this.props.name)}</h2>
				</div>
				{ !this.props.expand && <button ref={this.props.name + "button"} onClick={this.props.callback}>More</button> }
				{ this.props.expand && <ClassExpanded thum={this.props.thum} name={this.props.name} 
					expand={this.props.expand} features={this.props.features} callback={this.props.callback} 
					addClassCallback={this.props.addClassCallback}/> }
			</div>
		)	
	}	
}

function ClassExpanded(props){
	let featureNames = "";
	const blurb = props.features.blurb;
	const alignment = props.features.alignment;
	const hd = props.features.hd;
	const wealth = props.features.wealth;
	const name = props.name;
	const bab = props.features.bab;
	const skills = props.skills;
	const table = props.features.table;
	const goodSaves = arrayToSentence(props.features.goodSaves);
	const classSkills = arrayToSentence(props.features.classSkills);
	let proficiencies = arrayToSentence(props.features.proficiency);
	let features = [];

	if(props.features.proficiency.indexOf("tower shields") === -1){
		proficiencies = proficiencies + ", but not tower shields"
	};

	for(let i=0; i<table.length;i++){
		// if we are not in the title row of the table
		if(i!==0){
			for(let j=0; j<table[i][5].length;j++){
				let result = features.find(feature => feature.name === table[i][5][j].name);
				if(!result){
					features.push(table[i][5][j]);
				};
			}
		};
	}

	return(
		<div className="classExpanded">
			<button onClick={props.addClassCallback}>Add Class</button>
			<button onClick={props.callback}>Cancel</button>
			<p>Roll: {blurb}</p>
			<p>Alignment: {alignment}</p>
			<p>Starting Wealth: {wealth.number}d{wealth.type} x 10 gp, Avg: {
				wealth.number * ( (wealth.type+1) / 2 ) * 10} gp</p>
			<p>{capitalizeFirstLetter(name)}s are a {bab} BAB class with good {goodSaves} saves,
			 d{hd} hit dice and {skills} skill points per level.</p>
			<p>{capitalizeFirstLetter(name)}s class skills include: {classSkills}.</p>
			<p>{capitalizeFirstLetter(name)}s proficiencies include: {proficiencies}.</p>
			<button onClick={props.addClassCallback}>Add Class</button>
			<button onClick={props.callback}>Cancel</button>
			<h3>{capitalizeFirstLetter(name)}s class features include the following: </h3>{
				features.map(({name, description, expand}) =>
					<div key={name}>
						<h3>{name}</h3>
						{description.map((string, index) => <p key={index}>{string}</p>)}
					</div>
				)}
			<button onClick={props.addClassCallback}>Add Class</button>
			<button onClick={props.callback}>Cancel</button>
		</div>
	)
}