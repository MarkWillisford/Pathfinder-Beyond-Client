import React from 'react';
import {connect} from 'react-redux';
import CardGoodsOrService from './cardGoodsOrService'

import { spendGold } from '../actions/index';
import { addItemToCharacter } from '../actions/index';
import { removeItemFromCharacter } from '../actions/index';
import { setStepToComplete } from '../actions/index';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { createBonus } from '../utility/statObjectFactories'
import { fetchProtectedData, clearData } from '../actions/protectedData';
import { fetchProtectedSubData } from '../actions/protectedData';
import { fetchProtectedSecondaryData } from '../actions/protectedData';
import { fetchProtectedExtraData } from '../actions/protectedData';
import { setInitialEquipmentSlots } from '../actions/index';

import WeaponSlot from './weaponSlot'; 
import ArmorSlot from './armorSlot'; 
import ItemSlot from './itemSlot'; 

import './equipment_Selection.css';

export class Equipment_Selection extends React.Component {
  componentDidUpdate() {
    let element;
    element = document.getElementsByClassName("editing")[0];
    if(element){
      element = element.previousSibling;
    } else {
      element = document.getElementsByClassName("top")[0];
      if(element){
      } else {
        element = document.getElementsByClassName("title")[0];
      }
    }
    
    element.scrollIntoView({behavior: 'smooth'});
  }

  componentDidMount(){
    let editing = false;
    const tempEquipment = this.props.tempEquipment;
    if(tempEquipment){
      for(let i=0;i<tempEquipment.weaponSlots.length;i++){
        if(tempEquipment.weaponSlots[i].item){
          editing = true;
        }
      }
      for(let i=0;i<tempEquipment.armorSlots.length;i++){
        if(tempEquipment.armorSlots[i].item){
          editing = true;
        }
      }
      for(let i=0;i<tempEquipment.itemSlots.length;i++){
        if(tempEquipment.itemSlots[i].item){
          editing = true;
        }
      }
    }

    this.props.dispatch(clearData());
    this.props.dispatch(fetchProtectedData("armors"));
    this.props.dispatch(fetchProtectedSubData("goodsAndServices"));
    this.props.dispatch(fetchProtectedSecondaryData("tradeGoods"));
    this.props.dispatch(fetchProtectedExtraData("weapons"));

    // only do this if there is nothing already in the slots
    if(!editing){
      this.props.dispatch(setInitialEquipmentSlots());
    }
  }

  submitEquipment(){
    console.log("submitting");
    const tempEquipment = this.props.tempEquipment;
    if(tempEquipment){
      for(let i=0;i<tempEquipment.weaponSlots.length;i++){
        if(tempEquipment.weaponSlots[i].item){
          this.props.dispatch(addItemToCharacter(tempEquipment.weaponSlots[i].item));
        }
      }
      for(let i=0;i<tempEquipment.armorSlots.length;i++){
        if(tempEquipment.armorSlots[i].item){
          let item = tempEquipment.armorSlots[i].item;

          // If we are adding armor, add the acp
          const skillList = require('../data/skills');
          let acpSkills = [];
          for(let j=0; j<skillList.length; j++){
            if(skillList[j].armorCheckPenalty === true){
              acpSkills.push(skillList[j].name);
            }
          }

          for(let k=0; k<acpSkills.length;k++){   
            let bonus = createBonus({ 
              name:"armorCheckPenalty", 
              source:item.name, 
              stat:acpSkills[k], 
              type:"armorCheckPenalty", 
              duration:-1, 
              amount:item.armorCheckPenalty});
            this.props.dispatch(addBonus(bonus));
            this.props.dispatch(sumBonus(bonus));
          }

          this.props.dispatch(addItemToCharacter(tempEquipment.armorSlots[i].item));
        }
      }
      for(let i=0;i<tempEquipment.itemSlots.length;i++){
        if(tempEquipment.itemSlots[i].item){
          this.props.dispatch(addItemToCharacter(tempEquipment.itemSlots[i].item));
        }
      }
    }
    this.props.dispatch(setStepToComplete(7));
  }

	/* removeItem(name){
		const tradeGoodsList = this.props.tradeGoodsList;  //require('../data/tradeGoods');
		const weaponsList = this.props.weaponsList;    //require('../data/weapons');
		const armorList = this.props.armorList;    //require('../data/armor');
		const goodsAndServicesList = this.props.goodsAndServicesList;   //require('../data/goodsAndServices');
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
	} */

	render(){
		const startingGold = this.props.gold;
		let availableGold = this.props.availableGold;
    const purchasedGear = this.props.purchasedGear;
    const expandedSlot = this.props.expandedSlot;

		// inport data
		const tradeGoodsList = this.props.tradeGoodsList;
		const weaponsList = this.props.weaponsList;
		const armorList = this.props.armorsList;
    const goodsAndServicesList = this.props.goodsAndServicesList;

    let weaponSlots = this.props.tempEquipment ? this.props.tempEquipment.weaponSlots : [];
    let armorSlots = this.props.tempEquipment ? this.props.tempEquipment.armorSlots : [];
    let itemSlots = this.props.tempEquipment ? this.props.tempEquipment.itemSlots : 
      [{"id":0, "currentState":"empty"}];
    let itemsList = [goodsAndServicesList, tradeGoodsList]
/*     for(let i=0;i<itemSlots.length;i++){
      itemSlots[i].items = [goodsAndServicesList, tradeGoodsList];      // HOW DOES THIS MODIFY THE STORE?  
    } */
    if(startingGold){
			return (
        <div className="equipment">
          <button onClick={()=>this.submitEquipment()}>Submit</button>
          <div className="weaponsDiv">
            <h3>Weapons</h3>
            {weaponSlots.map((s) => <WeaponSlot key={s.id} id={s.id} currentState={s.currentState} weapons={weaponsList}/>)}
          </div>
          <div className="ArmorDiv">  
            <h3>Armor</h3>
            {armorSlots.map((s) => <ArmorSlot key={s.id} id={s.id} currentState={s.currentState} armor={armorList}/>)}
          </div>
          <div className="ItemsDiv">
            <h3>Items</h3>
            {itemSlots.map((i) => <ItemSlot key={i.id} id={i.id} currentState={i.currentState} items={itemsList}/>)}
          </div>
          <button onClick={()=>this.submitEquipment()}>Submit</button>
        </div>
      )
		} else { return null }
	}
}

// Love this, found on https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property 
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
  characterToUpdate:state.characterReducer.newCharacter,
  expandedSlot:state.characterReducer.expanded,
  tempEquipment:state.characterReducer.tempEquipment,

  armorsList:state.protectedData.data,
  goodsAndServicesList:state.protectedData.subData,
  tradeGoodsList:state.protectedData.secondaryData,
  weaponsList:state.protectedData.extraData,
})

export default connect(mapStateToProps)(Equipment_Selection);