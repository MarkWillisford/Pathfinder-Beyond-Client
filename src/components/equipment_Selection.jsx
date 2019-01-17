import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, formValueSelector, change } from 'redux-form';

import './equipment_Selection.css';

export class Equipment_Selection extends React.Component {
	reset(){
		console.log("resetting");
	}

	render(){
		const startingGold = this.props.gold;
		let availableGold = this.props.availableGold;

		const tradeGoodsList = require('../data/tradeGoods');
		const weaponsList = require('../data/weapons');
		const armorList = require('../data/armor');
		const adventuringGearList = require('../data/adventuringGear');

		if(startingGold){
			return (
				<div>
					<p>Available Gold: { availableGold }</p><button onClick={ () => this.reset() }>Reset</button>
					<div className="purchasedGear">
					</div>

					<div className="tradeGoods">
						<h3>Trade Goods</h3>
						<table>
							<caption></caption>
							<thead>
								<tr>
									<th>Quantity</th>
									<th>Cost</th>
									<th>Item</th>
								</tr>
							</thead>
							<tbody>
								{ tradeGoodsList.map(({name, cost, item, description}) => 
									<TradeGood key={name} name={name} description={description} 
										cost={cost} item={item} expand={false}/>
									) }
							</tbody>
						</table>
					</div>
					<div className="weapons"></div>
					<div className="armor"></div>
					<div className="adventuringGear"></div>
		    	</div>
			)
		} else { return null }
	}
}

function TradeGood(props){
	let cost = props.cost;
	let item = props.item;
	return(
		<tr>
			<td>0</td>
			<td>{cost}</td>
			<td>{item}</td>
		</tr>
	)
}

const mapStateToProps = state => ({
	gold:state.characterReducer.newCharacter.gold,
	availableGold:state.characterReducer.newCharacter.availableGold,
})

export default connect(mapStateToProps)(Equipment_Selection);