import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

import './newCharacterNavLinks.css';

export class NewCharacterNavLinks extends React.Component{
	/* 8 sections, each of which has a completed property
	which controls which component is displayed. I was hoping
	to have this forLoop control the links but I couldnt get
	it working. Instead I will have two 'views' within each
	component 
	forLoop(){
		const listItems = this.props.creationSteps.map(({name, id, url, completedUrl, complete}) => (
    		const step = this.props.creationSteps[i];
    		const linkTo = "";
    		if(step.complete === false){
    			linkTo = step.url;
    		} else {
    			linkTo = step.completedUrl;
    		}
    		<ListItem key={step.id} value={<Link to={`/playerDemo/newCharacter/${linkTo}`}>{step.name}</Link>}
		));
		return ({listItems});
	}*/

	render(){
		return (
	        <div className="newCharacterNavLinks">
	        	Nav Links
	        	<ul>
		        	{this.props.creationSteps.map(({name, id}) => (
		        		<li key={id}>
		        			<Link to={`/playerDemo/newCharacter/${name}`} >{name}</Link>
		        		</li>
		        	))}
		        </ul>
	        </div>
	    );
	}
}

const mapStateToProps = state => ({
    creationSteps: state.creationSteps,
});

export default connect(mapStateToProps)(NewCharacterNavLinks);