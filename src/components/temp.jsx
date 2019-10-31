			<div>
				How many dice do you get to roll?
				<select onChange={function(event){dice = event.target.value;}}>
					<option value="0">Select</option>
					<option value="3">3d6</option>
					<option value="4">4d6</option>
				</select>
				<button onClick={function(  ){
					for(let a=0;a<6;a++){
						let number = 0;
						let lowest = 18;
						for(let i=0;i<dice;i++){
							let die = getRandomInt(1,6);
							number = number + die;
							if (die <= lowest){
								lowest = die;
							}
						}
						if(dice == 4){
							number = number - lowest;
						}
						statArray.push({index:a,value:number});
					}
					statArray.sort(function(a,b){ return b.value - a.value;});
					props.dispatch(adjustDisplayD6(statArray));				
				}}>Roll</button>  
				<table>
					<thead>
						<tr>
							<th>Strength</th>
							<th>Dexterity</th>
							<th>Constitution</th>
							<th>Intelligence</th>
							<th>Wisdom</th>
							<th>Charisma</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<select id="strInput" onBlur={
									function(event){ 
										props.dispatch(assignScore( event.target.value )); 

									}								
								}>
									{props.statArrayToAssign.map(({index, value}) => (
										<option key={index} value={value}>{value}</option>
									))}
								</select>
							</td>
	{/*						<td><input type="text" id="strInput" style={{width: 50 + 'px'}} /></td>
							<td><input type="text" id="dexInput" style={{width: 50 + 'px'}} /></td>
							<td><input type="text" id="conInput" style={{width: 50 + 'px'}} /></td>
							<td><input type="text" id="intInput" style={{width: 50 + 'px'}} /></td>
							<td><input type="text" id="wisInput" style={{width: 50 + 'px'}} /></td>
							<td><input type="text" id="chaInput" style={{width: 50 + 'px'}} /></td>*/}
						</tr>
					</tbody>
				</table>
			</div>