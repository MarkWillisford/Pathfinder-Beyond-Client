import React from 'react';
import { connect } from 'react-redux';
import { setEquipmentSlotStatus, setEquipmentSlotItem } from '../actions/index';
import { setTempArmorCategory, setTempArmor } from '../actions/index';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { spendGold } from '../actions/index';

import './armorSlot.css';

export class ArmorSlot extends React.Component{
  componentDidMount(){
    let armorCategories = [];
    let initialArmor;

    for(let i=0;i<this.props.armor.length;i++){
      if(!armorCategories.includes(this.props.armor[i].use)){
        armorCategories.push(this.props.armor[i].use);
      }
    }
    initialArmor = this.props.armor.filter((armor) => armor.use === armorCategories[0]);

    this.props.dispatch(setTempArmorCategory(armorCategories[0]));
    this.props.dispatch(setTempArmor(initialArmor[0]));
  }

  setEquipmentSlotStatus(slot){
    switch(slot.currentState){
      case "empty":
        let index = this.props.id;
        if(this.props.tempEquipment.armorSlots[index].item){
          this.props.dispatch(spendGold(-(this.props.tempEquipment.armorSlots[index].item.cost)));
        }
        this.props.dispatch(setEquipmentSlotStatus(slot));
        this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:null}));
      break;
      case "editing":
        this.props.dispatch(setEquipmentSlotStatus(slot));
        // this sets the armor saved in this slot to temp memory for display
        index = this.props.id;
        let armorCategories = [];
        let initialArmor;
        if(this.props.tempEquipment.armorSlots[index].item){
          initialArmor = this.props.armor.filter((armor) => armor.name === this.props.tempEquipment.armorSlots[index].item.name);
          armorCategories.push(initialArmor[0].use);
          this.props.dispatch(setTempArmorCategory(armorCategories[0]));
          this.props.dispatch(setTempArmor(initialArmor[0]));
        }        
      break;
      case "canceled":
        this.props.dispatch(setEquipmentSlotStatus({menu:slot.menu, id: slot.id, currentState: "saved"}));
      break;
      case "saved":
        let armor = this.props.tempEquipment.armor;
        armor.attackModifier = this.props.tempEquipment.armorAttackModifier;
        armor.damageModifier = this.props.tempEquipment.armorDamageModifier;
        this.props.dispatch(setEquipmentSlotStatus(slot));
        this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:armor}));

        // finally remove the cost from the avaiable gold        
		    this.props.dispatch(spendGold(armor.cost));
      break;
    }
  }
  handleChange(e){
    let category = e.target.value.toLowerCase();
    this.props.dispatch(setTempArmorCategory(category));
    let armor = this.props.armor.filter((armor) => armor.use === category);
    this.props.dispatch(setTempArmor(armor[0]));
  }
  handleChangeArmor(e){
    let armor = this.props.armor.filter((armor) => armor.name === e.target.value);
    this.props.dispatch(setTempArmor(armor[0]));
  }
  
  findStatisticByName(name, characterStats){
    for(let i=0;i<characterStats.length;i++){
      if(characterStats[i].name === name){
        return characterStats[i];
      }
    }
  }

	render(){
    //let strength = this.findStatisticByName("strength", this.props.charStats) ? Math.floor((this.findStatisticByName("strength", this.props.charStats).sum.total - 10) / 2) : 0;
    let dexterity = this.findStatisticByName("dexterity", this.props.charStats) ? Math.floor((this.findStatisticByName("dexterity", this.props.charStats).sum.total - 10) / 2) : 0;
    //let bab = this.findStatisticByName("bab", this.props.charStats) ? this.findStatisticByName("bab", this.props.charStats).sum.total : 0;
    let sizeString = this.props.newCharacter.race ? this.props.newCharacter.race.standardRacialTraits.base.size : "--";
    let sizeValue;
    let availableGold = this.props.availableGold;
    
    if(this.props.currentState === "empty"){
      return(
        <div className="armorSlotDiv">
          <div className="armorSlotEmpty" onClick={()=> this.setEquipmentSlotStatus({ menu:"armor", id: this.props.id, currentState:"editing" })}>Empty</div>        
        </div>
      )
    } else if(this.props.currentState === "saved"){
      let selectedArmor = this.props.tempEquipment.armor;
      let totalAC = 10 + selectedArmor.bonus.armor + ( dexterity > selectedArmor.maxDexBonus ? selectedArmor.maxDexBonus : dexterity );
      
      return(
        <div className="armorSlotSaved" onClick={()=> this.setEquipmentSlotStatus({ menu:"armor", id: this.props.id, currentState:"editing" })}>
          <div className="armorSlotName">{this.props.tempEquipment.armorSlots[this.props.id].item.name}</div>
          <div className="armorTotalACBonus">AC {totalAC}</div>
          <div className="armorDetails">({"Armor +" + selectedArmor.bonus.armor + ", Dex +" + dexterity})</div>
        </div>
      )
    } else {
      let armorCategories = [];
      for(let i=0;i<this.props.armor.length;i++){
        if(!armorCategories.includes(capitalizeFirstLetter(this.props.armor[i].use))){
          armorCategories.push(capitalizeFirstLetter(this.props.armor[i].use));
        }
      }
      let category = this.props.tempEquipment ? category = this.props.tempEquipment.armorCategory : "";
      let armor = this.props.armor.filter((armor) => armor.use === category);
      // first lets sort the armor by name
      armor.sort((a, b) => a.name > b.name ? 1 : -1);
      // now we need to split the armor into two arrays by cost. 
      let availableArmor = [];
      let unavailableArmor = [];
      for(let i=0;i<armor.length; i++){
        if(armor[i].cost > availableGold){
          unavailableArmor.push(armor[i]);
        } else {
          availableArmor.push(armor[i]);
        }
      }
      // and recombine them
      armor = availableArmor.concat(unavailableArmor); 
      // At this point the armor should be sorted by name with all the items too expensive at the end of the list

      switch(sizeString){
        case "small":
          sizeValue = 1;
        case "large":
          sizeValue = -1;
        default:
          sizeValue = 0;
      }

      let selectedArmor = this.props.tempEquipment.armor;
      let totalAC = 10 + selectedArmor.bonus.armor + ( dexterity > selectedArmor.maxDexBonus ? selectedArmor.maxDexBonus : dexterity );
      return(
        <div className="armorSlotDiv editing">
          <div className="armorSlotSelection">
            <div className="armorSelectionLabelCol">
              <div className="armorSelectionLabel">Type</div>
              <div className="armorSelectionLabel">Armor</div>
              <div className="armorSelectionLabel">Armor Bonus</div>
              <div className="armorSelectionLabel">Max Dex Bonus</div>
              <div className="armorSelectionLabel">Arcane Failure</div>
              <div className="armorSelectionLabel">Check Penalty</div>
              {/* <div className="armorSelectionLabel">Speed (Adjusted)</div> */}
              <div className="armorSelectionLabel">Total AC</div>
              <div className="armorSelectionLabel">Cost (gp)</div>
            </div>          
            <div className="armorSelectionLabelData">
              <div className="armorSelectionInput">
                <select name="armorCategory" onChange={this.handleChange.bind(this)} value={capitalizeFirstLetter(this.props.tempEquipment.armorCategory)}>
                  {armorCategories.map((cat) => (<option key={cat}>{cat}</option>))}
                </select>
              </div>
              <div className="armorSelectionInput">
                <select name="armor" onChange={this.handleChangeArmor.bind(this)} value={this.props.tempEquipment.armor.name}>
                  {armor.map((armor, i) => (<option key={armor.name} style={armor.cost > availableGold ? {color:"red"} : {color:"black"}}>{armor.name}</option>))}
                </select>
              </div>
              <div className="armorSelectionOutput">{selectedArmor.bonus.armor}</div>
              <div className="armorSelectionOutput">{selectedArmor.maxDexBonus}</div>
              <div className="armorSelectionOutput">{selectedArmor.arcaneSpellFailureChance}%</div>
              <div className="armorSelectionOutput">{selectedArmor.armorCheckPenalty}</div>
              {/* <div className="armorSelectionOutput"> -- </div> */}
              <div className="armorSelectionOutput">{totalAC}</div>
              <div className="armorSelectionOutput">{selectedArmor.cost}gp</div>
            </div>
          </div>
          <button onClick={()=> this.setEquipmentSlotStatus({ menu:"armor", id: this.props.id, currentState:"empty" })}>clear and exit</button>
          <button onClick={()=> this.setEquipmentSlotStatus({ menu:"armor", id: this.props.id, currentState:"saved" })}
            disabled={this.props.tempEquipment.armor.cost > availableGold ? true : false}>
              {this.props.tempEquipment.armor.cost > availableGold ? "not enough gold" : "save changes"}</button>
          {this.props.tempEquipment.armorSlots[this.props.id].item && 
            <button onClick={()=> this.setEquipmentSlotStatus({ menu:"armor", id: this.props.id, currentState:"canceled" })}>cancel changes</button>}
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

export default connect(mapStateToProps)(ArmorSlot);