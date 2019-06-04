import React from 'react';
import { connect } from 'react-redux';
import SelectionFormRace from './selectionFormRace';

import './raceCard.css';

export class RaceCard extends React.Component{
	render(){
		let showSelections = "";
		if(this.props.showSelections){
      showSelections = this.props.showSelections
		} else {
			showSelections = false;
		};

    let showTheseSelections = ((showSelections.name === this.props.name) ? true : false);
    let raceCardClassName = "raceCard";
    let raceDivClassName = "raceDiv";
    let raceFlexContainerName = "raceCardFlexContianer";
    if(this.props.expand){
      raceCardClassName += " expanded";
      raceDivClassName += " expanded";
      raceFlexContainerName += " expanded";
    }
    
		return(
			<div className={ raceCardClassName }>
        <div className={ raceFlexContainerName }>
          <div className={ raceDivClassName } >
            {this.props.thum}
            {this.props.name}
          </div>
          { !this.props.expand && <button className ="raceMoreButton" ref={this.props.name + "button"} onClick={this.props.callback}>More</button> }
          { this.props.expand && <RaceExpanded thum={this.props.thum} name={this.props.name} 
            expand={this.props.expand} traits={this.props.traits} callback={this.props.callback} 
            addRaceCallback={this.props.addRaceCallback} showTheseSelections={showTheseSelections}/> }
        </div>
			</div>
		)	
	}	
}

function RaceExpanded(props){
	let traitNames = "";
	let blurb = props.traits.blurb;
	let showTheseSelections = props.showTheseSelections;
	for(let i=0;i<props.traits.racial.length;i++){
		traitNames = traitNames + props.traits.racial[i].name + ", ";
	};
	if(showTheseSelections){
		return(
			<SelectionFormRace name={props.name}/>			
		)
	} else {
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
}

const mapStateToProps = state => ({
	showSelections:state.characterReducer.selections,
});

export default connect(mapStateToProps)(RaceCard);