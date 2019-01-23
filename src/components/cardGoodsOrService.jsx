import React from 'react';
import {connect} from 'react-redux';
import { capitalizeFirstLetter, arrayToSentence } from '../utility/helperFunctions';

import { spendGold } from '../actions/index';
import { addItemToCharacter } from '../actions/index';
import { removeItemFromCharacter } from '../actions/index';

export class CardGoodsOrServices extends React.Component{
	addItem(name){
		const tradeGoodsList = require('../data/tradeGoods');
		const weaponsList = require('../data/weapons');
		const armorList = require('../data/armor');
		const goodsAndServicesList = require('../data/goodsAndServices');
		let item = null;
		for(let i=0;i<tradeGoodsList.length;i++){
			if(tradeGoodsList[i].name == name){
				item = tradeGoodsList[i];
			}
		};
		if(item == null){
			for(let i=0;i<weaponsList.length;i++){
				if(weaponsList[i].name == name){
					item = weaponsList[i];
				}
			};
		} 
		if(item == null){
			for(let i=0;i<armorList.length;i++){
				if(armorList[i].name == name){
					item = armorList[i];
				}
			};			
		}
		if(item == null){
			for(let i=0;i<goodsAndServicesList.length;i++){
				if(goodsAndServicesList[i].name == name){
					item = goodsAndServicesList[i];
				}
			};			
		}

		// Now we have the item the user selected stored in item
		this.props.dispatch(spendGold(item.cost));
		this.props.dispatch(addItemToCharacter(item));
	}

	removeItem(name){
		const tradeGoodsList = require('../data/tradeGoods');
		const weaponsList = require('../data/weapons');
		const armorList = require('../data/armor');
		const goodsAndServicesList = require('../data/goodsAndServices');
		let item = null;

		for(let i=0;i<tradeGoodsList.length;i++){
			if(tradeGoodsList[i].name == name){
				item = tradeGoodsList[i];
			}
		};
		if(item == null){
			for(let i=0;i<weaponsList.length;i++){
				if(weaponsList[i].name == name){
					item = weaponsList[i];
				}
			};
		} 
		if(item == null){
			for(let i=0;i<armorList.length;i++){
				if(armorList[i].name == name){
					item = armorList[i];
				}
			};			
		}
		if(item == null){
			for(let i=0;i<goodsAndServicesList.length;i++){
				if(goodsAndServicesList[i].name == name){
					item = goodsAndServicesList[i];
				}
			};			
		}

		// Now we have the item the user selected stored in item
		this.props.dispatch(spendGold(-item.cost));
		this.props.dispatch(removeItemFromCharacter(item));
	}

	render(){
		const name = this.props.name;
		const cost = this.props.cost;
		const weight = this.props.weight;
		const availableGold = this.props.availableGold;
		const purchasedGear = this.props.purchasedGear;
		const disabledAdd = (availableGold < cost) ? true : false;
		let quantity = 0;
		// set quantity
		if(purchasedGear){
			for(let i=0;i<purchasedGear.length;i++){
				if(purchasedGear[i].name === name){
					quantity++;
				}
			}
		}
		const disabledRemove = (quantity > 0) ? false : true;

		return(
			<tr>
				<td>
					<button className={"add_"+name+"_button"} onClick={()=> this.addItem(name)} disabled={disabledAdd}>+</button> 
					{quantity}
					<button className={"remove_"+name+"_button"} onClick={()=> this.removeItem(name)} disabled={disabledRemove}>-</button>
				</td>
				<td>{name}</td>
				<td>{cost} gp</td>
				<td>{weight}</td>
			</tr>
		)	
	}	
}

/* Possibly saved for expanding details. 
function GoodsExpanded(props){
	return(
		<div className="goodsExpanded">
			<button onClick={props.addClassCallback}>Add Class</button>
			<button onClick={props.callback}>Cancel</button>
			
			<button onClick={props.addClassCallback}>Add Class</button>
			<button onClick={props.callback}>Cancel</button>
		</div>
	)
}*/

const mapStateToProps = state => ({
	gold:state.characterReducer.newCharacter.gold,
	availableGold:state.characterReducer.newCharacter.availableGold,
	purchasedGear:state.characterReducer.newCharacter.gear,
})
export default connect(mapStateToProps)(CardGoodsOrServices);