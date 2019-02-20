import React from 'react';
import {connect} from 'react-redux';

import './classSelectionsDruid.css';

export class ClassSelectionsDruid extends React.Component{
	render(){
        return (
            <p>in druid page</p>
        )
	}
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ClassSelectionsDruid);