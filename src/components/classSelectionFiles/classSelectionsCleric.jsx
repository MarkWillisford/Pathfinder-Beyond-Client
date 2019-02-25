import React from 'react';
import {connect} from 'react-redux';
import { CardDomain } from '../cardDomain';

import { setGenericExpand } from '../../actions/index';
import { setAvailableDomains } from '../../actions/index';
import { submitClassToState } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { createBonus } from '../../utility/statObjectFactories';
import { capitalizeFirstLetter } from '../../utility/helperFunctions';

import './classSelectionsCleric.css';

export class ClassSelectionsCleric extends React.Component{
    getDomains(availableDomainsList){
        if(availableDomainsList){
            const domains = require('../../data/domains');
            let array = [];
            for(let i = 0; i<domains.length; i++){
                if(availableDomainsList.includes(capitalizeFirstLetter(domains[i].name))){
                    array.push(domains[i]);
                }
            }
            return array;
        } else { return null }
    }

	render(){
        const deities = require('../../data/deities');
        const availableDomainsList = this.props.availableDomainsList;   // this is currently just an array of domain names . . .   
        const availableDomains = this.getDomains(availableDomainsList);
        const expand = this.props.expand;

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
                            {/* When a deity is clicked on, set a temporary array to the available domains */}
                            onDeityClick={()=> this.onDeityClick(deity)}/>    
                        )}
                </div>
                {/* display list of domains for selection */}
                {/* This should only be displayed if there are domains to select from */}
                {availableDomains && <div>
                    <p>Domains:</p>
                    {availableDomains.map(({name, description, domainSpells, grantedPowers}) =>
                        <CardDomain key={name} name={name} description={description} domainSpells={domainSpells} grantedPowers={grantedPowers}
                        expand={(expand === name) ? true : false}
                        onExpandClick={()=>this.onExpandClick(name)}
                        onSelectClick={()=>this.onSelectClick({name, description, domainSpells, grantedPowers})}/>
                    )}
                </div>}

                {/* Once two domains have been selected allow a submit */}

            </div>
        )
    }
       
    onExpandClick(name){
        const expand = this.props.expand;
        if(expand !== name){
            this.props.dispatch(setGenericExpand(name));
        } else {
            this.props.dispatch(setGenericExpand(""));
        }
    }

    onSelectClick(domain){
        console.log(domain);
        // hide select button for this domain
        // show cancel button for this domain
        // add the selected domain to an array. When that array has a length of 2, all domain selection buttons must be disabled
    }

    onDeityClick(deity){
        {/* When a deity is clicked on, set a temporary array to the available domains */}
        let availableDomains = deity.overview.domains;
        this.props.dispatch(setAvailableDomains(availableDomains));
        {/* #TODO! save the selected deity */}
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
    availableDomainsList:state.characterReducer.availableDomains,
    expand:state.characterReducer.expand,

});

export default connect(mapStateToProps)(ClassSelectionsCleric);