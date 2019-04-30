import React from 'react';
import {connect} from 'react-redux';

import './characterReview.css';

export class CharacterReview extends React.Component{
	render(){
    return(
      <div>
        Character Review
      </div>
    )
	}
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(CharacterReview);