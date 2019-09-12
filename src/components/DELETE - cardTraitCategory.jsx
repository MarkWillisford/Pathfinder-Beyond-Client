import React from 'react';
import {connect} from 'react-redux';
import CardTrait from './cardTrait';
import { fetchProtectedSubData } from '../actions/protectedData';

import { setExpandedTraitCategory } from '../actions/index'; 

import './cardTraitCategory.css';

class CardTraitCategory extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchProtectedSubData("traits"));
  }

	getTraitList(category, base){
		const traitsList = this.props.traitsList; //require('../data/traits');

		let traitsToDisplay=[];
		let count = 0;
		let index = 0 + base;

		while(count < 1){
			if(traitsList[index].Type === category || traitsList[index].Category === category){
				traitsToDisplay.push(traitsList[index]);
				count++;
			}
			index++;
		}
		return traitsToDisplay;
	}

	show(name){
		// set the name of the expanded category in state
		this.props.dispatch(setExpandedTraitCategory(name));
	}

	hide(name){
		name = "";
		// remove the name of the expanded category in state
		this.props.dispatch(setExpandedTraitCategory(name));
	}

	render(){
    console.log(this.props);
		let categoryToExpand ="";
		
		if(this.props.categoryToExpand){
			categoryToExpand = this.props.categoryToExpand.traitCategory;
		} else {
			categoryToExpand = false;
		}
		let thisExpanded = ((categoryToExpand == this.props.name) ? true : false);

		// get the list of feats only if this is expanded
		let traitsList = null;
		if(thisExpanded){
			traitsList = this.getTraitList(this.props.name, 0);	// This extra param is for adding page ability
		}

		return(
			<div>
				<button onClick={() => this.show(this.props.name)} disabled={thisExpanded}>Show</button>
				<button onClick={() => this.hide(this.props.name)} disabled={!thisExpanded}>Hide</button>
				{thisExpanded && traitsList.map((trait) => 
					<CardTrait key={trait.Name} id={trait.id} name={trait.Name} prerequisitesString={trait.prerequisitesString}
					description={trait.Description} prerequisites={trait.prerequisites}/>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	categoryToExpand:state.characterReducer.expanded,
  traitsList:state.protectedData.subData,
});

export default connect(mapStateToProps)(CardTraitCategory);