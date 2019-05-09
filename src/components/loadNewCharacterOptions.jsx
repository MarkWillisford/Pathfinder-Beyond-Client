import { loadRaces } from '../actions/index';
import { loadClasses } from '../actions/index';

export default function LoadOptions(props, dispatch){
    let classes = require('../data/classes');
    let races = require('../data/races');
    //let traits = require('../data/traits');
	switch(props){
    case 1:
        // call load races
		// dispatch(loadRaces(races)); 
        break;
    case 2:
        // call load classes
        //dispatch(loadClasses(classes));
        break;
    case 4:
        // call load traits
        //dispatch(loadTraits(traits));
        break;
    case 6:
        // call load feats
        break;
    case 7:
        // call load equipment
        break;
    default:
        
	}
}