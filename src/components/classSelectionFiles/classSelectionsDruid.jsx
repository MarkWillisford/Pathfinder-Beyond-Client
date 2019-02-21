import React from 'react';
import {connect} from 'react-redux';
import { CardDomain } from '../cardDomain';

import { setGenericExpand } from '../../actions/index';
import { submitNatureBond } from '../../actions/index';
import { submitClassToState } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { createBonus } from '../../utility/statObjectFactories';

import './classSelectionsDruid.css';

export class ClassSelectionsDruid extends React.Component{
	render(){
        const druidNatureBond = this.groupBy(require('../../data/druidNatureBond'), "type");
        const expand = this.props.expand;

        return (
            <div>
                <p>At 1st level, a druid forms a bond with nature. This bond can take one of two forms. The first is a close tie to the natural world, granting the druid a cleric domain. The second option is to form a close bond with an animal companion. This animal is a loyal companion that accompanies the druid on her adventures.</p>
                <p>Domains:</p>
                {druidNatureBond.domain.map(({name, description, domainSpells, grantedPowers}) =>
                    <CardDomain key={name} name={name} description={description} domainSpells={domainSpells} grantedPowers={grantedPowers}
                    expand={(expand === name) ? true : false}
                    onExpandClick={()=>this.onExpandClick(name)}
                    onSelectClick={()=>this.onSelectClick({name, description, domainSpells, grantedPowers})}/>
                )}
                <p>Animal Companions:</p>
                {druidNatureBond["animal companion"].map(({name, startingStatistics, advancement}) =>
                    <CardAnimalCompanion key={name} name={name} startingStatistics={startingStatistics} advancement={advancement}
                    expand={(expand === name) ? true : false}
                    onExpandClick={()=>this.onExpandClick(name)}
                    onSelectClick={()=>this.onSelectClick({name, startingStatistics, advancement})}/>
                )}
            </div>
        )
    }
    
    onSelectClick(natureBond){
        for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
			if( this.props.classesArray[i].name==="druid" ){
				let bonus = createBonus({ 
					name:"classBAB", 
					source:"class", 
					stat:"bab", 
					type:"untyped", 
					duration:-1, 
					amount:this.props.classesArray[i].classFeatures.table[1][1] });
				this.props.dispatch(addBonus(bonus));
				this.props.dispatch(sumBonus(bonus));
                this.props.dispatch(submitClassToState(i));
                this.props.dispatch(submitNatureBond(natureBond));
			}
		}
    }

    onExpandClick(name){
        const expand = this.props.expand;
        if(expand !== name){
            this.props.dispatch(setGenericExpand(name));
        } else {
            this.props.dispatch(setGenericExpand(""));
        }
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
}

class CardAnimalCompanion extends React.Component{
    render(){
        if(this.props.expand){
            const start = this.props.startingStatistics;
            const sas = start.abilityScores;
            const adv = this.props.advancement;
            function numSytax (string) {
                const synt = {
                    1:() => "1st",
                    2:() => "2nd",
                    3:() => "3rd",
                    "default":() => string+"th"
                }
                return (synt[string] || synt["default"])();
            }
            function shortenAbilityScores(string){
                const ability = {
                    "strength":() => "Str",
                    "dexterity":() => "Dex",
                    "constitution":() => "Con",
                    "intelligence":() => "Int",
                    "wisdom":() => "Wis",
                    "charisma":() => "Cha"
                }
                return (ability[string])();
            }
            function abilityDisplay(abilityObject){
                let stringKeys;
                Object.keys(abilityObject).forEach(key => {
                    if(!stringKeys){
                        stringKeys = shortenAbilityScores(key);
                    } else {
                        stringKeys += "; ";
                        stringKeys += shortenAbilityScores(key);
                    }
                    stringKeys += " ";
                    stringKeys += abilityObject[key];
                });
                return stringKeys;
            }
            return (
                <div>
                    <h3>{this.props.name}</h3>
                    <h4>Starting Statistics</h4>
                    <p>Size {start.size}; Speed {start.speed} ft.; AC +{start.ac.amount} {start.ac.type}; Attack {start.attack.map(attack =>
                        (attack.special) ? `${attack.type} (${attack.damage} + ${attack.special})` : `${attack.type} (${attack.damage})` 
                    ).join(", ")}; Ability Scores Str {sas.strength}; Dex {sas.dexterity}; Con {sas.constitution}; Int {sas.intelligence}; Wis {
                    sas.wisdom}; Cha {sas.charisma}; Special Qualitites {start.specialQualitites.map(sq => sq).join(", ")};</p>
                    <h4>{numSytax(adv.level)} Lvl Advancement</h4>
                    <p>
                        {(adv.size ? `Size ${adv.size}; `: ``)}
                        {(adv.ac ? `AC +${start.ac.amount} ${start.ac.type}; `: ``)}
                        {(adv.attack ? `Attack ${start.attack.map(attack =>
                            (attack.special) ? `${attack.type} (${attack.damage} + ${attack.special})` : `${attack.type} (${attack.damage})`
                        ).join(", ")}; `: ``)}
                        {(adv.abilityScores ? `Ability Scores ${
                            abilityDisplay(adv.abilityScores)
                        }; `: ``)}
                        {(adv.specialAttacks ? `Special Attacks ${adv.specialQualitites.map(sq => sq).join(", ")}; `: ``)}
                        {(adv.specialQualitites ? `Special Qualities ${adv.specialAttacks.map(sq => sq).join(", ")}; `: ``)}
                        {(adv.specialDescriptions ? `
                            <p>Special Qualities ${adv.specialDescriptions.type}</p>
                            <p>${adv.specialDescriptions.description}</p>`: ``)}                        
                    </p>
                    <button onClick={this.props.onSelectClick}>Select</button>
                    <button onClick={this.props.onExpandClick}>Hide</button>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{this.props.name}</p>
                    <p>{this.props.startingStatistics.size}</p>
                    <button onClick={this.props.onSelectClick}>Select</button>
                    <button onClick={this.props.onExpandClick}>Expand</button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
	classesArray:state.characterReducer.classesArray,
    expand:state.characterReducer.expand,
});

export default connect(mapStateToProps)(ClassSelectionsDruid);