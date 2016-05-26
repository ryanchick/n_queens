//This is the recursive solution


var n = 8;
n = prompt('Number of Queens?');
var save = 0;
var time = 0;
var block_size = 50;
$('.board').css({'width': n * block_size,'height': n * block_size});
$('.board div').css({'width': block_size,'height': block_size})

//create board
var board = newBoard().slice();
var queen = [];

// console.log(board);

queen = check(queen,0,0);

console.log(time);
console.log('Done!')
console.log(queen);
display();

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
		// console.log(temp)
	}
	return temp;
}

function check(queens,z,count)
{
	// console.log(time);
	// if(time > 24)
	// {
	// 	console.log(queen)
	// 	console.log("z:" + z)
	// }
	// if(time > 40)
	// {
	// 	// return;
	// }
	time++;
	//case if last row was already at the bottom
	if(z == n)
	{	
		// console.log('z' + z)
		// console.log('n' + n)
		// z = 0;
		return check(queens,(queens[count-1].x+1),count-1);
	}
	//Success case
	if (count == n)
	{
		return queens;
	}

	//Add queen if new column is reached
	if(queens[count] == undefined)
	{
		queens.push({'x':z,'y':count})
	}

	//move queen to position
	queens[count].x = z;
	queens[count].y = count;
	// display();

	//check against all other queens
	for(var i = 0;i < queens.length;i++){
		if(i != count) //don't compare with itself
		{
			//check for same row and same diagonal
			if(queens[i].x == queens[count].x || Math.abs(queens[count].x - queens[i].x) == Math.abs(count - i))
			{
				//if end of board is reached, remove and go back
				if(z == n-1){
					// console.log('fail');
					// console.log(count)
					queens = queens.splice(count+1);
					return null; //row ended, failed
				}
				//shift queen down
				else{
					// console.log('shift');
					return check(queens,z+1,count)||check(queens,(queens[count-1].x+1),count-1); //if bottom reached, go back one column
				}
			}
		}
	}
	// console.log('next');
	//if no conflict, move to next row
	return check(queens,0,count+1);
}
function test(queens,count)
{
	for(var i = 0;i < queens.length;i++)
	{
		if(i != count)
		{
			if(queens[i].x == queens[count].x || Math.abs(queens[count].x - queens[i].x) == Math.abs(count - i))
			{
				return false;
			}
		}
	}
	return true;
}

function display(){
	//clear board
	for(var i = 0; i < n;i++){
		for(var j = 0; j< n;j++){
			board[i][j]=0;
		}
	}

	//add queens
	for(var i = 0; i < queen.length;i++)
	{
		board[queen[i].x][queen[i].y] = 1;
		
	}
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
	console.log("Board:");
	console.log(board);
}
