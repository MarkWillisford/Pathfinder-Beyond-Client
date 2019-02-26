import React from 'react';
import {connect} from 'react-redux';

import './classSelectionsSorcerer.css';

export class ClassSelectionsSorcerer extends React.Component{
	render(){
        const bloodlines = require('../../data/bloodlines');
        console.log(bloodlines);
        return (
            <div>
                <p>Each sorcerer has a source of magic somewhere in her heritage that grants her spells, bonus feats, an additional class skill, and other special abilities. This source can represent a blood relation or an extreme event involving a creature somewhere in the family’s past. For example, a sorcerer might have a dragon as a distant relative or her grandfather might have signed a terrible contract with a devil. Regardless of the source, this influence manifests in a number of ways as the sorcerer gains levels. A sorcerer must pick one bloodline upon taking her first level of sorcerer. Once made, this choice cannot be changed.</p>
                <p>Bloodlines:</p>

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
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ClassSelectionsSorcerer);