import React from 'react';

export default function RaceCard(props){
	return(
		<div className="raceCard">
			<div className="raceDiv" >
				{props.thum}
				{props.name}
			</div>
			<button onClick={props.callback}>Select</button>
			{ props.expand && <RaceExpanded thum={props.thum} name={props.name} expand={props.expand} traits={props.traits} callback={props.callback}/> }
		</div>
	)		
}

function RaceExpanded(props){
	let traitNames = "";
	for(let i=0;i<props.traits.racial.length;i++){
		traitNames = traitNames + props.traits.racial[i].name + ", ";
	};
	return(
		<div className="raceExpanded">
			<p>One or two sentance blurb</p>
			<p>Ability Scores: {props.traits.base.abilityScoreRacialBonuses}, { traitNames }</p>
				{ props.traits.racial.map(({name, description}) =>
					<div key={name}>
						<p><strong>{name}</strong></p>
						<p>{description}</p>
					</div>
				)}
			<button>Add Class</button>
			<button onClick={props.callback}>Cancel</button>
		</div>
	)
}