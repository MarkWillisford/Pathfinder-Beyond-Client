import React from 'react';
import { capitalizeFirstLetter, arrayToSentence } from '../utility/helperFunctions';
//import { toggleFeatureExpand } from '../actions/index';

export default class CardFeat extends React.Component{
	render(){
		return(
			<div className="cardFeat">
				<div className="featExpandedFalse">
					<div className="featName">{this.props.name}</div>
					<div className="featPrerequisites">{this.props.prerequisites}</div>
					<div className="featDescription">{this.props.description}</div>

					<button onClick={this.props.callback}>Details</button>
					<button>Select</button>
				</div>

{/*				<div className="featExpandedName">{this.props.name}</div>
				<div className="featExpandedDescription">{this.props.description}</div>
				<div className="featExpandedPrerequisites">{this.props.prerequisites}</div>*/}
			</div>
		)	
	}	
}

function FeatExpanded(props){
	return(
		<div className="featExpanded">




		</div>
	)
}



/*				{ !this.props.expand && <button ref={this.props.name + "button"} onClick={this.expandDetails}>More</button> }
				{ this.props.expand && <ClassExpanded thum={this.props.thum} name={this.props.name} 
					expand={this.props.expand} features={this.props.features} callback={this.props.callback} 
					addClassCallback={this.props.addClassCallback}/> }*/