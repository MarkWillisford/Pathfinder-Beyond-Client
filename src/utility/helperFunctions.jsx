export function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
};

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