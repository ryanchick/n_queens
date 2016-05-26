(function(){
	angular
		.module('queenApp',[])

	angular
		.module('queenApp')
		.controller('queenCtrl',queenCtrl)

	function queenCtrl ($window,$scope){
		var queenVm = this;
		queenVm.n = 8;
		queenVm.time = 0;
		queenVm.block_size = 50;
		queenVm.solOptions = [
			{name:'Recursive Backtracking',value:0,recMax:'31'},
			{name:'Random Restart Hill Climbing',value:1,recMax:'150'}]
		queenVm.type = queenVm.solOptions[0];
		queenVm.random = false;
		queenVm.failed = false;
		queenVm.loading = false;

		//display empty board on load
		calcWidth();
		queenVm.board = newBoard(queenVm.n);

		//public methods
		queenVm.solve = solve;

		function calcWidth(){
			if(queenVm.n > 14){
				// console.log('calc')
				queenVm.block_size = Math.floor(Math.min(($window.innerWidth-50)/queenVm.n,($window.innerHeight-120)/queenVm.n))
			}
			// console.log($window.innerHeight)
			// console.log($window.innerWidth);
			queenVm.blockWidth = queenVm.block_size +'px'; 
			// console.log(queenVm.blockWidth)
			queenVm.rowWidth = queenVm.block_size * queenVm.n + 'px';
		}

		function solve(){
			queenVm.failed = false;
			// queenVm.loading = false;
			if(queenVm.type.value == 0){
				var solved = backtrack(queenVm.n);
			}
			else if(queenVm.type.value == 1){
				var solved = nQueens(queenVm.n);
			}
			if(solved == false){
				queenVm.board = [];
				queenVm.time = 0;
				queenVm.failed = true;
			}else{
				queenVm.board = newBoard(queenVm.n)
				for(var i = 0; i < solved.length;i++){
					queenVm.board[solved[i]][i] = 1;
				}
				calcWidth();
			}
			queenVm.loading = false;
		}
		function backtrack(size){
			var solution = [];
			var start = new Date();
			check(solution,0)
			queenVm.time = new Date() - start;
			return solution;

			function check(queens,count){
				if(count == size){
					return true;
				}
				for(var i = 0;i < size;i++){
					if(count == 0 && queenVm.random == true){
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


		//HILL CLIMBING FUNCTIONS
		//main hill climbing function - randomizes and starts climb
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
					queenVm.time = new Date() - start;
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

		//DISPLAY FUNCTIONS
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
	}

})();