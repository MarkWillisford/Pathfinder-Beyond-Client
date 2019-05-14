import React from 'react';
import {connect} from 'react-redux';

import './classSelectionsSorcerer.css';

import { setGenericExpand } from '../../actions/index';
import { setBloodline } from '../../actions/index';
import { setSpells } from '../../actions/index';
import { submitSorcDetails } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { submitClassToState } from '../../actions/index';
import { createBonus } from '../../utility/statObjectFactories';
import { capitalizeFirstLetter, seporateOnCapitals } from '../../utility/helperFunctions';
import { fetchProtectedSubData } from '../../actions/protectedData';
import { fetchProtectedSecondaryData } from '../../actions/protectedData';

export class ClassSelectionsSorcerer extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchProtectedSubData("bloodlines"));
    this.props.dispatch(fetchProtectedSecondaryData("spells"));
  }

	render(){
        const bloodlines = this.props.bloodlines;   //require('../../data/bloodlines');
        console.log(bloodlines);
        const spells = this.props.spells;  //require('../../data/spells');
        const expand = this.props.expand;
        const sorcererDetails = this.props.sorcererDetails; 
        const bloodlineDone = (!sorcererDetails) ? (false) : (
            (!sorcererDetails.bloodline) ? (false) : true
        )
        const sorcererDetailsDone = (!sorcererDetails) ? (false) : (
            (sorcererDetails.spells[0].length === 4 && sorcererDetails.spells[1].length === 2) ? true : false
        )
        

        // okay, spells has an unsorted array of spell objects. I need to find all the spells that have a level object with a class attribute of "sorcerer/wizard"
        // then sort that list by level object's attribute "num"
        // This will be done server side, for now a basic function built in here.
        let filteredSpellList = this.filterSpells(spells, "sorcerer/wizard", [0,1]); 

        return (
            <div>
                {!bloodlineDone && <div>
                    <p>Each sorcerer has a source of magic somewhere in her heritage that grants her spells, bonus feats, an additional class skill, and other special abilities. This source can represent a blood relation or an extreme event involving a creature somewhere in the family’s past. For example, a sorcerer might have a dragon as a distant relative or her grandfather might have signed a terrible contract with a devil. Regardless of the source, this influence manifests in a number of ways as the sorcerer gains levels. A sorcerer must pick one bloodline upon taking her first level of sorcerer. Once made, this choice cannot be changed.</p>
                    <p>Bloodlines:</p>
                    {bloodlines.map(({name, description, classSkill, bonusSpells, bonusFeats, bloodlineArcana, bloodlinePowers}) => 
                        <CardBloodline key={name} name={name} description={description} classSkill={classSkill} bonusSpells={bonusSpells}
                        bonusFeats={bonusFeats} bloodlineArcana={bloodlineArcana} bloodlinePowers={bloodlinePowers}
                        expand={(expand === name) ? true : false}
                        onExpandClick={()=>this.onExpandClick(name)}
                        onSelectClick={()=>this.onSelectBloodlineClick({name, description, classSkill, bonusSpells, bonusFeats, bloodlineArcana, bloodlinePowers})}/>
                    )}
                </div>}
                {bloodlineDone && <div>
                    <p>A sorcerer’s selection of spells is extremely limited. A sorcerer begins play knowing four 0-level spells and two 1st-level spells of her choice. At each new sorcerer level, she gains one or more new spells. These new spells can be common spells chosen from the sorcerer/wizard spell list, or they can be unusual spells that the sorcerer has gained some understanding of through study.</p>
                    <p>Spells:</p>
                    <p>0 level spells:</p>
                    {filteredSpellList[0].map(spell => <CardSpell key={spell.name} name={spell.name} school={spell.school} level={spell.level}
                        casting={spell.casting} effect={spell.effect} description={spell.description}
                        disabled={false} expand={(expand === spell.name) ? true : false}
                        onExpandClick={()=>this.onExpandClick(spell.name)}
                        onSelectClick={()=>this.onSelectSpellClick(spell, 0)}
                        disableSelect={(!sorcererDetails) ? (false) : (
                            sorcererDetails.spells[0].filter((i) => i.name === spell.name).length > 0 ? true : (
                                sorcererDetails.spells[0].length === 4 ? true : false
                            )
                        )}
                    />)}
                    <p>1st level spells:</p>
                    {filteredSpellList[1].map(spell => <CardSpell key={spell.name} name={spell.name} school={spell.school} level={spell.level}
                        casting={spell.casting} effect={spell.effect} description={spell.description}
                        disabled={false} expand={(expand === spell.name) ? true : false}
                        onExpandClick={()=>this.onExpandClick(spell.name)}
                        onSelectClick={()=>this.onSelectSpellClick(spell, 1)}
                        disableSelect={(!sorcererDetails) ? (false) : (
                            sorcererDetails.spells[1].filter((i) => i.name === spell.name).length > 0 ? true : (
                                sorcererDetails.spells[1].length === 2 ? true : false
                            )
                        )}
                    />)}
                </div>}
                {/* Once two level 1s and 4 level 0s have been selected allow a submit */}
                {sorcererDetailsDone && <button onClick={()=>this.onSubmitClick()}>Submit</button>}
            </div>
        )
    }
    
    filterSpells(spells, list, range){
        let grouped = {};
        for(let i=0;i<spells.length;i++){
            for(let j=0;j<spells[i].level.length;j++){
                if(spells[i].level[j].class === list && range.includes(spells[i].level[j].num)){
                    let p = spells[i].level[j].num;
                    if (!grouped[p]) { grouped[p] = []; }
                    grouped[p].push(spells[i]);
                }
            }
        }
        return grouped;
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
    onSelectBloodlineClick(bloodline){
        this.props.dispatch(setBloodline(bloodline));
    }
    onSelectSpellClick(spell, asLevel){
        const expand = this.props.expand;
        // add the selected domain to an array. 
        this.props.dispatch(setSpells(spell, asLevel));
        // close the details section if it is open
        if(expand === spell.name){
            this.onExpandClick(spell.name);
        }
    }
    onSubmitClick(){        
        for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
			if( this.props.classesArray[i].name==="sorcerer" ){
				
        for(let j=1;j<5;j++){
          let bonus = createBonus({ 
            name:"class"+ capitalizeFirstLetter(this.props.classesArray[i].classFeatures.table[0][j]), 
            source:"class", 
            stat:this.props.classesArray[i].classFeatures.table[0][j], 
            type:"untyped", 
            duration:-1, 
            amount:this.props.classesArray[i].classFeatures.table[1][j] });
          this.props.dispatch(addBonus(bonus));
          this.props.dispatch(sumBonus(bonus));
        }
                this.props.dispatch(setGenericExpand(""));
                this.props.dispatch(submitClassToState(this.props.classesArray[i]));

                this.props.dispatch(submitSorcDetails(this.props.sorcererDetails));
			}
		}
    }
}

class CardSpell extends React.Component{
    displaySchool(obj){
        let returnString = `${obj.school}`;
        if(obj.subSchool){
            returnString += ` (${obj.subSchool})`;
        }
        if(obj.descriptor){
            returnString += ` [${obj.descriptor}]`;
        }
        return returnString;
    }
    displayTable(tableData){
        let tableHeaders = tableData.slice(0, 1);
        tableData = tableData.splice(1,tableData.length-1)
        return (
            <table>
                <thead>
                    <tr>
                        {tableHeaders[0].map(data => (
                            <th>{data}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(row => (
                        <tr>
                            {row.map(data => (
                                <td>{data}</td>
                            ))}
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        )
    }

    render(){
        const effect = this.props.effect;
        const casting = this.props.casting;
        const level = this.props.level;
        const schoolObj = this.props.school;
        const disableSelect = (this.props.disableSelect) ? this.props.disableSelect : false;
        if(this.props.expand){
            return (
                <div>
                    <p>{capitalizeFirstLetter(this.props.name)}</p> 
                    <button onClick={this.props.onSelectClick} disabled={disableSelect}>Select</button>
                    <button onClick={this.props.onExpandClick}>Cancel</button>
                    <strong>School </strong>{this.displaySchool(schoolObj)};
                        <strong> Level </strong>{
                        level.map(level => (
                            `${level.class} ${level.num}`
                        )).join(", ")
                
                    }
                    {Object.keys(casting).map((key) => (
                        <DisplayKey key={key} name={key} value={casting[key]} />
                    )) }
                    {Object.keys(effect).map((key) => (
                        <DisplayKey key={key} name={key} value={effect[key]} />
                    )) }
                    {this.props.description.map(sentence => (
                        <p>{typeof sentence === "string" ? sentence : this.displayTable(sentence)}</p>
                    ))}
                    <button onClick={this.props.onSelectClick} disabled={disableSelect}>Select</button>
                    <button onClick={this.props.onExpandClick}>Cancel</button>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{capitalizeFirstLetter(this.props.name)}
                    <button onClick={this.props.onSelectClick} disabled={disableSelect}>Select</button>
                    <button onClick={this.props.onExpandClick}>Expand</button></p>
                </div>
            )
        }
    }
}

class DisplayKey extends React.Component{
    render(){
        const value = this.props.value;
        return(
            <div>
                <strong>{capitalizeFirstLetter(seporateOnCapitals(this.props.name).toLowerCase())} </strong> {
                    (Array.isArray(value)) ? value.join(" ") : value};
            </div>
        )
    }
}

class CardBloodline extends React.Component{
    render(){
        const bonusSpells = this.props.bonusSpells;
        const bonusFeats = this.props.bonusFeats;
        const powers = this.props.bloodlinePowers.list;
        console.log(bonusFeats);
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
                    <button onClick={this.props.onExpandClick}>Cancel</button>
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
                    <button onClick={this.props.onExpandClick}>Cancel</button>
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
	classesArray:state.protectedData.data, //require('../../data/classes'),
    expand:state.characterReducer.expand,
    sorcererDetails:state.characterReducer.sorcererDetails,
    bloodlines:state.protectedData.subData,
    spells:state.protectedData.secondaryData,
});

export default connect(mapStateToProps)(ClassSelectionsSorcerer);