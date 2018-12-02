import React from 'react';
import { loadRaces } from '../actions/index';

export default function LoadOptions(props, dispatch){
	switch(props){
    case 1:
        // call load races
		dispatch(loadRaces());
        break;
    case 2:
        // call load classes
		console.log("classes");
        break;
    case 6:
        // call load feats
		console.log("feats");
        break;
    case 7:
        // call load equipment
		console.log("equipment");
        break;
    default:
        
	}
}