import React from 'react';
import {connect} from 'react-redux';
import { CardDomain } from '../cardDomain';

import { setAvailableDomains } from '../../actions/index';
import { submitClassToState } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { createBonus } from '../../utility/statObjectFactories';

import './classSelectionsCleric.css';

export class ClassSelectionsCleric extends React.Component{
	render(){
        const deities = require('../../data/deities');
        const availableDomains = this.props.availableDomains;   // this is currently just an array of domain names . . .   
            // this causes an error to be thrown when it is mapped on line 38 below. 
        console.log(availableDomains);
        return (
            <div>
                <p>A cleric’s deity influences her alignment, what magic she can perform, her values, and how others see her. A cleric chooses two domains from among those belonging to her deity. A cleric can select an alignment domain (Chaos, Evil, Good, or Law) only if her alignment matches that domain. If a cleric is not devoted to a particular deity, she still selects two domains to represent her spiritual inclinations and abilities (subject to GM approval). The restriction on alignment domains still applies.</p>
                <p>Each domain grants a number of domain powers, dependent upon the level of the cleric, as well as a number of bonus spells. A cleric gains one domain spell slot for each level of cleric spell she can cast, from 1st on up. Each day, a cleric can prepare one of the spells from her two domains in that slot. If a domain spell is not on the cleric spell list, a cleric can prepare it only in her domain spell slot. Domain spells cannot be used to cast spells spontaneously.</p>
                <p>In addition, a cleric gains the listed powers from both of her domains, if she is of a high enough level. Unless otherwise noted, activating a domain power is a standard action.</p>
                <div>
                    <p>Deities:</p>
                        {/* display list of deities for selection */}
                        {deities.map(deity => 
                            <CardDeities key={deity.name} name={deity.name} overview={deity.overview}
                            onDeityClick={()=> this.onDeityClick(deity)}/>    
                        )}
                        {/* When a deity is clicked on, set a temporary array to the available domains */}
                        {/* display list of domains for selection */}
                        {/* submit */}
                </div>
                {/* This should only be displayed if there are domains to select from */}
                {availableDomains && <div>
                    <p>Domains:</p>
                    {availableDomains.map(({name, description, domainSpells, grantedPowers}) =>
                        <CardDomain key={name} name={name} description={description} domainSpells={domainSpells} grantedPowers={grantedPowers}
                        //expand={(expand === name) ? true : false}
                        onExpandClick={()=>this.onExpandClick(name)}
                        onSelectClick={()=>this.onSelectClick({name, description, domainSpells, grantedPowers})}/>
                    )}
                </div>}
            </div>
        )
    }
    
    

    onExpandClick(name){
        console.log(name);
        console.log("expanded");
    }

    onSelectClick(domain){
        console.log(domain);
    }

    onDeityClick(deity){
        {/* When a deity is clicked on, set a temporary array to the available domains */}
        let availableDomains = deity.overview.domains;
        this.props.dispatch(setAvailableDomains(availableDomains));

    }
}

class CardDeities extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.name}</p>
                <button onClick={this.props.onDeityClick}>Select</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    availableDomains:state.characterReducer.availableDomains,

});

export default connect(mapStateToProps)(ClassSelectionsCleric);