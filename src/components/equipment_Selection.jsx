import React from 'react';
import {connect} from 'react-redux';

import { addItemToCharacter } from '../actions/index';
import { removeItemFromCharacter } from '../actions/index';
import { setStepToComplete } from '../actions/index';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { createBonus } from '../utility/statObjectFactories'
import { setInitialEquipmentSlots } from '../actions/index';
import { setEquipmentSlotStatus, setEquipmentSlotItem } from '../actions/index';
import { setTempArmorCategory, setTempArmor, addItemSlot } from '../actions/index';
import { setTempWeaponCategory, setTempWeapon, setTempWeaponAttackModifier, setTempWeaponDamageModifier } from '../actions/index';

import WeaponSlot from './weaponSlot'; 
import ArmorSlot from './armorSlot'; 
import ItemSlot from './itemSlot'; 

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
    this.props.dispatch(setInitialEquipmentSlots());

    // I want to add a check here; if there are items stored in the newcharacter.gear object,
    // I need to add them to the equipmentSlots. 
    const purchasedGear = this.props.purchasedGear;
    if(purchasedGear){
      // load gear found at character.gear.armor, .weapon, etc . . .   
      let weaponSlot = 0;
      let armorSlot = 0;
      let itemSlot = 0;
      for(let i=0;i<purchasedGear.length;i++){
        if(purchasedGear[i].bonus){
          // item is armor
          let armor = purchasedGear[i];
          let slot = { menu:"armor", id: armorSlot, currentState:"saved" };

          this.props.dispatch(setEquipmentSlotStatus(slot));
          this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:armor}));
          this.props.dispatch(setTempArmorCategory(armor.use));
          this.props.dispatch(setTempArmor(armor));

          // and finally take it out of the store
          this.props.dispatch(removeItemFromCharacter(armor));
          console.log("Bug #12");
          console.log(armor);

          if(armor.armorCheckPenalty !== 0){// If we are removing armor that has an ACP, remove the acp
            const skillList = require('../data/skills');
            const charStats = this.props.characterToUpdate.characterStats;
            let acpSkills = [];
            let arrayOfBonusesToRemove = [];
            
            for(let j=0; j<skillList.length; j++){
              if(skillList[j].armorCheckPenalty === true){
                acpSkills.push(skillList[j].name);
              }
            }
            
            
          }
        } else if(purchasedGear[i].dmgM){
          // item is a weapon
          let weapon = purchasedGear[i];
          let slot = { menu:"weapon", id: weaponSlot, currentState:"saved" };

          weapon.attackModifier = purchasedGear[i].weaponAttackModifier;
          weapon.damageModifier = purchasedGear[i].weaponDamageModifier;
          this.props.dispatch(setEquipmentSlotStatus(slot));
          this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:weapon}));
          this.props.dispatch(setTempWeaponCategory(weapon.use));
          this.props.dispatch(setTempWeapon(weapon));
          this.props.dispatch(setTempWeaponAttackModifier(weapon.attackModifier));
          this.props.dispatch(setTempWeaponDamageModifier(weapon.damageModifier));
          this.props.dispatch(removeItemFromCharacter(weapon));
        } else if(purchasedGear[i].isCollection){
          // item is an item i.e. goodsAndServices
          let item = purchasedGear[i];
          let slot = { menu:"item", id: itemSlot, currentState:"saved" };

          if(itemSlot > 0){
            this.props.dispatch(addItemSlot({"id":itemSlot, "currentState":"empty"}));
          }

          this.props.dispatch(setEquipmentSlotStatus(slot));
          this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:item}));
          this.props.dispatch(removeItemFromCharacter(item));
          itemSlot++;
        } else if(purchasedGear[i] !== null){
          // item is a trade goods
          let item = purchasedGear[i];
          let slot = { menu:"item", id: itemSlot, currentState:"saved" };

          if(itemSlot > 0){
            this.props.dispatch(addItemSlot({"id":itemSlot, "currentState":"empty"}));
          }

          this.props.dispatch(setEquipmentSlotStatus(slot));
          this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:item}));
          this.props.dispatch(removeItemFromCharacter(item));
          itemSlot++;
        }
      }
    }
  }

  submitEquipment(){
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

          // we also need to add the armor bonus
          let bonus = createBonus({ 
            name:"armor", 
            source:item.name, 
            stat:"armorClass", 
            type:"armor", 
            duration:-1, 
            amount:item.bonus.armor});
          this.props.dispatch(addBonus(bonus));
          this.props.dispatch(sumBonus(bonus));

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

	render(){
		const startingGold = this.props.gold;

		// import data
		const tradeGoodsList = this.props.tradeGoodsList;
		const weaponsList = this.props.weaponsList;
		const armorList = this.props.armorsList;
    const goodsAndServicesList = this.props.goodsAndServicesList;
    // flag to wait for data
    let dataLoaded = true;
    if(!tradeGoodsList || !weaponsList || !armorList || !goodsAndServicesList){
      dataLoaded = false;
    }
    
    let weaponSlots = this.props.tempEquipment ? this.props.tempEquipment.weaponSlots : [];
    let armorSlots = this.props.tempEquipment ? this.props.tempEquipment.armorSlots : [];
    let itemSlots = this.props.tempEquipment ? this.props.tempEquipment.itemSlots : 
      [{"id":0, "currentState":"empty"}];
    let itemsList = [goodsAndServicesList, tradeGoodsList]

    if(!dataLoaded){
      return null;
    } else if(startingGold || armorSlots.length === 0){
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

  armorsList:state.protectedData.armor,
  goodsAndServicesList:state.protectedData.goodsAndServices,
  tradeGoodsList:state.protectedData.tradeGoods,
  weaponsList:state.protectedData.weapons,
})

export default connect(mapStateToProps)(Equipment_Selection);