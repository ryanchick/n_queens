(function(){
	angular
		.module('queenApp',[])

	angular
		.module('queenApp')
		.controller('queenCtrl',queenCtrl)

	function queenCtrl ($window,$scope,$http){
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
			queenVm.loading = true;
			var ifRandom = ''
			var start = new Date();
			// queenVm.loading = false;
			if(queenVm.type.value == 0){
				var method = 'backtrack';
				if(queenVm.random == true){
					ifRandom = '/1'
				} else {
					ifRandom = '/0'
				}
			} else if(queenVm.type.value == 1){
				var method = 'climb';

			}
			$http.get('api/' + method + '/' + queenVm.n + ifRandom)
				.then(function(res){
					var solved = res;
					queenVm.time = new Date() - start;
					queenVm.loading = false;
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
					
				})
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