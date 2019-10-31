import React from 'react';
import {connect} from 'react-redux';
import { CardDeity } from '../cardDeity';

import { setGenericExpand } from '../../actions/index';
import { submitClassToState } from '../../actions/index';
import { addBonus } from '../../actions/index';
import { sumBonus } from '../../actions/index';
import { submitDeity } from '../../actions/index';
import { submitAlignmentRestrictions } from '../../actions/index';
import { createBonus } from '../../utility/statObjectFactories';
import { capitalizeFirstLetter } from '../../utility/helperFunctions';
import { fetchProtectedSubData } from '../../actions/protectedData';

export class ClassSelectionsPaladin extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchProtectedSubData("deities"));
  }

	render(){
        let deities = [];
        if(this.props.deities){
          deities = this.props.deities.filter(deity => (
            deity.overview.alignment === "Neutral good" || deity.overview.alignment === "Lawful good"
          ))
        }

        return (
            <div>
                <p>Through a select, worthy few shines the power of the divine. Called paladins, these noble souls dedicate their swords and lives to the battle against evil. Knights, crusaders, and law-bringers, paladins seek not just to spread divine justice but to embody the teachings of the virtuous deities they serve. In pursuit of their lofty goals, they adhere to ironclad laws of morality and discipline. </p>
                {/* #TODO! I need to build a "back" button for these selections. */}
                <div>
                    <p>Deities:</p>
                        {/* display list of deities for selection */}
                        {deities.map(deity => 
                            <CardDeity key={deity.name} name={deity.name} overview={deity.overview}
                            /* When a deity is clicked on, set a temporary array to the available domains */
                            onDeityClick={()=> this.onSubmitClick(deity)}/>    
                        )}
                </div>
            </div>
        )
    }
    
    onSubmitClick(deity){   
      for(let i=0; i<this.props.classesArray.length;i++){
        // if this is the clicked element toggle it 
        if( this.props.classesArray[i].name==="paladin" ){     
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
          this.props.dispatch(submitDeity(deity));
          let alignmentRestrictions = ["Lawful good"];
          if(deity.overview.alignment === "Neutral good"){
            alignmentRestrictions.push("Neutral good");
          }
          this.props.dispatch(submitAlignmentRestrictions(alignmentRestrictions));
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
}

const mapStateToProps = state => ({
  classesArray:state.protectedData.charClasses,
  expand:state.characterReducer.expand,
  deities:state.protectedData.subData,
});

export default connect(mapStateToProps)(ClassSelectionsPaladin);