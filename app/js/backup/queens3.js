//This is the recursive solution v2
//Used a different approach:
//Checked for open spot before placing
//try to improve performance by reducing the amount of array manipulation

var n = 8;

var save = 0;
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

// console.log(board);

check(queen,0);

console.log(time);
console.log('Done!')
console.log(queen);
display(queen);
// console.log(block_size);

// var arr = [0,1,2,3,4,5,6,7]
// arr.splice(7)
// console.log("arr:" + arr)
// var arr = [ { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 5, y: 2 } ]
// arr.splice(2)
// console.log(arr)

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

function check(queens,count)
{
	console.log(time);
	// console.log("count:" + count)
	// console.log(queens)
	// console.log('qc' + queens[count])
	// console.log('qlength: ' + queens.length)
	// console.log('z:'+z)
	// if(count>0){
	// 	display(queens);
	// }
	if(count == n){
		// console.log('count:' + count +'\n'+ 'n:' + n)
		return true;
	}
	for(var i = 0;i < n;i++)
	{
		if(findSpot(queens,i,count))
		{
			queens.push({'x':i,'y':count})
			if(check(queens,count+1){
				return true;
				// queens.push({'x':i,'y':count})
			}
			queens.pop();
		}
	}

}
function findSpot(queens,x,count)
{
	// for(var i = 0;i < n;i++)
	// {
	time++;	
	// var mate = true;
	
	// if(x >= n)
	// {
	// 	return null;
	// }
	// if(queens.length == 0) //if no queen placed yet
	// {
	// 	return true;
	// }
	for(var j = 0;j < queens.length;j++)
	{
		if(queens[j].x == x || Math.abs(queens[j].x-x) == Math.abs(queens[j].y-count||queens[j].y==count)){
			return false;
		}
	}

	// var j = 0;
	// while(j < queens.length && mate == true)
	// {
	// 	if(queens[j].x == x || Math.abs(queens[j].x-x) == Math.abs(queens[j].y-count||queens[j].y==count)){
	// 		mate = false;
	// 	}
	// 	j++;
	// }

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
	for(var i = 0; i < queens.length;i++)
	{
		board[queens[i].x][queens[i].y] = 1;
		
	}
	if (html==1){
		htmlDisplay(board);
	}
	console.log("Board:");
	console.log(board);
}
function htmlDisplay(board){
	$('.board').css({'width': (n * block_size),'height': (n * block_size)});
	$('.board').children('div').css({'width': block_size,'height': block_size})
	$("ul").empty();
	for(var i = 0; i < n;i++){
		for(var j=0; j< n;j++)
		{
			if(board[i][j] == 0)
			{
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
