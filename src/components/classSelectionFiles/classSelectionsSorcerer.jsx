import React from 'react';
import {connect} from 'react-redux';

import './classSelectionsSorcerer.css';

export class ClassSelectionsSorcerer extends React.Component{
	render(){
        return (
            <p>in sorcerer page</p>
        )
	}
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ClassSelectionsSorcerer);