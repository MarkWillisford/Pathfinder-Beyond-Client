import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, formValueSelector, change } from 'redux-form';

import { spendGold } from '../actions/index';
import { addItemToCharacter } from '../actions/index';
import { removeItemFromCharacter } from '../actions/index';

import './equipment_Selection.css';

export class Equipment_Selection extends React.Component {
	reset(){
		console.log("resetting");
	}

	addItem(name){
		const tradeGoodsList = require('../data/tradeGoods');
		const weaponsList = require('../data/weapons');
		const armorList = require('../data/armor');
		const adventuringGearList = require('../data/adventuringGear');
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
			for(let i=0;i<adventuringGearList.length;i++){
				if(adventuringGearList[i].name == name){
					item = adventuringGearList[i];
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
		const adventuringGearList = require('../data/adventuringGear');
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
			for(let i=0;i<adventuringGearList.length;i++){
				if(adventuringGearList[i].name == name){
					item = adventuringGearList[i];
				}
			};			
		}

		// Now we have the item the user selected stored in item
		this.props.dispatch(removeItemFromCharacter(item));
	}

	render(){
		const startingGold = this.props.gold;
		let availableGold = this.props.availableGold;
		const purchasedGear = this.props.purchasedGear;

		// inport data
		const tradeGoodsList = require('../data/tradeGoods');
		const weaponsList = require('../data/weapons');
		const armorList = require('../data/armor');
		const adventuringGearList = require('../data/adventuringGear');

		// create a list of weapon categories ('simple, martial, etc')
		let weaponsCategory = [];		// list of categories
		let foundCategory = false;		// flag
		for(let i = 0; i<weaponsList.length;i++){			// for each weapon
			let categoryString = weaponsList[i].category;	// get the category
			foundCategory = false;							// make sure the marker is false 
			for(let j=0;j<weaponsCategory.length;j++){		// search the list
				if(weaponsCategory[j] == categoryString){	// if the category is found
					foundCategory = true;					// set the marker
				}
			};
			if(!foundCategory){ 							// if there is no marker, then it is a new category
				weaponsCategory.push(categoryString); 		// add it to the list
			};
		};
		// Do I really need this?  Will I ever have anything that isn't simple, marital etc?
		// I think I over complicated this for unneccisary expandable possiblities. 
		weaponsCategory = ["simple", "martial", "exotic"];

		// Love this, found on https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property
		let weaponsListsCategory = groupBy2(weaponsList, "category");
		let armorListsUse = groupBy2(armorList, "use");
		if(startingGold){
			return (
				<div>
					<p>Available Gold: { availableGold }</p><button onClick={ () => this.reset() }>Reset</button>
					<div className="purchasedGear">
					</div>

					<div className="tradeGoods">
						<h3>Trade Goods</h3>
						<table className="tradeGoodsTable">
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
										cost={cost} item={item} expand={false} add={()=> this.addItem(name)} 
										remove={()=> this.removeItem(name)} availableGold={availableGold}
										purchasedGear= {purchasedGear}/>
									) }
							</tbody>
						</table>
					</div>
					<div className="weapons">
						<h3>Weapons</h3>
						{/* For each category in weaponCategory we need a table - just hard code the three . . .   */}

						<h4>Simple</h4>
						<table className="weaponsTableSimple">
							<caption></caption>
							<thead>
								<tr>
									<th>Quantity</th>
									<th>Name</th>
									<th>Cost</th>
									<th>Damage (S)</th>
									<th>Damage (M)</th>
									<th>Critical</th>
									<th>Range</th>
									<th>Weight</th>
									<th>Type</th>
									<th>Special</th>
								</tr>
							</thead>
							<tbody>
								{ weaponsListsCategory.simple.map(({name, description, cost, dmgS, dmgM, critical, range, weight, type, special}) => 
									<Weapons key={name} name={name} description={description} 
										cost={cost} dmgS={dmgS} dmgM={dmgM} critical={critical} range={range} 
										weight={weight} type={type} special={special} expand={false}
										add={()=> this.addItem(name)} remove={()=> this.removeItem(name)}
										availableGold={availableGold} purchasedGear= {purchasedGear}/>
									)}
							</tbody>
						</table>

						<h4>Martial</h4>
						<table className="weaponsTableMartial">
							<caption></caption>
							<thead>
								<tr>
									<th>Quantity</th>
									<th>Name</th>
									<th>Cost</th>
									<th>Damage (S)</th>
									<th>Damage (M)</th>
									<th>Critical</th>
									<th>Range</th>
									<th>Weight</th>
									<th>Type</th>
									<th>Special</th>
								</tr>
							</thead>
							<tbody>
								{ weaponsListsCategory.martial.map(({name, description, cost, dmgS, dmgM, critical, range, weight, type, special}) => 
									<Weapons key={name} name={name} description={description} 
										cost={cost} dmgS={dmgS} dmgM={dmgM} critical={critical} range={range} 
										weight={weight} type={type} special={special} expand={false}
										add={()=> this.addItem(name)} remove={()=> this.removeItem(name)}
										availableGold={availableGold} purchasedGear= {purchasedGear}/>
									)}
							</tbody>
						</table>

						<h4>Exotic</h4>
						<table className="weaponsTableExotic">
							<caption></caption>
							<thead>
								<tr>
									<th>Quantity</th>
									<th>Name</th>
									<th>Cost</th>
									<th>Damage (S)</th>
									<th>Damage (M)</th>
									<th>Critical</th>
									<th>Range</th>
									<th>Weight</th>
									<th>Type</th>
									<th>Special</th>
								</tr>
							</thead>
							<tbody>
								{ weaponsListsCategory.exotic.map(({name, description, cost, dmgS, dmgM, critical, range, weight, type, special}) => 
									<Weapons key={name} name={name} description={description} 
										cost={cost} dmgS={dmgS} dmgM={dmgM} critical={critical} range={range} 
										weight={weight} type={type} special={special} expand={false}
										add={()=> this.addItem(name)} remove={()=> this.removeItem(name)}
										availableGold={availableGold} purchasedGear= {purchasedGear}/>
									)}
							</tbody>
						</table>
					</div>
					<div className="armor">
						<h3>Armor</h3>
						{/* For each category in weaponCategory we need a table - just hard code the three . . .   */}
						<h4>Light Armor</h4>
						<table className="armorTableLight">
							<caption></caption>
							<thead>
								<tr>
									<th>Quantity</th>
									<th>Name</th>
									<th>Cost</th>
									<th>Armor / Shield Bonus</th>
									<th>Maximum Dex Bonus</th>
									<th>Armor Check Penalty</th>
									<th>Arcane Spell Failure Chance</th>
									<th>Speed 20 ft. / 30 ft.</th>
									<th>Weight</th>
								</tr>
							</thead>
							<tbody>
								{ armorListsUse["light armor"].map(({name, description, cost, bonus, maxDexBonus, armorCheckPenalty, arcaneSpellFailureChance, speed, weight}) => 
									<Armor key={name} name={name} description={description} 
										cost={cost} bonus={bonus} maxDexBonus={maxDexBonus} 
										armorCheckPenalty={armorCheckPenalty} arcaneSpellFailureChance={arcaneSpellFailureChance}
										speed={speed} weight={weight} expand={false} add={()=> this.addItem(name)}
										remove={()=> this.removeItem(name)} availableGold={availableGold}
										purchasedGear= {purchasedGear}/>
									)}
							</tbody>
						</table>
						<h4>Medium Armor</h4>
						<table className="armorTableLight">
							<caption></caption>
							<thead>
								<tr>
									<th>Quantity</th>
									<th>Name</th>
									<th>Cost</th>
									<th>Armor / Shield Bonus</th>
									<th>Maximum Dex Bonus</th>
									<th>Armor Check Penalty</th>
									<th>Arcane Spell Failure Chance</th>
									<th>Speed 20 ft. / 30 ft.</th>
									<th>Weight</th>
								</tr>
							</thead>
							<tbody>
								{ armorListsUse["medium armor"].map(({name, description, cost, bonus, maxDexBonus, armorCheckPenalty, arcaneSpellFailureChance, speed, weight}) => 
									<Armor key={name} name={name} description={description} 
										cost={cost} bonus={bonus} maxDexBonus={maxDexBonus} 
										armorCheckPenalty={armorCheckPenalty} arcaneSpellFailureChance={arcaneSpellFailureChance}
										speed={speed} weight={weight} expand={false} add={()=> this.addItem(name)}
										remove={()=> this.removeItem(name)} availableGold={availableGold}
										purchasedGear= {purchasedGear}/>
									)}
							</tbody>
						</table>
						<h4>Heavy Armor</h4>
						<table className="armorTableLight">
							<caption></caption>
							<thead>
								<tr>
									<th>Quantity</th>
									<th>Name</th>
									<th>Cost</th>
									<th>Armor / Shield Bonus</th>
									<th>Maximum Dex Bonus</th>
									<th>Armor Check Penalty</th>
									<th>Arcane Spell Failure Chance</th>
									<th>Speed 20 ft. / 30 ft.</th>
									<th>Weight</th>
								</tr>
							</thead>
							<tbody>
								{ armorListsUse["heavy armor"].map(({name, description, cost, bonus, maxDexBonus, armorCheckPenalty, arcaneSpellFailureChance, speed, weight}) => 
									<Armor key={name} name={name} description={description} 
										cost={cost} bonus={bonus} maxDexBonus={maxDexBonus} 
										armorCheckPenalty={armorCheckPenalty} arcaneSpellFailureChance={arcaneSpellFailureChance}
										speed={speed} weight={weight} expand={false} add={()=> this.addItem(name)}
										remove={()=> this.removeItem(name)} availableGold={availableGold}
										purchasedGear= {purchasedGear}/>
									)}
							</tbody>
						</table>


					</div>
					<div className="adventuringGear"></div>
		    	</div>
			)
		} else { return null }
	}
}

function TradeGood(props){
	const name = props.name;
	const cost = props.cost;
	const item = props.item;	
	let quantity = 0;
	const availableGold = props.availableGold;
	const purchasedGear = props.purchasedGear;
	let disabledAdd = (availableGold < cost) ? true : false;
	let disabledRemove = 0;

	// set quantity
	if(purchasedGear){
		for(let i=0;i<purchasedGear.length;i++){
			if(purchasedGear[i].name === name){
				quantity++;
			}
		}
	}
	
	return(
		<tr>
			<td>
				<button className={"add_"+item+"_button"} onClick={props.add} disabled={disabledAdd}>+</button> 
				{quantity}
				<button className={"remove_"+item+"_button"} onClick={props.remove}>-</button>
			</td>
			<td>{cost} gp</td>
			<td>{item}</td>
		</tr>
	)
}

function Weapons(props){
	const name=props.name;
	const description=props.description;
	const cost=props.cost;
	const dmgS=props.dmgS;
	const dmgM=props.dmgM;
	const critical=props.critical;
	const range=props.range;
	const weight=props.weight;
	const type=props.type;
	const special=props.special;
	const expand=props.expand;
	const availableGold = props.availableGold;
	let disabledAdd = (availableGold < cost) ? true : false;
	let disabledRemove = 0;
	return(
		<tr>
			<td>
				<button className={"add_"+name+"_button"} onClick={props.add} disabled={disabledAdd}>+</button>
				0
				<button className={"remove_"+name+"_button"} onClick={props.remove}>-</button>
			</td>
			<td>{name}</td>
			<td>{cost} gp</td>
			<td>{dmgS}</td>
			<td>{dmgM}</td>
			<td>{critical}</td>
			<td>{range}</td>
			<td>{weight}</td>
			<td>{type}</td>
			<td>{special}</td>
		</tr>
	)
}

function Armor(props){
	const name=props.name;
	const description=props.description;
	const cost=props.cost	
	const bonus=props.bonus[Object.keys(props.bonus)[0]];
	const maxDexBonus=props.maxDexBonus;
	const armorCheckPenalty=props.armorCheckPenalty;
	const arcaneSpellFailureChance=props.arcaneSpellFailureChance;
	const weight=props.weight;
	const speed20=props.speed[Object.keys(props.speed)[0]];
	const speed30=props.speed[Object.keys(props.speed)[1]];
	const expand=props.expand;
	const quantity = " 0 "

	const availableGold = props.availableGold;
	let disabledAdd = (availableGold < cost) ? true : false;
	let disabledRemove = 0;
	return(
		<tr>
			<td>
				<button className={"add_"+name+"_button"} onClick={props.add} disabled={disabledAdd}>+</button>
				{quantity}
				<button className={"remove_"+name+"_button"} onClick={props.remove}>-</button>
			</td>
			<td>{name}</td>
			<td>{cost} gp</td>
			<td>{bonus}</td>
			<td>{maxDexBonus}</td>
			<td>{armorCheckPenalty}</td>
			<td>{arcaneSpellFailureChance}</td>
			<td>{weight}</td>
			<td>{speed20} / {speed30}</td>
		</tr>
	)
}

function groupBy2(xs, prop) {
  var grouped = {};
  for (var i=0; i<xs.length; i++) {
    var p = xs[i][prop];
    if (!grouped[p]) { grouped[p] = []; }
    grouped[p].push(xs[i]);
  }
  return grouped;
}

const mapStateToProps = state => ({
	gold:state.characterReducer.newCharacter.gold,
	availableGold:state.characterReducer.newCharacter.availableGold,
	purchasedGear:state.characterReducer.newCharacter.gear,
})

export default connect(mapStateToProps)(Equipment_Selection);



/*		
 						
*/