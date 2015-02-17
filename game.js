var game = (function(){
var game_matrix = [];
var rows;
var cols;

function reset_matrix(){

	for(i=0;i<rows;i++){
		game_matrix.push([]);
	}
	for(i=0;i<rows;i++){
		for(j=0;j<cols;j++){
			game_matrix[i][j] = 0;
		}
	}
}
function getRandomPosition(){
	var empty_pos = [];

	for(i=0;i<16;i++){
			if(game_matrix[parseInt(i/4)][parseInt(i%4)] == 0){
				empty_pos.push(i);
			}
			//console.log(game_matrix[parseInt(i/4)][parseInt(i%4)]);
	}
	//console.log(empty_pos);
	var rand_pos = Math.floor(Math.random()*empty_pos.length);
	//console.log("random"+empty_pos[rand_pos]);
	return empty_pos[rand_pos];

}

function getRandomNumber(){
	var r = Math.random();
	//console.log(r);
	if(r > 0.2){
		return 2;
	}
	else{ 
		return 4;
	}
}
function render(){
	for(i=0;i<16;i++){
		
		if(game_matrix[parseInt(i/4)][i%4]!=0)
			document.getElementById(""+i).innerHTML = game_matrix[parseInt(i/4)][i%4]; 
		else
			document.getElementById(""+i).innerHTML =".";
	}	

}

function clubHorizontally(){
	for(row=0;row<4;row++){
		for(i=0;i<4;i++){
			//Check for the first Non Zero ith column in row.	
			if(game_matrix[row][i]!=0){
				//Find the the first Non-zero entry corresponding to i.
				for(j=i+1;j<4;j++){
					if(game_matrix[row][j]!=0){	
						if(game_matrix[row][i]==game_matrix[row][j]){
							//If Equal then Merge and Jump i .
							game_matrix[row][i] = game_matrix[row][i]*2;
							game_matrix[row][j] = 0 ;
							i=j;
							}
					//Break after finding the first non zero element correponding to ith.		
					break;
					}
				}

			}
		}
	}	

}
function clubVertically(){
	for(col=0;col<4;col++){
		for(i=0;i<4;i++){
			if(game_matrix[i][col]!=0){
				for(j=i+1;j<4;j++){
					if(game_matrix[j][col]!=0){
						if(game_matrix[i][col]==game_matrix[j][col]){
							game_matrix[i][col] *=2;
							game_matrix[j][col] = 0;
							i= j ;
							//Jump	
						}
					break;	
					}
				}
			}
		}
	}

}
function moveLeft(){
console.log("left");
	//Code to Club pairs
	clubHorizontally();
	//Shift Zeroes to the right
	for(row=0;row<4;row++){
		count=0;
		for(i=0;i<4;i++){
			if(game_matrix[row][i]!=0)
				{game_matrix[row][count++]=game_matrix[row][i];}
		
		}
		while(count<4){
			game_matrix[row][count++] = 0;
		}

	}
}
function moveUp(){
clubVertically();
//Shift Zeroes To Bottom
	for(col=0;col<4;col++){
		count=0;
		for(i=0;i<4;i++){
			if(game_matrix[i][col]!=0)
			{
				game_matrix[count++][col]=game_matrix[i][col];
				
			}
		}
		while(count<4){
			game_matrix[count++][col]=0;
		}
	
	}
}
function moveDown(){
clubVertically();
//Shift Zeroes to Top
	for(col=0;col<4;col++){
		count=0;
		for(i=3;i>=0;i--){
			if(game_matrix[i][col]!=0){
				game_matrix[3-count][col]= game_matrix[i][col];
				count++;
			}

		}
		var zeroes = 4 - count;
		i=0;
		while(i<zeroes){
			game_matrix[i++][col] = 0;
		}
	}
}
function moveRight(){
	//Code to Club Pairs
	clubHorizontally();
	
	
	//Shift Zeroes to the left , Numbers to the Right.
	for(row=0;row<4;row++){
		count = 0;
		for(i=3;i>=0;i--){
		if(game_matrix[row][i]!=0){
			 game_matrix[row][3-count]=game_matrix[row][i];
			count++;
			}
		}
	var zeroes = 4 - count;
	i=0;
	while(i<zeroes){
		game_matrix[row][i++]=0;	
		}
	}
}
function keyPressed(e){
	//console.log("You Pressed a btn");
		e.preventDefault();
		
		switch(e.keyCode){
	    case 37: moveLeft();
        		break;

        case 38: moveUp();
                break;

        case 39: moveRight();
        	        break;

        case 40: moveDown();
        break;	
    }
    // Generate a new number in empty position and call render
    var p = getRandomPosition();
    var no = getRandomNumber();
    game_matrix[parseInt(p/4)][parseInt(p%4)] = parseInt(no);
	render();
}
return{
	init:function(){

	window.addEventListener("keydown",keyPressed,true);
	rows = 4;
	cols = 4;
	reset_matrix();
	var p1 = getRandomPosition();
	game_matrix[parseInt(p1/4)][parseInt(p1%4)] = parseInt(getRandomNumber());
	//console.log("IT is"+game_matrix[parseInt(p1/4)][parseInt(p1%4)]);
	var p2 = getRandomPosition();
	game_matrix[parseInt(p2/4)][parseInt(p2%4)] = 2;
	render();

	
	}		  
}

})();