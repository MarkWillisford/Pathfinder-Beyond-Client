import React from 'react';
import {connect} from 'react-redux';

export class CardDeity extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.name}</p>
                <button onClick={this.props.onDeityClick}>Select</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(CardDeity);