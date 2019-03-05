import React from 'react';
import {connect} from 'react-redux';
import { CardDomain } from '../cardDomain';
import { CardDeity } from '../cardDeity';

import { setGenericExpand } from '../../actions/index';
import { setAvailableDomains } from '../../actions/index';
import { setDeity } from '../../actions/index';
import { submitClassToState } from '../../actions/index';
import { setDomain } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { submitDomain } from '../../actions/index';
import { submitDeity } from '../../actions/index';
import { submitAlignmentRestrictions } from '../../actions/index';
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
        const clericDetails = this.props.clericDetails; 
        const deityDone = (!clericDetails) ? (false) : (
            (!clericDetails.deity) ? (false) : true
        )
        const clericDetailsDone = (!clericDetails) ? (false) : (
            (!clericDetails.domains) ? (false) : (
                (clericDetails.domains[1]) ? (true) : false
            )
        )

        return (
            <div>
                <p>A cleric’s deity influences her alignment, what magic she can perform, her values, and how others see her. A cleric chooses two domains from among those belonging to her deity. A cleric can select an alignment domain (Chaos, Evil, Good, or Law) only if her alignment matches that domain. If a cleric is not devoted to a particular deity, she still selects two domains to represent her spiritual inclinations and abilities (subject to GM approval). The restriction on alignment domains still applies.</p>
                <p>Each domain grants a number of domain powers, dependent upon the level of the cleric, as well as a number of bonus spells. A cleric gains one domain spell slot for each level of cleric spell she can cast, from 1st on up. Each day, a cleric can prepare one of the spells from her two domains in that slot. If a domain spell is not on the cleric spell list, a cleric can prepare it only in her domain spell slot. Domain spells cannot be used to cast spells spontaneously.</p>
                <p>In addition, a cleric gains the listed powers from both of her domains, if she is of a high enough level. Unless otherwise noted, activating a domain power is a standard action.</p>
                {/* #TODO! I need to build a "back" button for these selections. */}
                {(!deityDone) && <div>
                    <p>Deities:</p>
                        {/* display list of deities for selection */}
                        {deities.map(deity => 
                            <CardDeity key={deity.name} name={deity.name} overview={deity.overview}
                            /* When a deity is clicked on, set a temporary array to the available domains */
                            onDeityClick={()=> this.onDeityClick(deity)}/>    
                        )}
                </div>}
                {/* display list of domains for selection */}
                {/* Once two domains have been selected allow a submit */}
                {clericDetailsDone && <button onClick={()=>this.onSubmitClick()}>Submit</button>}
                {/* This should only be displayed if there are domains to select from */}
                {availableDomains && <div>
                    <p>Domains:</p>
                    {availableDomains.map(({name, description, domainSpells, grantedPowers}) =>
                        <CardDomain key={name} name={name} description={description} domainSpells={domainSpells} grantedPowers={grantedPowers}
                        expand={(expand === name) ? true : false}
                        onExpandClick={()=>this.onExpandClick(name)}
                        onSelectClick={()=>this.onDomainClick({name, description, domainSpells, grantedPowers})}
                        /* disableSelect={(clericDetails) ? ((clericDetails.domains) ? (
                            // if domain[1] exists, we know there are already two domains and must disable all 
                            clericDetails.domains[1] ? true : (
                                // if it doesn't, then check if [0].name equals 
                                clericDetails.domains[0].name === name ? true : false
                            )
                        ) : false) : false}  */
                        disableSelect={(!clericDetails) ? (false) : ( 
                            (!clericDetails.domains) ? (false) : (
                                (clericDetails.domains[1]) ? (true) : (
                                    (clericDetails.domains[0].name === name) ? (true) : (false)
                                )
                            )
                        )}
                        />
                    )}
                </div>}
                {/* Once two domains have been selected allow a submit */}
                {clericDetailsDone && <button onClick={()=>this.onSubmitClick()}>Submit</button>}
            </div>
        )
    }
    
    onSubmitClick(){
        console.log("submitting");
        console.log(this.props.clericDetails);
        
        for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
			if( this.props.classesArray[i].name==="cleric" ){
				let bonus = createBonus({ 
					name:"classBAB", 
					source:"class", 
					stat:"bab", 
					type:"untyped", 
					duration:-1, 
					amount:this.props.classesArray[i].classFeatures.table[1][1] });
				this.props.dispatch(addBonus(bonus));
				this.props.dispatch(sumBonus(bonus));
                this.props.dispatch(setGenericExpand(""));
                this.props.dispatch(submitClassToState(i));
                this.props.dispatch(submitDomain(this.props.clericDetails));
                this.props.dispatch(submitDeity(this.props.clericDetails.deity));
                this.props.dispatch(submitAlignmentRestrictions(this.props.clericDetails.deity.overview.clericAlignments))
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

    onDomainClick(domain){
        const expand = this.props.expand;
        // add the selected domain to an array. 
        this.props.dispatch(setDomain(domain));
        // close the details section if it is open
        if(expand === domain.name){
            this.onExpandClick(domain.name);
        }
    }

    onDeityClick(deity){
        {/* When a deity is clicked on, set a temporary array to the available domains */}
        let availableDomains = deity.overview.domains;
        this.props.dispatch(setAvailableDomains(availableDomains));
        this.props.dispatch(setDeity(deity));
    }
}

const mapStateToProps = state => ({
	classesArray:state.characterReducer.classesArray,
    availableDomainsList:state.characterReducer.availableDomains,
    expand:state.characterReducer.expand,
    clericDetails:state.characterReducer.clericDetails,
});

export default connect(mapStateToProps)(ClassSelectionsCleric);