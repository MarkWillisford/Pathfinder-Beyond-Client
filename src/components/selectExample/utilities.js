export const calculateTotal = (allOptions, charisma, strength) => {
  let total;
  if (allOptions[charisma] && allOptions[strength]) {
    const charVal = Number(allOptions[charisma].value)
    const strVal = Number(allOptions[strength].value)
    total = charVal + strVal;
  }
  return total;
}