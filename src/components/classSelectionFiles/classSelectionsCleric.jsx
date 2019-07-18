import React from 'react';
import {connect} from 'react-redux';
import { CardDomain } from '../cardDomain';
import { CardDeity } from '../cardDeity';

import { setGenericExpand } from '../../actions/index';
import { setAvailableDomains } from '../../actions/index';
import { setDeity } from '../../actions/index';
import { removeDeity } from '../../actions/index';
import { submitClassToState } from '../../actions/index';
import { setDomain } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { submitDomain } from '../../actions/index';
import { removeDomain } from '../../actions/index';
import { submitDeity } from '../../actions/index';
import { submitAlignmentRestrictions } from '../../actions/index';
import { createBonus } from '../../utility/statObjectFactories';
import { capitalizeFirstLetter } from '../../utility/helperFunctions';
import { fetchProtectedSubData } from '../../actions/protectedData';
import { fetchProtectedSecondaryData } from '../../actions/protectedData';

import './classSelectionsCleric.css';

export class ClassSelectionsCleric extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchProtectedSubData("deities"));
    this.props.dispatch(fetchProtectedSecondaryData("domains"));
  }

  getDomains(availableDomainsList){
      if(availableDomainsList){
          const domains = this.props.domains;//require('../../data/domains');
          let array = [];
          for(let i = 0; i<domains.length; i++){
              if(availableDomainsList.includes(capitalizeFirstLetter(domains[i].name))){
                  array.push(domains[i]);
              }
          }
          return array;
      } else { return null }
  }

  changeDeity(){
    console.log("changing deity");
    this.props.dispatch(removeDeity());
  }

	render(){
    const deities = this.props.deities;//require('../../data/deities');
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
          <h3>Deities:</h3>
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
        {availableDomains && availableDomains.length > 0 && <div>
          <h3>Deity: {clericDetails.deity.name} <button onClick={() => this.changeDeity()}>Change</button></h3>
          <h3>Domains:</h3>
          {availableDomains.map(({name, description, domainSpells, grantedPowers}) =>
            <CardDomain key={name} name={name} description={description} domainSpells={domainSpells} grantedPowers={grantedPowers}
            expand={(expand === name) ? true : false}
            onExpandClick={()=>this.onExpandClick(name)}
            onSelectClick={()=>this.onDomainClick({name, description, domainSpells, grantedPowers})}
            onCancelClick={()=>this.onDomainCancelClick({name, description, domainSpells, grantedPowers})}
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
      for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
        if( this.props.classesArray[i].name==="cleric" ){          
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

          for(let i=0;i<this.props.clericDetails.domains.length;i++){
            this.props.dispatch(submitDomain( this.props.clericDetails.domains[i] ));
          }

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

    onDomainCancelClick(domain){
      const expand = this.props.expand;
      // add the selected domain to an array. 
      this.props.dispatch(removeDomain(domain));
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
	//classesArray:require('../../data/classes'),
  classesArray:state.protectedData.charClasses,
  availableDomainsList:state.characterReducer.availableDomains,
  expand:state.characterReducer.expand,
  clericDetails:state.characterReducer.clericDetails,
  deities:state.protectedData.subData,
  domains:state.protectedData.secondaryData,
});

export default connect(mapStateToProps)(ClassSelectionsCleric);