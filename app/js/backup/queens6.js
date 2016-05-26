/*
hill-climbing method for n-queens
not recursive though
*/

var time = 0;
var html = 1;
// var size = 8;

// var block_size = 50;

// if(html == 1)
// {
// 	size = parseInt(prompt('Number of Queens?'));
// 	if(size > 14)
// 	{
// 		block_size = Math.floor(Math.min(($('body').width()-50)/size,(window.innerHeight-50)/size));
// 		console.log(block_size);
// 	}	
// }

// var queens = new Array(size);
// console.log(queens)

// var queens = [2,0,3,3]

// var solve = nQueens();
// display(solve);

//check if solution has been reached
function sol(queens){
	for(var i = 0;i < queens.length;i++)
	{
		for(var j = 0;j < queens.length;j++){
			if(i != j){
				if(queens[i] == queens[j] || Math.abs(j-i) == Math.abs(queens[j]-queens[i])){
					return false;
				}
			}
		}
	}
	return true;
}
// console.log(sol())

//count conflicts for given position
function conflictCount(row,col,queens){
	var count = 0;
	for(var i = 0;i<queens.length;i++){
		if(i!=row){
			if(queens[i] == col){
				count++;
			}
			if(Math.abs(i-row) == Math.abs(queens[i]-col)){
				count++;
			}
		}
	}
	return count;
}
// console.log(conflictCount(0,3));

//randomize initial board
function randomInit(size){
	var queens = new Array(size);
	for(var i = 0;i<size;i++){
		queens[i]=Math.floor(Math.random()*size)
	}
	return queens;
}

//check if local maxima has been reached
function best(queens){
	var maxima = true;
	for(var i = 0;i < queens.length;i++){
		var curr = conflictCount(i,queens[i],queens)
		for(var j = 0;j<queens.length;j++){
			if(conflictCount(i,j,queens) < curr){
				maxima = false;
			}
		}
	}
	return maxima;
}

//main climbing function
function climb(queens){
	var climbLimit = 100;
	//best function checks for local maxima, restarts climb from random state if one is reached
	while(best(queens) == false){
		for(var i = 0;i < climbLimit; i++){
			//pick random row to climb
			var row = Math.floor(Math.random()*queens.length)
			//get # of conflicts in current state
			var curr = conflictCount(row,queens[row],queens)
			var newCol = queens[row]

			for(var j = 0;j<queens.length;j++){
				if(queens[row] != j){
					//test and save position with least conflicts
					var test = conflictCount(row,j,queens)
					if(test < curr){
						curr = test;
						newCol = j;
					}
				}
			}
			queens[row] = newCol;
		}
	}
}

//main function - randomizes and starts climb
function nQueens(size){
	var maxTry = 1000; //limited number of random restarts so it doesn't go on forever
	var start = new Date();
	for(var i = 0;i < maxTry;i++){
		var queens = randomInit(size);
		// console.log(queens)
		climb(queens);
		if(sol(queens)){
			console.log('solved')
			// console.log(queens)
			time = new Date() - start;
			return queens;
		}
	}
	return false;
}

//Display functions
function newBoard(size){
	var temp = [];
	var arr = [];
	for(var i = 0; i < size;i++)
	{
		arr.push(0);
	}
	for(var j = 0;j < size;j++)
	{
		temp.push(arr.slice());

	}
	return temp;
}

// function display(queens){
// 	//clear board
// 	console.log(queens)
// 	var board = newBoard();
// 	if(queens == false){
// 		if (html === 1){
// 			$('body').append('<h3>Solution not found in time</h3>');
// 		}
// 		console.log('not found')
// 	}
// 	else{
// 		//add queens
// 		for(var i = 0; i < queens.length;i++){
// 			board[queens[i]][i] = 1;
// 		}
// 		if (html==1){
// 			htmlDisplay(board);
// 		}else{
// 			console.log("Board:");
// 			console.log(board);
// 		}
// 	}
// }
// function htmlDisplay(board){
// 	$('.title').append('<span>,   # of Queens: ' + size + '</span>')
// 	$('body').append('<h4>Solved in ' + time + 'ms</h4>')
// 	$('.board').css({'width': (size * block_size),'height': (size * block_size)});
// 	$('.board').children('div').css({'width': block_size,'height': block_size})
// 	$("ul").empty();
// 	for(var i = 0; i < size;i++){
// 		for(var j=0; j< size;j++){
// 			if(board[i][j] == 0){
// 				if((i+j)%2 == 0){
// 					$('.board').append('<div class = "white"><div>');
// 				}
// 				else if((i+j)%2 == 1){
// 					$('.board').append('<div class = "black"><div>');
// 				}
// 			}
// 			if(board[i][j] == 1){
// 				$('.board').append('<div class = "queen"><div>');
// 			}
// 		}
// 	}
// 	$('.board').children('div').css({'width': block_size,'height': block_size})
// }




