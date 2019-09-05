import React from 'react';
import { connect } from 'react-redux';
import { setEquipmentSlotStatus, setEquipmentSlotItem } from '../actions/index';
import { setTempItemCategory, setTempItem, addItemSlot } from '../actions/index';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { spendGold } from '../actions/index';

import './itemSlot.css';

export class ItemSlot extends React.Component{
  componentDidMount(){
    let itemCategories = ["Goods and Services", "Trade Goods"];

    this.props.dispatch(setTempItemCategory(itemCategories[0]));
    this.props.dispatch(setTempItem(this.props.items[0][0]));
  }

  setEquipmentSlotStatus(slot){
     switch(slot.currentState){
      case "empty":
        let index = this.props.id;
        if(this.props.tempEquipment.itemSlots[index].item){
          this.props.dispatch(spendGold(-(this.props.tempEquipment.itemSlots[index].item.cost)));
        }
        this.props.dispatch(setEquipmentSlotStatus(slot));
        this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:null}));
      break;
      case "editing":
        this.props.dispatch(setEquipmentSlotStatus(slot));
        // this sets the item saved in this slot to temp memory for display
        index = this.props.id;
        let itemCategory;
        let initialItem;
        if(this.props.tempEquipment.itemSlots[index].item){
          initialItem = this.findItemInLists(this.props.tempEquipment.itemSlots[index].item.name);
          itemCategory = this.findCategoryFromItem(this.props.tempEquipment.itemSlots[index].item.name);

          this.props.dispatch(setTempItemCategory(itemCategory));
          this.props.dispatch(setTempItem(initialItem));
          this.props.dispatch(spendGold(-this.props.tempEquipment.itemSlots[index].item.cost));
        }
      break;
      case "canceled":
        this.props.dispatch(setEquipmentSlotStatus({menu:slot.menu, id: slot.id, currentState: "saved"}));
        index = this.props.id;
        this.props.dispatch(spendGold(this.props.tempEquipment.itemSlots[index].item.cost));
      break;
      case "saved":
        let item = this.props.tempEquipment.item;
        this.props.dispatch(setEquipmentSlotStatus(slot));
        this.props.dispatch(setEquipmentSlotItem({menu:slot.menu, id: slot.id, item:item}));

        // finally remove the cost from the avaiable gold        
		    this.props.dispatch(spendGold(item.cost));
      break;
    }
  }
  findItemInLists(name){
    for(let i=0; i<this.props.items.length;i++){
      for(let j=0;j<this.props.items[i].length;j++){
        if(this.props.items[i][j].name === name){
          return this.props.items[i][j];
        }
      }
    }
  }
  findCategoryFromItem(name){
    let categoryIndex;
    for(let i=0; i<this.props.items.length;i++){
      for(let j=0;j<this.props.items[i].length;j++){
        if(this.props.items[i][j].name === name){
          categoryIndex = i;
        }
      }
    }
    switch(categoryIndex){
      case 0:
        return "Goods and Services";
      case 1:
        return "Trade Goods";
    }
  }

  handleChange(e){
    this.props.dispatch(setTempItemCategory(e.target.value));    
    this.props.dispatch(setTempItem(this.findItemsByCategory(e.target.value)[0]));
  }
  handleChangeItem(e){
    const selectedCategory = this.props.tempEquipment.itemCategory;
    const list = this.findItemsByCategory(selectedCategory);
    let returnItem;

    for(let i=0;i<list.length;i++){
      if(list[i].name === e.target.value){
        returnItem = list[i];
      }
    }

    this.props.dispatch(setTempItem(returnItem));
  }
  addAdditionalItemSlot(){
    let itemSlots = this.props.tempEquipment.itemSlots;
    // [{"id":0, "currentState":"empty"}];
    let newId = itemSlots.length;
    this.props.dispatch(addItemSlot({"id":newId, "currentState":"empty"}));
  }


  findItemsByCategory(category){
    switch(category){
      case "Goods and Services":
        return this.props.items[0];
      case "Trade Goods":
        return this.props.items[1];
    }
  }
  /* readableStringToCode(string){
    let newArray = string.split(" ");
    newArray[0] = newArray[0].toLowerCase();
    let returnString = newArray.join("");
    return returnString;
  } */

  /* codeToReadableString(string){
    let categoryArray = string.split(/(?=[A-Z])/);
    let category = categoryArray.join(" ");
    return category;
  } */

	render(){
    let availableGold = this.props.availableGold;
    if(this.props.currentState === "empty"){
      return(
        <div className="itemSlotDiv">
          <div className="itemSlotEmpty" onClick={()=> this.setEquipmentSlotStatus({ menu:"item", id: this.props.id, currentState:"editing" })}>Empty</div>        
        </div> 
      )
    } else if(this.props.currentState === "saved"){
      return (
        <div>
          <div className="itemSlotSaved" onClick={()=> this.setEquipmentSlotStatus({ menu:"item", id: this.props.id, currentState:"editing" })}>
            <div className="itemSlotName">{this.props.tempEquipment.itemSlots[this.props.id].item.name}</div>
          </div>
          <div className="itemSlotAdditional"><button onClick={() => this.addAdditionalItemSlot()}>+</button></div>
        </div>
      )
    } else {
      // get the item categories and turn them into a readable list. IE goodsAndServices into "Goods And Services"
      let itemCategories = ["Goods and Services", "Trade Goods"];
      let selectedCategory = this.props.tempEquipment.itemCategory;
      let items = this.findItemsByCategory(selectedCategory);
      // sort
      items = items.sort((a,b) => a.name > b.name ? 1 : -1);
      // now we need to split the items into two arrays by cost. 
      let availableItems = [];
      let unavailableItems = [];
      for(let i=0;i<items.length; i++){
        if(items[i].cost > availableGold){
          unavailableItems.push(items[i]);
        } else {
          availableItems.push(items[i]);
        }
      }
      // and recombine them
      items = availableItems.concat(unavailableItems); 
      // At this point the armor should be sorted by name with all the items too expensive at the end of the list

      return(
        <div className="itemSlotDiv editing">
          <div className="itemSlotSelection">
            <div className="itemSelectionLabelCol">
              <div className="itemSelectionLabel">Category</div>
              <div className="itemSelectionLabel">Item</div>
              <div className="itemSelectionLabel">Cost (gp)</div>
              {this.props.tempEquipment.item.weight && <div className="itemSelectionLabel">Weight</div>}
            </div>          
            <div className="itemSelectionLabelData">
              <div className="itemSelectionInput">
                <select name="itemCategory" onChange={this.handleChange.bind(this)} value={this.props.tempEquipment.itemCategory}>
                  {itemCategories.map((cat) => (<option key={cat}>{cat}</option>))}
                </select>
              </div>
              <div className="itemSelectionInput">
                <select name="item" onChange={this.handleChangeItem.bind(this)} value={this.props.tempEquipment.item.name}>
                  {items.map((item, i) => (<option key={item.name} style={item.cost > availableGold ? {color:"red"} : {color:"black"}}>{item.name}</option>))}
                </select>
              </div>
              <div className="itemSelectionOutput">{this.props.tempEquipment.item.cost}</div>
              {this.props.tempEquipment.item.weight && <div className="itemSelectionOutput">{this.props.tempEquipment.item.weight + " lbs."}</div>}
            </div>
          </div>
          <button onClick={()=> this.setEquipmentSlotStatus({ menu:"item", id: this.props.id, currentState:"empty" })}>clear and exit</button>
          <button onClick={()=> this.setEquipmentSlotStatus({ menu:"item", id: this.props.id, currentState:"saved" })}
            disabled={this.props.tempEquipment.item.cost > availableGold ? true : false}>
            {this.props.tempEquipment.item.cost > availableGold ? "not enough gold" : "save changes"}</button>
          {this.props.tempEquipment.itemSlots[this.props.id].item && 
            <button onClick={()=> this.setEquipmentSlotStatus({ menu:"item", id: this.props.id, currentState:"canceled" })}>cancel changes</button>}
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

export default connect(mapStateToProps)(ItemSlot);