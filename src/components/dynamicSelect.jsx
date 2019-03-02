import React from 'react';
import { capitalizeFirstLetter } from '../utility/helperFunctions';

export function DynamicSelect({input, label, options, unavaliableOptions, meta: {touched, error}}){
	const avaliableOptions = options.filter(o => !unavaliableOptions.includes(o.id)); 

	if (input.value && !avaliableOptions.includes(input.value)) {
	    const option = options.find(o => o.id == input.value);
	    avaliableOptions.push(option);
	}

	return(
		<div className={label + 'Field'}>
			<label>{capitalizeFirstLetter(label)}</label>
			<div className={'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')}>
				<select {...input} >
					<option />
					{avaliableOptions.map((option, index) => {
						return (<option value={option.id} key={index}>{option.value}</option>);
					})}
				</select>
				{touched && (error && <p className="help is-danger">{error}</p>)}
			</div>
		</div>
	);
} 