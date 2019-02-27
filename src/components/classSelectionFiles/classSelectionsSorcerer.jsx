import React from 'react';
import {connect} from 'react-redux';

import './classSelectionsSorcerer.css';

import { setGenericExpand } from '../../actions/index';
import { capitalizeFirstLetter } from '../../utility/helperFunctions';

export class ClassSelectionsSorcerer extends React.Component{
	render(){
        const bloodlines = require('../../data/bloodlines');
        const spells = require('../../data/spells');
        const expand = this.props.expand;

        // okay, spells has an unsorted array of spell objects. I need to find all the spells that have a level object with a class attribute of "sorcerer/wizard"
        // then sort that list by level object's attribute "num"
        // This will be done server side, for now a basic function built in here. 
        return (
            <div>
                <div>
                    <p>Each sorcerer has a source of magic somewhere in her heritage that grants her spells, bonus feats, an additional class skill, and other special abilities. This source can represent a blood relation or an extreme event involving a creature somewhere in the family’s past. For example, a sorcerer might have a dragon as a distant relative or her grandfather might have signed a terrible contract with a devil. Regardless of the source, this influence manifests in a number of ways as the sorcerer gains levels. A sorcerer must pick one bloodline upon taking her first level of sorcerer. Once made, this choice cannot be changed.</p>
                    <p>Bloodlines:</p>
                    {bloodlines.map(({name, description, classSkill, bonusSpells, bonusFeats, bloodlineArcana, bloodlinePowers}) => 
                        <CardBloodline key={name} name={name} description={description} classSkill={classSkill} bonusSpells={bonusSpells}
                        bonusFeats={bonusFeats} bloodlineArcana={bloodlineArcana} bloodlinePowers={bloodlinePowers}
                        expand={(expand === name) ? true : false}
                        onExpandClick={()=>this.onExpandClick(name)}
                        onSelectClick={()=>this.onSelectClick(name)}/>
                    )}
                </div>
                <div>
                    <p>Spells</p>
                </div>
            </div>
        )
    }
    
    groupBy(xs, prop){
        let grouped = {};
        for (let i=0; i<xs.length; i++) {
            let p = xs[i][prop];
            if (!grouped[p]) { grouped[p] = []; }
            grouped[p].push(xs[i]);
        }
        return grouped;
    }
    onExpandClick(name){
        const expand = this.props.expand;
        if(expand !== name){
            this.props.dispatch(setGenericExpand(name));
        } else {
            this.props.dispatch(setGenericExpand(""));
        }
    }
    onSelectClick(name){
        console.log(name);
    }
}

class CardBloodline extends React.Component{
    render(){
        const bonusSpells = this.props.bonusSpells;
        const bonusFeats = this.props.bonusFeats;
        const powers = this.props.bloodlinePowers.list;
        function displaySpells(spells){
            let stringSpells;
            spells.map(spell =>
                Object.keys(spell).forEach(key => {
                    if(!stringSpells){
                        stringSpells = spell[key];
                        stringSpells += " ("
                        stringSpells += key;
                        stringSpells += ")"
                    } else {
                        stringSpells += ", ";
                        stringSpells += spell[key];
                        stringSpells += " ("
                        stringSpells += key;
                        stringSpells += ")"
                    }
                })
            )
            return stringSpells;
        }
        if(this.props.expand){
            return (
                <div>
                    <h3>{capitalizeFirstLetter(this.props.name)} Bloodline</h3>
                    <button onClick={this.props.onSelectClick}>Select</button>
                    <button onClick={this.props.onExpandClick}>Hide</button>
                    <p>{this.props.description}</p>
                    <h4>Class Skill: </h4>{this.props.classSkill}
                    <h4>Bonus Spells: </h4>{displaySpells(bonusSpells)}
                    <h4>Bonus Feats: </h4>{bonusFeats.join(", ")}
                    <h4>Bloodline Arcana: </h4>{this.props.bloodlineArcana}
                    <h4>Bloodline Powers: </h4>
                    <p>{this.props.bloodlinePowers.description}</p>
                    <div>{powers.map(power => 
                        <p>{power.name} ({power.type}): {power.description}</p>
                    )}</div>
                    <button onClick={this.props.onSelectClick}>Select</button>
                    <button onClick={this.props.onExpandClick}>Hide</button>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{capitalizeFirstLetter(this.props.name)} Bloodline</p>
                    <button onClick={this.props.onSelectClick}>Select</button>
                    <button onClick={this.props.onExpandClick}>Expand</button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    expand:state.characterReducer.expand,
});

export default connect(mapStateToProps)(ClassSelectionsSorcerer);