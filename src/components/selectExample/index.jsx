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
      allOptions: [null, 4, 6, 8, 10],
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
  takenOptions: dynamicFields.map(x => Number(selector(state, x))).filter(Boolean),
  initialValues: {  // Optional
    strength: 10,   // used for default values
  }                 // while editing resource
});

SelectExample = reduxForm({
  form: 'example-form',
  enableReinitialize: true, // Used when you want to use initialValues
})(SelectExample);

export default  connect(
  mapStateToProps
)(SelectExample);
