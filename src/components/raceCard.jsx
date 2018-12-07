import React from 'react';

export default class RaceCard extends React.Component{
	render(){
		return(
			<div className="raceCard">
				<div className="raceDiv" >
					{this.props.thum}
					{this.props.name}
				</div>
				{ !this.props.expand && <button ref={this.props.name + "button"} onClick={this.props.callback}>More</button> }
				{ this.props.expand && <RaceExpanded thum={this.props.thum} name={this.props.name} 
					expand={this.props.expand} traits={this.props.traits} callback={this.props.callback} 
					addRaceCallback={this.props.addRaceCallback}/> }
			</div>
		)	
	}	
}

function RaceExpanded(props){
	let traitNames = "";
	let blurb = props.traits.blurb;
	for(let i=0;i<props.traits.racial.length;i++){
		traitNames = traitNames + props.traits.racial[i].name + ", ";
	};
	return(
		<div className="raceExpanded">
			<button onClick={props.addRaceCallback}>Add Race</button>
			<button onClick={props.callback}>Cancel</button>
			<p>{blurb}</p>
			<p>Ability Scores: {props.traits.base.abilityScoreRacialBonuses}, { traitNames }</p>
				{ props.traits.racial.map(({name, description}) =>
					<div key={name}>
						<p><strong>{name}</strong></p>
						<p>{description}</p>
					</div>
				)}
			<button onClick={props.addRaceCallback}>Add Race</button>
			<button onClick={props.callback}>Cancel</button>
		</div>
	)
}