import React from 'react';
import {connect} from 'react-redux';

import './cardCharacters.css';

class CardCharacters extends React.Component{  
	show(character){
    console.log(character);
  }
  
	render(){
		return(
			<div className="cardCharacter div">
				<h3>{this.props.name}</h3>
				<button onClick={() => this.show(this.props.character)}>Console.log</button>
			</div>
		)
	}
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(CardCharacters);