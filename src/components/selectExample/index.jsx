import React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { dynamicSelect } from './dynamicSelect/';

class SelectExample extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      takenOptions:[],
      allOptions: [],
    };
  }

  generateNumbers(e) {
    e.preventDefault()
    this.setState({
      allOptions: [
        {id: '', value: ''},
        {id: '1', value: '1'},
        {id: '2', value: '1'},
        {id: '3', value: '2'},
        {id: '4', value: '3'}
      ],
    })
  }

  submitHandler(values) {
    console.log(values);
    // Call some action that will store this data on BE
  }

  render(){
    return (
      <form onSubmit={this.props.handleSubmit(this.submitHandler.bind(this))} >
        <button onClick={this.generateNumbers.bind(this)}>Roll</button>
        <Field
          component={dynamicSelect}
          name="strength"
          label="Strength"
          options={this.state.allOptions}
          takenOptions={this.props.takenOptions}
        />
        <Field
          component={dynamicSelect}
          name="charisma"
          label="Charisma"
          options={this.state.allOptions}
          takenOptions={this.props.takenOptions}
        >
        </Field>
        <button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
      </form>
    )
	}
}

const dynamicFields = ['strength', 'charisma'];
const selector = formValueSelector('example-form')
const mapStateToProps = (state) => ({
  takenOptions: dynamicFields.map(x => selector(state, x)).filter(Boolean),
  initialValues: { // Optional
    strength: '2',   // used for default values
    charisma: '3',   // while editing resource
  }
});

SelectExample = reduxForm({
  form: 'example-form',
  enableReinitialize: true, // Used when you want to use initialValues
})(SelectExample);

export default  connect(
  mapStateToProps
)(SelectExample);
