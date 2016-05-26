/*
bitwise solution for n-queens
*/
var n = 31;
var time = 0;
var html = 0;

var block_size = 50;

if(html == 1)
{
	n = prompt('Number of Queens?');
	if(n > 14)
	{
		block_size = Math.floor(Math.min(($('body').width()-50)/n,(window.innerHeight-50)/n));
		console.log(block_size);
	}	
}

//create board
var board = newBoard().slice();
var queen = [];


function display(queens){
	//clear board
	for(var i = 0; i < n;i++){
		for(var j = 0; j< n;j++){
			board[i][j]=0;
		}
	}
	//add queens
	for(var i = 0; i < queens.length;i++){
		board[queens[i]][i] = 1;
	}
	if (html==1){
		htmlDisplay(board);
	}
	else{
		console.log("Board:");
		console.log(board);
	}
}

// function htmlDisplay(board){
// 	$('.board').css({'width': (n * block_size),'height': (n * block_size)});
// 	$('.board').children('div').css({'width': block_size,'height': block_size})
// 	$("ul").empty();
// 	for(var i = 0; i < n;i++){
// 		for(var j=0; j< n;j++){
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
