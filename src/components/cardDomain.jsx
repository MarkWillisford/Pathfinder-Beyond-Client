import React from 'react';
import {connect} from 'react-redux';

import { capitalizeFirstLetter } from '../utility/helperFunctions';

export class CardDomain extends React.Component{
    render(){
        const gPower = this.props.grantedPowers;
        const gSpells = this.props.domainSpells;
        const disableSelect = (this.props.disableSelect) ? this.props.disableSelect : false;
        function displaySpells(spells){
            let stringSpells;
            spells.map(spell =>
                Object.keys(spell).forEach(key => {
                    if(!stringSpells){
                        stringSpells = key;
                        stringSpells += " - "
                        stringSpells += spell[key];
                    } else if(key === "limitation"){
                        stringSpells += "; ";
                        stringSpells += spell[key];
                        stringSpells += " spells only";
                    } else {
                        stringSpells += "; ";
                        stringSpells += key;
                        stringSpells += " - "
                        stringSpells += spell[key];
                    }
                })
            )
            return stringSpells;
        }
        if(this.props.expand){
            return (
                <div>
                    <h3>{capitalizeFirstLetter(this.props.name)} Domain</h3>
                    <p>{this.props.description}</p>
                    <h4>Granted Powers</h4>
                    <div>{gPower.map(power => 
                        <p>{power.name} ({power.type}): {power.description}</p>
                    )}</div>
                    <h4>Domain Spells</h4>
                    <div>{displaySpells(gSpells)}</div>
                    {/* I will want to add subdomains. For now however . . .     */}
                    <button onClick={this.props.onSelectClick} disabled={disableSelect}>Select</button>
                    <button onClick={this.props.onExpandClick}>Hide</button>
                </div>
            )
        } else {            
            return (
                <div>
                    <p>{capitalizeFirstLetter(this.props.name)} Domain</p>
                    <button onClick={this.props.onSelectClick} disabled={disableSelect}>Select</button>
                    <button onClick={this.props.onExpandClick}>Expand</button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(CardDomain);