//This is the recursive solution v2
//queens3.js cleaned up a bit

var n = 8;
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

var temp = check(queen,0);

console.log(time);
console.log('Done!')
console.log(queen);
console.log(temp)
display(queen);

function newBoard(){
	var temp = [];
	var arr = [];
	for(var i = 0; i < n;i++)
	{
		arr.push(0);
	}
	for(var j = 0;j < n;j++)
	{
		temp.push(arr.slice());

	}
	return temp;
}

function check(queens,count){
	// console.log(time);
	if(count == n){
		return true;
	}
	for(var i = 0;i < n;i++){
		// if(count == 0)
		// {
		// 	var r = Math.floor(Math.random()*n)
		// 	if(findSpot(queens,r,count)){
		// 		queens.push(r)
		// 		if(check(queens,count+1)){
		// 			return true;
		// 		}
		// 		queens.pop();
		// 	}
		// }
		// else 
		if(findSpot(queens,i,count)){
			queens.push(i)
			if(check(queens,count+1)){
				// queens.push(i)
				return true;
			}
			queens.pop();

		}
	}
}

function findSpot(queens,x,count){
	// time++;	
	for(var j = 0;j < queens.length;j++){
		if(queens[j] === x || Math.abs(queens[j]-x) === count-j){
			return false;
		}
	}
	return true;
}

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
function htmlDisplay(board){
	$('.board').css({'width': (n * block_size),'height': (n * block_size)});
	$('.board').children('div').css({'width': block_size,'height': block_size})
	$("ul").empty();
	for(var i = 0; i < n;i++){
		for(var j=0; j< n;j++){
			if(board[i][j] == 0){
				if((i+j)%2 == 0){
					$('.board').append('<div class = "white"><div>');
				}
				else if((i+j)%2 == 1){
					$('.board').append('<div class = "black"><div>');
				}
			}
			if(board[i][j] == 1){
				$('.board').append('<div class = "queen"><div>');
			}
		}
	}
	$('.board').children('div').css({'width': block_size,'height': block_size})
}
