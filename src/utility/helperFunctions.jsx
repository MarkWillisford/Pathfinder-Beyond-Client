export function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function lowercaseFirstLetter(string){
    return string.charAt(0).toLowerCase() + string.slice(1);
};

export function seporateOnCapitals(string){
	// seporate on capital letters
	let outputString = string.split(/(?=[A-Z])/).join(" ");
	return outputString;
}

export function arrayToSentence(array){
	let sentence = "";
	for(let i=0;i<array.length;i++){
		if (array.length === 2 && i === 1){
			sentence = sentence + " and "			
		} else if(i !== 0 && i !== array.length -1){
			sentence = sentence + ", "
		} else if(i !== 0 && i === array.length -1){
			sentence = sentence + ", and "
		}
		sentence = sentence + array[i];
	};
	return sentence;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function statIndex(stats, name){
	for(let i=0;i<stats.length;i++){
		if(stats[i].name === name){
			return i;
		}
	}
}

export function	getModifier(abilityScore){
	let mod = Math.floor((abilityScore-10)/2);
	return mod;
}

export function	findBonusIndexByType(arrayOfBonuses, type){
	for(let i=0;i<arrayOfBonuses.length;i++){
		if(arrayOfBonuses[i].type === type){
			return i;
		} else { return null; }
	}
}

export function	findBonusesByStatAndType(charStats, stat, type){
	let statObject = charStats[statIndex(charStats, stat)]
	if(statObject){
		let index = findBonusIndexByType(statObject.sum.bonuses, type);
		if(index != null){
			return statObject.sum.bonuses[index];
		} else { return null }			
	} else { return null }
}