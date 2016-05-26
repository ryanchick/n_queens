var express = require('express')
var bodyParser = require('body-parser')
var port = 80;

var app = express();
app.use(express.static(__dirname + './../app/'));
app.use(bodyParser.json());

app.get('/api/backtrack/:size/:random',function(req,res){
	console.log(req.params)
	var time;
	if(req.params.random == 1){
		var random = true;
	}else{
		var random = false;
	}
	var queenSol = backtrack(req.params.size);
	res.json({time:time,queens:queenSol});

	function backtrack(size){
		console.log('backtracking')
		var solution = [];
		var start = new Date();
		check(solution,0)
		time = new Date() - start;
		return solution;

		function check(queens,count){
			if(count == size){
				return true;
			}
			for(var i = 0;i < size;i++){
				if(count == 0 && random == true){
					var r = Math.floor(Math.random()*size)
					if(findSpot(queens,r,count)){
						queens.push(r)
						if(check(queens,count+1)){
							return true;
						}
						queens.pop();
					}
				}
				else 
				if(findSpot(queens,i,count)){
					queens.push(i)
					if(check(queens,count+1)){
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
	}
})

app.get('/api/climb/:size',function(req,res){
	console.log(req.params)
	var time;
	var queenSol = nQueens(req.params.size);
	res.json({time:time,queens:queenSol});


	//HILL CLIMBING FUNCTIONS
	//main hill climbing function - randomizes and starts climb
	function nQueens(size){
		console.log('climbing')
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

		//check if solution is found
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
	}
})


app.listen(port,function(){
	console.log('Listening on http://localhost:%s',port);
	console.log('Stop Server With CTRL + C');
});
