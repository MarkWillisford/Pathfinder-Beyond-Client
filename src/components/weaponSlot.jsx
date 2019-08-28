import React from 'react';
import { connect } from 'react-redux';
import { setEquipmentSlotStatus, setEquipmentSlotItem } from '../actions/index';
import { setTempWeaponCategory, setTempWeapon, setTempWeaponAttackModifier, setTempWeaponDamageModifier } from '../actions/index';
import { spendGold } from '../actions/index';

import './weaponSlot.css';

export class WeaponSlot extends React.Component{
  componentDidMount(){
    let weaponCategories = [];
    let initialWeapon;

    if(this.props.weapons){
      for(let i=0;i<this.props.weapons.length;i++){
        if(!weaponCategories.includes(this.props.weapons[i].use)){
          weaponCategories.push(this.props.weapons[i].use);
        }
      }
      initialWeapon = this.props.weapons.filter((weapon) => weapon.use === weaponCategories[0]);

      this.props.dispatch(setTempWeaponCategory(weaponCategories[0]));
      this.props.dispatch(setTempWeapon(initialWeapon[0]));
      this.props.dispatch(setTempWeaponAttackModifier("strength"));
      this.props.dispatch(setTempWeaponDamageModifier("strength"));
    }
  }

  setEquipmentSlotStatus(slot){
    switch(slot.currentState){
      case "empty":
        let index = this.props.id;
        if(this.props.tempEquipment.weaponSlots[index].item){
          this.props.dispatch(spendGold(-(this.props.tempEquipment.weaponSlots[index].item.cost)));
        }
        this.props.dispatch(setEquipmentSlotStatus(slot));
        this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:null}));
      break;
      case "editing":
        this.props.dispatch(setEquipmentSlotStatus(slot));
        index = this.props.id;
        let weaponCategories = [];
        let initialWeapon;
        if(this.props.tempEquipment.weaponSlots[index].item){
          console.log(this.props.tempEquipment.weaponSlots[index].item);
          initialWeapon = this.props.weapons.filter((weapon) => weapon.name === this.props.tempEquipment.weaponSlots[index].item.name);
          weaponCategories.push(initialWeapon[0].use);
          this.props.dispatch(setTempWeaponCategory(weaponCategories[0]));
          this.props.dispatch(setTempWeapon(initialWeapon[0]));
        }        
      break;
      case "canceled":
        this.props.dispatch(setEquipmentSlotStatus({menu:slot.menu, id: slot.id, currentState: "saved"}));
      break;
      case "saved":
        let weapon = this.props.tempEquipment.weapon;
        weapon.attackModifier = this.props.tempEquipment.weaponAttackModifier;
        weapon.damageModifier = this.props.tempEquipment.weaponDamageModifier;
        this.props.dispatch(setEquipmentSlotStatus(slot));
        this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:weapon}));

        // finally remove the cost from the avaiable gold
		    this.props.dispatch(spendGold(weapon.cost));
      break;
    }
  }
  handleChange(e){
    this.props.dispatch(setTempWeaponCategory(e.target.value));
    let weapon = this.props.weapons.filter((weapon) => weapon.use === e.target.value);
    this.props.dispatch(setTempWeapon(weapon[0]));
  }
  handleChangeWeapon(e){
    let weapon = this.props.weapons.find((w) => (w.name === e.target.value));
    this.props.dispatch(setTempWeapon(weapon));
  }
  handleWeaponAttackMod(e){
    this.props.dispatch(setTempWeaponAttackModifier(e.target.value));
  }
  handleWeaponDamageMod(e){
    this.props.dispatch(setTempWeaponDamageModifier(e.target.value));
  }
  
  findStatisticByName(name, characterStats){
    for(let i=0;i<characterStats.length;i++){
      if(characterStats[i].name === name){
        return characterStats[i];
      }
    }
  }

	render(){
    let strength = this.findStatisticByName("strength", this.props.charStats) ? Math.floor((this.findStatisticByName("strength", this.props.charStats).sum.total - 10) / 2) : 0;
    let dexterity = this.findStatisticByName("dexterity", this.props.charStats) ? Math.floor((this.findStatisticByName("dexterity", this.props.charStats).sum.total - 10) / 2) : 0;
    let bab = this.findStatisticByName("bab", this.props.charStats) ? this.findStatisticByName("bab", this.props.charStats).sum.total : 0;
    let sizeString = this.props.newCharacter.race ? this.props.newCharacter.race.standardRacialTraits.base.size : "--";
    let sizeValue;
    let availableGold = this.props.availableGold;

    
    if(this.props.currentState === "empty"){
      return(
        <div className="weaponSlotDiv">
          <div className="weaponSlotEmpty" onClick={()=> this.setEquipmentSlotStatus({ menu:"weapon", id: this.props.id, currentState:"editing" })}>Empty</div>        
        </div>
      )
    } else if(this.props.currentState === "saved"){
      let attackModifier;
      switch(this.props.tempEquipment.weaponSlots[this.props.id].item.attackModifier){
        case "dexterity":
          attackModifier = dexterity;
          break;
        default:
          attackModifier = strength;
          break;
      }
      let damageMod;
      switch(this.props.tempEquipment.weaponSlots[this.props.id].item.damageModifier){
        case "none":
          damageMod = "";
          break;
        case "0_5_strength":
          damageMod = (Math.floor(strength / 2) !== 0) ? (" + " + Math.floor(strength / 2)) : "";
          break;
        case "strength":
          damageMod = (strength !== 0) ? (" + " + strength) : "";
          break;
        case "1_5_strength":
          damageMod = (Math.floor(strength * 1.5) !== 0) ? (" + " + Math.floor(strength * 1.5)) : "";
          break;
        case "2_strength":
          damageMod = (strength * 2 !== 0) ? (" + " + strength * 2) : "";
          break;
        case "dexterity":
          damageMod = (dexterity !== 0) ? (" + " + dexterity) : "";
          break;
      }
      let damageDice;
      switch(sizeString){
        case "small":
          sizeValue = -1;
          damageDice = this.props.tempEquipment.weaponSlots[this.props.id].item ? this.props.tempEquipment.weaponSlots[this.props.id].item.dmgS : "";
        case "large":
          sizeValue = 1;
        default:
          sizeValue = 0;
          damageDice = this.props.tempEquipment.weaponSlots[this.props.id].item ? this.props.tempEquipment.weaponSlots[this.props.id].item.dmgM : "";
      }
      let attack = bab + attackModifier + sizeValue;

      return(
        <div className="weaponSlotSaved" onClick={()=> this.setEquipmentSlotStatus({ menu:"weapon", id: this.props.id, currentState:"editing" })}>
          <div className="weaponSlotName">{this.props.tempEquipment.weaponSlots[this.props.id].item.name}</div>
          <div className="weaponSlotAttack">{"+ " + attack}</div>
          <div className="weaponSlotDamage">({damageDice + damageMod + " " + this.props.tempEquipment.weaponSlots[this.props.id].item.critical})</div>
        </div>
      )
    } else {
      let weaponCategories = [];
      for(let i=0;i<this.props.weapons.length;i++){
        if(!weaponCategories.includes(this.props.weapons[i].use)){
          weaponCategories.push(this.props.weapons[i].use);
        }
      }
      let category = this.props.tempEquipment ? category = this.props.tempEquipment.weaponCategory : "";
      let weapons = this.props.weapons.filter((weapon) => weapon.use === category);
      
      // first lets sort the weapons by name
      weapons.sort((a, b) => a.name > b.name ? 1 : -1);
      // now we need to split the weapons into two arrays by cost. 
      let availableWeapons = [];
      let unavailableWeapons = [];
      for(let i=0;i<weapons.length; i++){
        if(weapons[i].cost > availableGold){
          unavailableWeapons.push(weapons[i]);
        } else {
          availableWeapons.push(weapons[i]);
        }
      }
      // and recombine them
      weapons = availableWeapons.concat(unavailableWeapons); 
      // At this point the weapons should be sorted by name with all the items too expensive at the end of the list


      let weapon = this.props.tempEquipment ? this.props.tempEquipment.weapon : null;
      let damageDice;
      switch(sizeString){
        case "small":
          sizeValue = -1;
          damageDice = this.props.tempEquipment.weapon ? this.props.tempEquipment.weapon.dmgS : "";
        case "large":
          sizeValue = 1;
        default:
          sizeValue = 0;
          damageDice = this.props.tempEquipment.weapon ? this.props.tempEquipment.weapon.dmgM : "";
      }

      let attackModifier;
      switch(this.props.tempEquipment.weaponAttackModifier){
        case "dexterity":
          attackModifier = dexterity;
          break;
        default:
          attackModifier = strength;
          break;
      }
      let damageMod;
      switch(this.props.tempEquipment.weaponDamageModifier){
        case "none":
          damageMod = "";
          break;
        case "0_5_strength":
          damageMod = (Math.floor(strength / 2) !== 0) ? (" + " + Math.floor(strength / 2)) : "";
          break;
        case "strength":
          damageMod = (strength !== 0) ? (" + " + strength) : "";
          break;
        case "1_5_strength":
          damageMod = (Math.floor(strength * 1.5) !== 0) ? (" + " + Math.floor(strength * 1.5)) : "";
          break;
        case "2_strength":
          damageMod = (strength * 2 !== 0) ? (" + " + strength * 2) : "";
          break;
        case "dexterity":
          damageMod = (dexterity !== 0) ? (" + " + dexterity) : "";
          break;
      }
      let attack = bab + attackModifier + sizeValue;

      return(
        <div className="weaponSlotDiv editing">
          <div className="weaponSlotSelection">
            <div className="weaponSelectionLabelCol">
              <div className="weaponSelectionLabel">Category</div>
              <div className="weaponSelectionLabel">Weapon</div>
              <div className="weaponSelectionLabel">Attack</div>
              <div className="weaponSelectionLabel">Damage</div>
              <div className="weaponSelectionLabel">Critical</div>
              <div className="weaponSelectionLabel">Type</div>
              <div className="weaponSelectionLabel">Range Inc.</div>
              <div className="weaponSelectionLabel">Attack Modifier</div>
              <div className="weaponSelectionLabel">Damage Modifier</div>
              <div className="weaponSelectionLabel">Cost (gp)</div>
            </div>          
            <div className="weaponSelectionLabelData">
              <div className="weaponSelectionInput">
                <select name="weaponCategory" onChange={this.handleChange.bind(this)} value={this.props.tempEquipment.weaponCategory}>
                  {weaponCategories.map((cat) => (<option key={cat}>{cat}</option>))}
                </select>
              </div>
              <div className="weaponSelectionInput">
                <select name="weapon" onChange={this.handleChangeWeapon.bind(this)} value={this.props.tempEquipment.weapon.name}>
                  {weapons.map((weapon, i) => (<option key={weapon.name} style={weapon.cost > availableGold ? {color:"red"} : {color:"black"}}>{weapon.name}</option>))}
                </select>
              </div>
              <div className="weaponSelectionOutput">{"+" + attack}</div>
              <div className="weaponSelectionOutput">{damageDice + damageMod}</div>
              <div className="weaponSelectionOutput">{weapon ? weapon.critical : "--"}</div>
              <div className="weaponSelectionOutput">{weapon ? weapon.type : "--"}</div>
              <div className="weaponSelectionOutput">{weapon && weapon.range !== null ? weapon.range + " ft." : "--"}</div>
              <div className="weaponSelectionInput">
                <select name="weaponAttackMod" onChange={this.handleWeaponAttackMod.bind(this)} value={this.props.tempEquipment.weaponAttackModifier}>
                  <option value="strength">Strength</option>
                  <option value="dexterity">Dexterity</option>
                </select>
              </div>
              <div className="weaponSelectionInput">
                <select name="weaponDamageMod" onChange={this.handleWeaponDamageMod.bind(this)} value={this.props.tempEquipment.weaponDamageModifier}>
                  <option value="none">None</option>
                  <option value="0_5_strength">.5 Strength</option>
                  <option value="strength">Strength</option>
                  <option value="1_5_strength">1.5 Strength</option>
                  <option value="2_strength">2 Strength</option>
                  <option value="dexterity">Dexterity</option>
                </select></div>
              <div className="weaponSelectionInput">{weapon.cost}</div>
            </div>
          </div>
          <button onClick={()=> this.setEquipmentSlotStatus({ menu:"weapon", id: this.props.id, currentState:"empty" })}>clear and exit</button>
          <button onClick={()=> this.setEquipmentSlotStatus({ menu:"weapon", id: this.props.id, currentState:"saved" })}
            disabled={this.props.tempEquipment.weapon.cost > availableGold ? true : false}>
            {this.props.tempEquipment.weapon.cost > availableGold ? "not enough gold" : "save changes"}</button>
          {this.props.tempEquipment.weaponSlots[this.props.id].item && 
            <button onClick={()=> this.setEquipmentSlotStatus({ menu:"weapon", id: this.props.id, currentState:"canceled" })}>cancel changes</button>}
        </div>
      )
    }
	}	
}

const mapStateToProps = state => ({
  tempEquipment:state.characterReducer.tempEquipment,
  newCharacter:state.characterReducer.newCharacter,
  charStats:state.characterReducer.newCharacter.characterStats,
  availableGold:state.characterReducer.newCharacter.availableGold,
});

export default connect(mapStateToProps)(WeaponSlot);