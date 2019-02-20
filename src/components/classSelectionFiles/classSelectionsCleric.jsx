import React from 'react';
import {connect} from 'react-redux';

import './classSelectionsCleric.css';

export class ClassSelectionsCleric extends React.Component{
	render(){
        return (
            <p>in cleric page</p>
        )
	}
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ClassSelectionsCleric);