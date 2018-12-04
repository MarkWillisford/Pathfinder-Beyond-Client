import React from 'react';

export const dynamicSelect = ({ input, label, options, takenOptions, meta: {touched, error}}) => {
  // Hiding selects initially (when they have no options)
  if (!options || !options.length) {
    return null;
  }

  const avaliableOptions = options.filter(x => !takenOptions.includes(x.id));
  if (input.value && !avaliableOptions.includes(input.value)) {
    const option = options.find(x => x.id == input.value);
    avaliableOptions.push(option);
  }
  return (<div className="field">
    <label>{label}</label>
      <div className={'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')}>
        <select {...input} >

          {
              avaliableOptions.map((option, index) => {
              return (<option value={option.id} key={`o-${index}`}>{option.value}</option>);
            })
          }
        </select>
        {touched && (error && <p className="help is-danger">{error}</p>)}
    </div>
  </div>);
}
