import React from 'react';

export default function RaceCard(props){
	return(
		<div className="raceCard">
			<div className="raceDiv" >
				{props.thum}
				{props.name}
			</div>
			<button onClick={props.callback}>Select</button>
			{ props.expand && <RaceExpanded /> }
		</div>
	)		
}

function RaceExpanded(props){
	return(
		<div className="raceExpanded">
			Expanded		
		</div>
	)
}