import React from 'react';

export const dynamicSelect = ({ input, label, options, takenOptions, meta: {touched, error}}) => {
  // Hiding selects initially (when they have no options)
  if (!options || !options.length) {
    return null;
  }

  const avaliableOptions = options.filter(x => !takenOptions.includes(Number(x)));
  if (input.value && !avaliableOptions.includes(input.value)) {
    avaliableOptions.push(input.value);
  }

  return (<div className="field">
    <label>{label}</label>
      <div className={'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')}>
        <select {...input} >
          {
              avaliableOptions.map((value, index) => {
              return (<option value={value} key={`o-${index}`}>{value}</option>);
            })
          }
        </select>
        {touched && (error && <p className="help is-danger">{error}</p>)}
    </div>
  </div>);
}
