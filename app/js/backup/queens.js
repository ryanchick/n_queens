//This is the loop solution
//Recursive solution in queens2.js

var board = []

//create 8x8
for(var i = 0; i < 8;i++)
{
	board.push([0,0,0,0,0,0,0,0])
}
var queen = [
{'x':0,'y':0},
{'x':0,'y':1},
{'x':0,'y':2},
{'x':0,'y':3},
{'x':0,'y':4},
{'x':0,'y':5},
{'x':0,'y':6},
{'x':0,'y':7},]
display();
console.log(board);

//clear
for(var i = 0; i < 8;i++)
{
	board[i] = [0,0,0,0,0,0,0,0]
}

check(0);
check(0); //run through again just to be sure
display();
console.log('Solved:');
console.log(board);
console.log(queen);

function check(i)
{
	//test against other queens
	for(var j = 0; j < 8; j++)
	{
		if(i != j) //don't test against itself
		{
			if(queen[i].x == queen[j].x){ //if on the same row
				move(queen[i].x,queen[i].y);
			}
			if(Math.abs(queen[j].x - queen[i].x) == Math.abs(queen[j].y - queen[i].y)){ //if on same diagonal
				move(queen[i].x,queen[i].y);
			}
		}
	}
}

function move(x,y){
	queen[y].x = Math.floor(Math.random() * 8);
	if(y == 7){
		y = 0; //after last queen, check first queen again
	}else{
		y++; // check next queen
	}
	check(y);	
}

function display(){
	for(var i = 0;i<8;i++)
	{
		board[queen[i].x][queen[i].y] = 1;
	}
}
